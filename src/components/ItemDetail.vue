<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="d-flex flex-column w-100">
    <div v-if="noItem" class="flex-grow-1 d-flex flex-row align-items-center">
      <Close v-if="showBack" @close="close" />
      {{ $t('noItemData') }}
    </div>

    <div
      v-else-if="item"
      ref="scroll"
      class="d-flex flex-column shadow-sm"
      style="min-height: 100vh"
    >
      <div
        class="flex-shrink-0 d-flex flex-column align-items-start"
        :class="showBack ? 'justify-content-between' : 'justify-content-end'"
        :style="titleImage"
      >
        <Close v-if="showBack" class="mt-4 ms-4" @close="close" />
        <div
          v-else-if="!autoplay"
          class="w-100 d-flex align-items-center justify-content-between px-4"
          style="flex-basis: 50%"
        >
          <Direction direction="left" @previous-item="$emit('previous-item')" />
          <Direction direction="right" @next-item="$emit('next-item')" />
        </div>
        <div
          class="px-4 px-lg-4 pt-lg-5 w-100 gradient-white-transparent d-flex justify-content-between align-items-end"
        >
          <h1 class="mb-0 mt-3 fs-1">
            {{ itemDetail.Title }}
          </h1>
          <div style="flex-basis: 10%"></div>
          <div class="flex-grow-lg-1">
            <nav
              class="nav nav-underline justify-content-end gap-0 flex-column flex-lg-row gap-lg-4"
            >
              <div v-for="menu in menus" :key="menu" class="nav-item">
                <a
                  class="nav-link pointer py-1 py-lg-2 text-end"
                  :class="
                    `${selectedMenu === menu ? 'active' : ''} ${
                      autoplay ? 'disabled' : ''
                    }`
                  "
                  :aria-disabled="autoplay ? 'true' : 'false'"
                  @click="selectedMenu = menu"
                  >{{ menu }}</a
                >
              </div>
            </nav>
          </div>
        </div>
      </div>

      <div ref="content" class="flex-grow-1 p-4">
        <Info
          v-if="selectedMenu === 'Info'"
          class="d-flex flex-column gap-4 h-100"
          :item="item"
          :language="language"
        />

        <Slopes
          v-else-if="selectedMenu === 'Slopes'"
          class="d-flex flex-column gap-4"
          :item="item"
          :language="language"
        />

        <Lifts
          v-else-if="selectedMenu === 'Lifts'"
          class="d-flex flex-column gap-4"
          :item="item"
          :language="language"
        />

        <Weather
          v-else-if="selectedMenu === 'Weather'"
          class="d-flex flex-column gap-4"
          :item="item"
          :language="language"
        />

        <Webcam
          v-else-if="selectedMenu === 'Webcam'"
          class="d-flex flex-column gap-4"
          :item="item"
          :language="language"
        />

        <WeatherMap
          v-else-if="selectedMenu === 'WeatherMap'"
          class="d-flex flex-column gap-4"
          :item="item"
          :language="language"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Close from './detailComponents/Close.vue';
import Direction from './detailComponents/Direction.vue';
import Info from './detailComponents/Info.vue';
import Lifts from './detailComponents/Lifts.vue';
import Slopes from './detailComponents/Slopes.vue';
import Weather from './detailComponents/Weather.vue';
import WeatherMap from './detailComponents/WeatherMap.vue';
import Webcam from './detailComponents/Webcam.vue';
import { WeatherApi } from '@/api';
import {
  Detail,
  Measuringpoint,
  ODHActivityPoiLinked,
  SkiAreaLinked,
} from '@/api/models';
import { APIResponse } from '@/types';
import Vue, { PropType } from 'vue';

type Menu = 'Info' | 'Slopes' | 'Lifts' | 'Weather' | 'Webcam' | 'WeatherMap';

export default Vue.extend({
  components: {
    Close,
    Direction,
    Info,
    Lifts,
    Slopes,
    Weather,
    Webcam,
    WeatherMap,
  },
  props: {
    item: {
      type: Object as PropType<SkiAreaLinked>,
      required: true,
    },
    language: {
      type: String,
      default: 'en',
    },
    showBack: {
      type: Boolean,
    },
    fullscreen: {
      type: Boolean,
    },
    autoplay: {
      type: Boolean,
    },
    scrollDelay: {
      type: Number,
    },
    scrollFactor: {
      type: Number,
    },
    excludeMenus: {
      type: String,
    },
  },
  data() {
    const data: {
      slopes: ODHActivityPoiLinked[];
      lifts: ODHActivityPoiLinked[];
      measuringpoints: Measuringpoint[];
      showImage: boolean;
      imageUrl: string | null;
      isLoading: boolean;
      menus: Menu[];
      selectedMenu: Menu;
      scrollTime: number;
    } = {
      slopes: [],
      lifts: [],
      measuringpoints: [],
      showImage: false,
      imageUrl: null,
      isLoading: false,
      menus: ['Info', 'Slopes', 'Lifts', 'Weather', 'Webcam', 'WeatherMap']
        .map((menu) => menu as Menu)
        .filter((menu) => !this.excludeMenus.split(',').includes(menu)),
      selectedMenu: 'Info',
      scrollTime: 0,
    };

    return {
      ...data,
      weatherMapRefreshMarker: 0,
    };
  },
  created() {
    this.init();
  },
  mounted() {
    this.scheduleScrollDown();
  },
  watch: {
    item: function() {
      this.init();
    },
    selectedMenu(value) {
      switch (value as Menu) {
        case "WeatherMap":
          this.weatherMapRefreshMarker++;
      }
    },
  },
  methods: {
    init() {
      this.isLoading = true;
      //this.loadSkiAreaMeasuringpoints();
    },
    getScrollTime() {
      return (
        (this.$refs.content as HTMLDivElement).clientHeight * this.scrollFactor
      );
    },
    showNextMenu() {
      if (!this.autoplay) return;

      (this.$refs.scroll as HTMLDivElement).style.animation = '';

      const currentIndex = this.menus.indexOf(this.selectedMenu);
      const nextIndex = currentIndex + 1;

      if (nextIndex >= this.menus.length) {
        this.$emit('next-item');
        return;
      }

      this.selectedMenu = this.menus[nextIndex];
      this.scheduleScrollDown();
    },
    scheduleScrollDown() {
      if (!this.autoplay) return;

      setTimeout(() => {
        (this.$refs
          .scroll as HTMLDivElement).style.animation = `ScrollBottom ${this.getScrollTime()}ms linear forwards`;

        setTimeout(() => {
          this.showNextMenu();
        }, this.getScrollTime() + this.scrollDelay);
      }, this.scrollDelay);
    },
    dateFormat(dateString: string) {
      const d = new Date(dateString);
      const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
      const month = d.getMonth() + 1;
      const monthStr = month < 10 ? '0' + month : month;
      return `${day}/${monthStr}/${d.getFullYear()}`;
    },
    loadSkiAreaMeasuringpoints() {
      if (!this.item.Id) return;
      new WeatherApi()
        .v1WeatherMeasuringpointGet(
          1,
          25,
          undefined,
          undefined,
          undefined,
          this.item.Id,
          this.language,
          undefined,
          true,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          false,
          undefined
        )
        .then((value) => {
          this.measuringpoints =
            ((value.data as unknown) as APIResponse<Measuringpoint>).Items ??
            [];
        });
    },
    close() {
      this.$emit('close');
    },
  },
  computed: {
    itemDetail(): Detail {
      return this.item?.Detail?.[this.language] || {};
    },
    titleImage(): string {
      const image =
        this.item?.ImageGallery != null ? this.item?.ImageGallery[0] : null;
      if (image == null) {
        return '';
      } else {
        return `background-image: url(${image.ImageUrl}); height: 300px; background-size: cover; background-position: center;`;
      }
    },
    noItem(): boolean {
      return !this.item;
    },
  },
});
</script>

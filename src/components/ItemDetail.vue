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
      class="skiinfo-detail d-flex flex-column shadow-sm"
      style="min-height: 100vh"
    >
      <div
        class="skiinfo-detail-header flex-shrink-0 d-flex flex-column align-items-start"
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
          class="skiinfo-detail-nav px-4 px-lg-4 pt-lg-5 w-100 gradient-white-transparent d-flex justify-content-between align-items-end"
        >
          <h1 class="skiinfo-detail-title mb-0 mt-3 pb-2 fs-1">
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
                  >{{ $t(menu) }}</a
                >
              </div>
            </nav>
          </div>
        </div>
      </div>

      <div ref="content" class="flex-grow-1 p-4 pt-lg-5">
        <Info
          v-if="selectedMenu === 'Info'"
          class="d-flex flex-column gap-4 h-100"
          :item="item"
          :language="language"
        />

        <Lifts
          v-else-if="selectedMenu === 'Lifts'"
          class="d-flex flex-column gap-4"
          :item="item"
          :language="language"
        />

        <Slopes
          v-else-if="selectedMenu === 'Slopes'"
          class="d-flex flex-column gap-4"
          :item="item"
          :language="language"
        />

        <Weather
          v-else-if="selectedMenu === 'Weather'"
          class="d-flex flex-column gap-4"
          :item="item"
          :language="language"
          :refreshmarker="weatherMapRefreshMarker"
        />

        <Webcam
          v-else-if="selectedMenu === 'Webcam'"
          class="d-flex flex-column gap-4"
          :item="item"
          :language="language"
        />

        <!-- <WeatherMap
          v-else-if="selectedMenu === 'WeatherMap'"
          class="d-flex flex-column gap-4"
          :item="item"
          :language="language"
        /> -->
      </div>
      <div id="footer" class="px-4 pb-3">
        <a href="https://opendatahub.com" target="_blank"
          ><span id="footer-text">powered by Open Data Hub</span>
          <img
            :src="require('@/assets/icons/NOI_OPENDATAHUB_NEW_WH-01.png')"
            height="35px"
        /></a>
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
import fallbackImage from '@/assets/img/skiAreaFallback';

type Menu = 'Info' | 'Lifts' | 'Slopes' | 'Weather' | 'Webcam';

export default Vue.extend({
  components: {
    Close,
    Direction,
    Info,
    Lifts,
    Slopes,
    Weather,
    Webcam,
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
      menus: ['Info', 'Lifts', 'Slopes', 'Weather', 'Webcam']
        .map((menu) => menu as Menu)
        .filter((menu) => !this.excludeMenus.split(',').includes(menu)),
      selectedMenu: 'Info',
      scrollTime: 0,
    };
    return {
      ...data,
      weatherMapRefreshMarker: 0,
      imageBroken: false,
    };
  },
  created() {
    this.init();
    this.checkImage();
  },
  mounted() {
    this.scheduleScrollDown();
  },
  watch: {
    item: function() {
      this.init();
      this.checkImage();
    },
    selectedMenu(value) {
      switch (value as Menu) {
        case 'Weather':
          this.weatherMapRefreshMarker++;
        //console.log("refreshmarker" + this.weatherMapRefreshMarker);
      }
    },
  },
  methods: {
    init() {
      this.isLoading = true;
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
    checkImage() {
      // a css background image cannot report load errors, so probe the url once
      this.imageBroken = false;
      const url = this.imageUrl;
      if (!url) return;
      const probe = new Image();
      probe.onerror = () => {
        if (this.imageUrl === url) this.imageBroken = true;
      };
      probe.src = url;
    },
  },
  computed: {
    itemDetail(): Detail {
      return this.item?.Detail?.[this.language] || {};
    },
    imageUrl(): string | null {
      const url = this.item?.ImageGallery?.[0]?.ImageUrl;
      if (!url) return null;
      // the ODH image service can scale images
      const scalable = /opendatahub\.com|testingmachine\.eu|service\.suedtirol\.info/.test(
        url
      );
      return scalable
        ? url + (url.includes('?') ? '&' : '?') + 'width=1980'
        : url;
    },
    titleImage(): string {
      const url =
        this.imageUrl && !this.imageBroken ? this.imageUrl : fallbackImage;
      return `background-image: url("${url}"); height: 300px; background-size: cover; background-position: center;`;
    },
    noItem(): boolean {
      return !this.item;
    },
  },
});
</script>

<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="d-flex flex-column w-100">
    <div
      v-if="isItemEmpty && !isLoading"
      class="flex-grow-1 d-flex flex-row align-items-center"
    >
      <Close @close="close" />
      {{ $t('noItemData') }}
    </div>

    <div
      v-else-if="item"
      class="h-100 d-flex flex-column shadow-sm overflow-y-auto"
      :class="!fullscreen ? 'rounded-4' : ''"
    >
      <div
        class="flex-shrink-0 d-flex flex-column align-items-start justify-content-between"
        :style="titleImage"
      >
        <Close class="mt-4 ms-4" @close="close" />

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
                  :class="selectedMenu === menu ? 'active' : ''"
                  @click="selectedMenu = menu"
                  >{{ menu }}</a
                >
              </div>
            </nav>
          </div>
        </div>
      </div>

      <div class="flex-grow-1 p-4 d-flex flex-column justify-content-between">
        <div>
          <Info
            class="d-flex flex-column gap-4"
            :class="selectedMenu !== 'Info' ? 'd-none' : ''"
            :item="item"
            :language="language"
          />

          <Slopes
            class="d-flex flex-column gap-4"
            :class="selectedMenu !== 'Slopes' ? 'd-none' : ''"
            :item="item"
            :language="language"
          />

          <Lifts
            class="d-flex flex-column gap-4"
            :class="selectedMenu !== 'Lifts' ? 'd-none' : ''"
            :item="item"
            :language="language"
          />

          <Weather
            class="d-flex flex-column gap-4"
            :class="selectedMenu !== 'Weather' ? 'd-none' : ''"
            :item="item"
            :language="language"
          />

          <Webcam
            class="d-flex flex-column gap-4"
            :class="selectedMenu !== 'Webcam' ? 'd-none' : ''"
            :item="item"
            :language="language"
          />
        </div>
        <div>
          <small class="d-block mt-4">
            {{ $t('lastChange') }}: {{ item.LastChange }}
          </small>
          <small class="d-block"> Opendatahub ID: {{ item.Id }} </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Close from './detailComponents/Close.vue';
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

type Menu = 'Info' | 'Slopes' | 'Lifts' | 'Weather' | 'Webcam';

export default Vue.extend({
  components: {
    Close,
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
    fullscreen: {
      type: Boolean,
    },
  },
  data() {
    const data: {
      slopes: ODHActivityPoiLinked[];
      lifts: ODHActivityPoiLinked[];
      measuringpoints: Measuringpoint[];
      showImage: boolean;
      imageUrl: string | null;
      selectedImage: null;
      isLoading: boolean;
      menus: Menu[];
      selectedMenu: Menu;
    } = {
      slopes: [],
      lifts: [],
      measuringpoints: [],
      showImage: false,
      imageUrl: null,
      selectedImage: null,
      isLoading: false,
      menus: ['Info', 'Slopes', 'Lifts', 'Weather', 'Webcam'],
      selectedMenu: 'Info',
    };

    return data;
  },
  created() {
    this.isLoading = true;
    this.loadSkiAreaMeasuringpoints();
  },
  methods: {
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
    titleImage(): {
      backgroundImage?: string;
      height?: string;
      backgroundSize?: string;
      backgroundPosition?: string;
    } {
      const image =
        this.item?.ImageGallery != null ? this.item?.ImageGallery[0] : null;
      if (image == null) {
        return {};
      } else {
        return {
          backgroundImage: 'url(' + image.ImageUrl + ') ',
          height: '300px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        };
      }
    },
    isItemEmpty(): boolean {
      return Object.keys(this.item).length === 0;
    },
  },
});
</script>

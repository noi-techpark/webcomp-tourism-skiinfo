<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <div v-if="visibleWebcams.length" class="row g-4">
      <div
        v-for="webcam in visibleWebcams"
        :key="webcam.id"
        class="col-12 col-md-6"
      >
        <div class="skiinfo-webcam h-100 d-flex position-relative">
          <img
            :src="webcam.image"
            :alt="webcam.name"
            loading="lazy"
            class="skiinfo-webcam-image"
            @error="hide(webcam.id)"
          />
          <small
            v-if="webcam.name"
            class="skiinfo-webcam-caption position-absolute bottom-0 start-0 m-2 py-1 px-2 rounded text-nowrap"
          >
            {{ webcam.name }}
          </small>
          <a
            v-if="webcam.liveUrl"
            :href="webcam.liveUrl"
            target="_blank"
            rel="noopener"
            class="skiinfo-webcam-live position-absolute top-0 end-0 m-2 py-1 px-2 rounded"
          >
            {{ $t('webcamLive') }}
          </a>
        </div>
      </div>
    </div>
    <div v-else-if="loaded" class="skiinfo-empty text-center">
      <span>{{ $t('noData.webcam') }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { SkiAreaLinked } from '@/api/models';
import Vue, { PropType } from 'vue';
import { loadSkiAreaWebcams, Webcam } from './webcams';

export default Vue.extend({
  props: {
    item: {
      type: Object as PropType<SkiAreaLinked>,
      required: true,
    },
    language: {
      type: String,
      required: false,
      default: 'en',
    },
  },
  data() {
    const data: {
      webcams: Webcam[];
      hidden: string[];
      loaded: boolean;
    } = {
      webcams: [],
      hidden: [],
      loaded: false,
    };
    return data;
  },
  computed: {
    visibleWebcams(): Webcam[] {
      return this.webcams.filter((webcam) => !this.hidden.includes(webcam.id));
    },
  },
  created() {
    this.init();
  },
  watch: {
    item() {
      this.init();
    },
  },
  methods: {
    init() {
      this.loaded = false;
      this.hidden = [];
      loadSkiAreaWebcams(this.item, this.language).then((webcams) => {
        this.webcams = webcams;
        this.loaded = true;
      });
    },
    hide(id: string) {
      // webcams whose image cannot be loaded are left out
      this.hidden.push(id);
    },
  },
});
</script>

<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <div v-if="item.Webcam && !noWebcams" class="row g-4">
      <div
        v-for="webcam in filteredWebcams"
        :key="webcam.id"
        class="col-12 col-lg-6"
      >
        <div class="h-100 d-flex position-relative">
          <img
            :src="webcam.url"
            class="flex-basis-full ratio ratio-16x9 object-fit-cover shadow-sm"
          />
          <small
            class="position-absolute top-0 start-50 translate-middle-x m-0 py-1 px-2 bg-white rounded-bottom text-center text-nowrap"
          >
            {{ webcam.name }}
          </small>
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      <span>No webcam data available</span>
    </div>
  </div>
</template>

<script lang="ts">
import { SkiAreaLinked } from '@/api/models';
import Vue, { PropType } from 'vue';

function withProxy(url: string) {
  return 'https://api.tourism.testingmachine.eu/v1/ODHProxy/' + url;
}

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
      webcams:
        | {
            name: string | undefined;
            url: string;
            id: string;
            error: boolean;
          }[]
        | undefined;
    } = {
      webcams: this.item.Webcam?.map((webcam) => {
        const url = webcam.Webcamurl
          ? webcam.Webcamurl
          : webcam.Previewurl
          ? webcam.Previewurl
          : '';

        return {
          name: webcam.Webcamname?.[this.language],
          url,
          id: webcam.WebcamId ?? '',
          error: false,
        };
      }).filter((e) => e.url && e.id),
    };

    return data;
  },
  computed: {
    noWebcams(): boolean {
      return this.webcams?.every((webcam) => webcam.error) ?? true;
    },
    filteredWebcams():
      | {
          name: string | undefined;
          url: string;
          id: string;
          error: boolean;
        }[]
      | undefined {
      return this.webcams?.filter((webcam) => !webcam.error);
    },
  },
  created() {
    this.init();
  },
  watch: {
    item: function() {
      this.init();
    },
  },
  methods: {
    init() {
      this.testWebcams();
    },
    testWebcams() {
      this.webcams?.forEach((webcam) => {
        fetch(withProxy(webcam.url), { method: 'HEAD' })
          .then((res) => (webcam.error = !res.ok))
          .catch(() => (webcam.error = true));
      });
    },
  },
});
</script>

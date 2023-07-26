<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <div v-if="item.Webcam && !noWebcams" class="row g-4">
      <div
        v-for="webcam in webcams?.filter((webcam) => !webcam.error)"
        :key="webcam.id"
        class="col-6"
      >
        <div
          class="h-100 d-flex flex-column rounded-4 shadow overflow-hidden p-2"
        >
          <h2 class="fs-4">{{ webcam.name }}</h2>
          <img
            :src="webcam.url"
            class="flex-basis-full ratio ratio-16x9 rounded object-fit-cover"
          />
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
  },
  created() {
    this.testWebcams();
  },
  methods: {
    testWebcams() {
      this.webcams?.forEach((webcam) => {
        fetch(webcam.url, { method: 'HEAD', redirect: 'manual' })
          .then((res) => {
            console.log(res);
            if (!res.ok) webcam.error = true;
          })
          .catch((e) => {
            console.log(e);
            webcam.error = true;
          });
      });
    },
  },
});
</script>

<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <div v-if="measuringpoints" class="row">
      <div v-for="point in measuringpoints" :key="point.Id">{{ point }}</div>
    </div>
    <div v-else class="text-center">
      <span>No weather data available</span>
    </div>
  </div>
</template>

<script lang="ts">
import { WeatherApi } from '@/api/api';
import { Measuringpoint, SkiAreaLinked } from '@/api/models';
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
      measuringpoints: Measuringpoint[] | null;
    } = {
      measuringpoints: null,
    };

    return data;
  },
  created() {
    this.loadMeasuringpoints();
  },
  methods: {
    loadMeasuringpoints() {
      if (!this.item.Id) return;
      new WeatherApi()
        .v1WeatherMeasuringpointGet(
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          this.item.Id,
          undefined,
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
          undefined,
          undefined
        )
        .then((value) => {
          console.log(value);
          this.measuringpoints = value.data.length === 0 ? null : value.data;
        });
    },
  },
});
</script>

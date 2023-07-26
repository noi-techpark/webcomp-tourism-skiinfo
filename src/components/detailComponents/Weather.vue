<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <div v-if="measuringpoints">
      <div class="row">
        <div v-for="title in titles" :key="title" class="col-2 py-2">
          <strong>{{ title }}</strong>
        </div>
      </div>
      <div
        v-for="(point, index) in measuringpoints"
        :key="index"
        class="row py-2"
        :class="index % 2 === 0 ? 'bg-body-tertiary' : ''"
      >
        <div
          v-for="entry in Object.entries(point)"
          class="col-2"
          :key="entry[0]"
        >
          {{ entry[1] }}
        </div>
      </div>
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
      rawMeasuringpoints: Measuringpoint[] | null;
      titles: string[];
    } = {
      rawMeasuringpoints: null,
      titles: [
        'Name',
        'Snow Height',
        'New Snow',
        'Last Snow Date',
        'Altitude',
        'Last Update',
      ],
    };

    return data;
  },
  computed: {
    measuringpoints():
      | {
          Shortname?: string;
          SnowHeight?: string;
          newSnowHeight?: string;
          LastSnowDate?: Date;
          Altitude?: number;
          LastUpdate?: Date;
        }[]
      | undefined {
      return this.rawMeasuringpoints?.map(
        ({
          Shortname,
          SnowHeight,
          newSnowHeight,
          LastSnowDate,
          Altitude,
          LastUpdate,
        }) => {
          return {
            Shortname: Shortname ?? undefined,
            SnowHeight: SnowHeight ?? undefined,
            newSnowHeight: newSnowHeight ?? undefined,
            LastSnowDate: LastSnowDate ?? undefined,
            Altitude: Altitude ?? undefined,
            LastUpdate: LastUpdate ?? undefined,
          };
        }
      );
    },
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
          this.rawMeasuringpoints = value.data.length === 0 ? null : value.data;
        });
    },
  },
});
</script>

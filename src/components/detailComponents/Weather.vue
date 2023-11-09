<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <div v-if="measuringpoints" class="table-responsive">
      <table class="table table-striped ">
        <thead>
          <tr>
            <th
              v-for="title in titles"
              :key="title"
              class="col-2 py-2 text-nowrap"
            >
              {{ title }}
            </th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr
            v-for="(point, index) in measuringpoints"
            :key="index"
            class="py-2"
          >
            <td v-for="entry in Object.entries(point)" :key="entry[0]">
               <span v-if="entry[0] == 'LastSnowDate' || entry[0] == 'LastUpdate'">{{ entry[1] }}</span>               
               <span v-else>{{ entry[1] }} </span>               
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="text-center">
      <span>{{ $t('noData.weather') }}</span>
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
          LastSnowDate?: string;
          Altitude?: number;
          LastUpdate?: string;
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
            LastSnowDate: LastSnowDate?.toString() != '0001-01-01T00:00:00' ? LastSnowDate?.toString() : 'no info',
            Altitude: Altitude ?? undefined,
            LastUpdate: LastUpdate != null ? new Date(LastUpdate).toDateString() : undefined,
          };
        }
      );
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
      this.loadMeasuringpoints();
    },
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
          console.log(this.rawMeasuringpoints);
        });
    },
  },
});
</script>

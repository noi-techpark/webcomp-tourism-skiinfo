<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <div v-if="slopeColors" class="row gy-3">
      <div
        v-for="{ color, slopes } in slopeColors"
        :key="color"
        class="col-12 col-lg-4"
      >
        <div class="p-2 rounded-1" :class="`background-slope-${color}`">
          <h2 class="fs-3 text-white">
            {{ color.charAt(0).toUpperCase() + color.slice(1) }}
          </h2>
          <div
            class="d-flex flex-column gap-3 p-3 rounded-1 bg-white shadow-sm"
          >
            <OpenClosed
              v-for="slope in slopes"
              :key="slope.Id"
              :open="slope.IsOpen"
            >
              <h3 class="fs-4 mb-1">
                {{ getDetail(slope).Title }}
              </h3>
              <small>{{ getinfo(slope).join(' | ') }}</small>
            </OpenClosed>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      <span>No slope data available</span>
    </div>
  </div>
</template>

<script lang="ts">
import { ODHActivityPoiApi } from '@/api/api';
import { ODHActivityPoiLinked, SkiAreaLinked } from '@/api/models';
import Vue, { PropType } from 'vue';
import OpenClosed from './OpenClosed.vue';

export default Vue.extend({
  components: {
    OpenClosed,
  },
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
      slopes: ODHActivityPoiLinked[] | null;
    } = {
      slopes: null,
    };

    return data;
  },
  computed: {
    slopeColors(): { color: string; slopes: ODHActivityPoiLinked[] }[] | null {
      const colorMap: Record<string, string> = {
        '2': 'blue',
        '4': 'red',
        '6': 'black',
        other: 'other',
      };

      if (!this.slopes) return null;

      return this.slopes
        .reduce<{ color: string; slopes: ODHActivityPoiLinked[] }[]>(
          (acc, slope) => {
            const colorCode = slope.Ratings?.Difficulty ?? 'other';

            const colorEntry = acc.find((e) => e.color === colorCode);
            if (colorEntry) {
              colorEntry.slopes.push(slope);
            } else {
              acc.push({
                color: colorCode,
                slopes: [slope],
              });
            }

            return acc;
          },
          []
        )
        .sort(({ color: a }, { color: b }) => (a > b ? 1 : a < b ? -1 : 0))
        .map((e) => {
          e.color = colorMap[e.color];
          return e;
        });
    },
  },
  created() {
    this.loadSlopes();
  },
  methods: {
    getDetail(slope: ODHActivityPoiLinked) {
      return slope.Detail?.[this.language] ?? {};
    },
    getinfo(slope: ODHActivityPoiLinked): string[] {
      return [
        slope.DistanceLength ? slope.DistanceLength + ' m' : '',
        slope.AltitudeDifference ? slope.AltitudeDifference + ' hm' : '',
      ].filter((e) => e !== '');
    },
    loadSlopes() {
      if (!this.item.Id) return;
      new ODHActivityPoiApi()
        .v1ODHActivityPoiGet(
          this.language,
          1,
          1000,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          this.language,
          'ska' + this.item.Id,
          undefined,
          undefined,
          'pisten',
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
          this.slopes =
            !value.data.Items || value.data.Items.length === 0
              ? null
              : value.data.Items;
        });
    },
  },
});
</script>

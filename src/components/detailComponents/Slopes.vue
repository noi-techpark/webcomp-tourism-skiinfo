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
        class="col-12 col-md-6 col-lg-4"
      >
        <div>
          <div
            class="mx-2 mt-2 p-2 d-flex align-items-baseline gap-2 border-bottom"
          >
            <h2 class="fs-3 mb-0 fw-bold" :class="`text-slope-${color}`">
              {{ slopes.length }}
              {{ color.charAt(0).toUpperCase() + color.slice(1) }}
            </h2>
            <small>{{ getColorInfo(color).join(' | ') }}</small>
          </div>

          <div class="mx-2 mb-2 d-flex flex-column gap-3 px-2 py-4">
            <OpenClosed
              v-for="slope in slopes"
              :key="slope.Id"
              :is-open="slope.IsOpen"
            >
              <template #title>
                <span class="fs-5 fw-bold mb-0">
                  {{ getDetail(slope).Title }}
                </span>
              </template>
              <template>
                <span>{{ getinfo(slope).join(' | ') }}</span>
              </template>
            </OpenClosed>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      <span>{{ $t('noData.slopes') }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { ODHActivityPoiApi } from '@/api/api';
import { ODHActivityPoiLinked, SkiAreaLinked } from '@/api/models';
import Vue, { PropType } from 'vue';
import OpenClosed from './OpenClosed.vue';

type Color = 'blue' | 'red' | 'black' | 'other';

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
    slopeColors(): { color: Color; slopes: ODHActivityPoiLinked[] }[] | null {
      const colorMap: Record<string, Color> = {
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
        .map(({ color, slopes }) => {
          return {
            color: colorMap[color],
            slopes,
          };
        })
        .map((color) => {
          color.slopes.sort(({ IsOpen: a }, { IsOpen: b }) =>
            !a && b ? 1 : a && !b ? -1 : 0
          );
          return color;
        });
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
      this.loadSlopes();
    },
    getDetail(slope: ODHActivityPoiLinked) {
      return slope.Detail?.[this.language] ?? {};
    },
    getinfo(slope: ODHActivityPoiLinked): string[] {
      return [
        slope.DistanceLength ? slope.DistanceLength + ' m' : '',
        slope.AltitudeDifference ? slope.AltitudeDifference + ' hm' : '',
      ].filter((e) => e !== '');
    },
    getColorInfo(color: Color): string[] {
      const slopeKm =
        color === 'blue'
          ? this.item.SlopeKmBlue
          : color === 'red'
          ? this.item.SlopeKmRed
          : color === 'black'
          ? this.item.SlopeKmBlack
          : '';

      const openSlopes = this.slopeColors
        ?.find(({ color: entryColor }) => entryColor === color)
        ?.slopes.filter((slope) => slope.IsOpen)
        .length.toString();

      return [
        slopeKm ? slopeKm + ' km' : '',
        openSlopes ? openSlopes + ' open' : '',
      ].filter((e) => e != '');
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
          this.item.SkiRegionId == '8260DC5B815D40B98A1B53E84EC2B419' ? 'ska' + this.item.Id : undefined,
          undefined,
          this.item.SkiRegionId == '8260DC5B815D40B98A1B53E84EC2B419' ? 'dss' : undefined,
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
          this.item.SkiRegionId != '8260DC5B815D40B98A1B53E84EC2B419' ? this.item.Latitude?.toString() : undefined,
          this.item.SkiRegionId != '8260DC5B815D40B98A1B53E84EC2B419' ? this.item.Longitude?.toString() : undefined,
          this.item.SkiRegionId != '8260DC5B815D40B98A1B53E84EC2B419' ? this.item.AreaRadius?.toString() : undefined,
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

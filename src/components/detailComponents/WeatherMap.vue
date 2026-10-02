<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="weather-map">
    <l-map
      ref="map"
      class="weather-map-canvas"
      :bounds="bounds"
      :options="mapOptions"
      @ready="onReady"
    >
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-polygon
        v-for="(ring, index) in rings"
        :key="'ring' + index"
        :lat-lngs="ring"
        :color="colors.line"
        :fill-color="colors.fill"
        :fill-opacity="0.14"
        :weight="2"
        :interactive="false"
      />
      <l-circle-marker
        v-for="point in points"
        :key="point.id"
        :lat-lng="point.latLng"
        :radius="point.id === highlight ? 10 : 7"
        :weight="2.5"
        color="#ffffff"
        :fill-color="
          point.id === highlight
            ? colors.highlight
            : point.kind === 'station'
            ? colors.station
            : colors.line
        "
        :fill-opacity="1"
        @mouseover="$emit('highlight', point.id)"
        @mouseout="$emit('highlight', null)"
      >
        <l-tooltip :options="{ direction: 'top', offset: [0, -8] }">
          <strong>{{ point.name }}</strong>
          <span v-if="point.label"> · {{ point.label }}</span>
        </l-tooltip>
      </l-circle-marker>
    </l-map>
  </div>
</template>

<script lang="ts">
import {
  LMap,
  LTileLayer,
  LPolygon,
  LCircleMarker,
  LTooltip,
} from 'vue2-leaflet';
import { latLngBounds, LatLngBounds } from 'leaflet';
import Vue, { PropType } from 'vue';
import { LatLng } from './measuringPoints';

export interface MapPoint {
  id: string;
  name: string;
  label: string;
  kind: 'snow' | 'station';
  latLng: LatLng;
}

export default Vue.extend({
  name: 'WeatherMap',
  components: {
    LMap,
    LTileLayer,
    LPolygon,
    LCircleMarker,
    LTooltip,
  },
  props: {
    rings: {
      type: Array as PropType<LatLng[][]>,
      default: () => [],
    },
    points: {
      type: Array as PropType<MapPoint[]>,
      default: () => [],
    },
    highlight: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        "&copy; <a target='_blank' href='https://openstreetmap.org/copyright'>OpenStreetMap</a> | <a target='_blank' href='https://opendatahub.com'>Open Data Hub</a>",
      mapOptions: {
        scrollWheelZoom: false,
        zoomSnap: 0.25,
        zoomControl: true,
      },
      colors: {
        line: '#1f6fb2',
        fill: '#1f6fb2',
        station: '#1d2b3a',
        highlight: '#e8a33d',
      },
    };
  },
  computed: {
    bounds(): LatLngBounds {
      const latLngs = [
        ...this.rings.reduce((all, ring) => all.concat(ring), [] as LatLng[]),
        ...this.points.map((point) => point.latLng),
      ];
      return latLngBounds(latLngs).pad(0.08);
    },
  },
  methods: {
    onReady() {
      // the map is mounted while the tab becomes visible; measure again once laid out
      setTimeout(() => this.invalidate(), 150);
    },
    invalidate() {
      const map = (this.$refs.map as LMap | undefined)?.mapObject;
      if (!map) return;
      map.invalidateSize();
      map.fitBounds(this.bounds);
    },
  },
});
</script>

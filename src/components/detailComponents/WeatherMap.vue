<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <div>
      <l-map :center="center" :zoom="zoom" class="map" ref="myMap">
        <l-tile-layer :url="url"> </l-tile-layer>
        <l-marker :lat-lng="center">
          <l-popup
            :options="{ autoClose: false, closeOnClick: false }"
            :content="getSkiAreaContent()"
          ></l-popup>
        </l-marker>
        <l-marker
          v-for="marker in measuringpoints"
          :key="marker.Id"
          :lat-lng="returnMarkerLatLng(marker)"
        >
          <l-popup
            :options="{ autoClose: false, closeOnClick: false }"
            :content="getMarkerContent(marker)"
          ></l-popup>
        </l-marker>
      </l-map>
    </div>
  </div>
</template>

<script lang="ts">
import { LMap, LTileLayer, LMarker, LPopup, LLayerGroup } from 'vue2-leaflet';
import { LatLngTuple } from 'leaflet';
import { WeatherApi } from '@/api/api';
import { Measuringpoint, SkiAreaLinked } from '@/api/models';
import Vue, { PropType } from 'vue';
import moment from 'moment';

export default Vue.extend({
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    // LLayerGroup
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
      rawMeasuringpoints: Measuringpoint[] | null;
      titles: string[];
      url: string;
      center: LatLngTuple;
      zoom: number;
      markerLatLng: LatLngTuple[] | null;
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
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      center: [46.7728692, 10.7916716],
      zoom: 13,
      markerLatLng: null,
    };

    return data;
  },
  // mounted() {
  //  this.doSomethingOnReady();
  // },
  computed: {
    measuringpoints():
      | {
          Id?: string;
          Shortname?: string;
          SnowHeight?: string;
          newSnowHeight?: string;
          LastSnowDate?: Date;
          Altitude?: number;
          LastUpdate?: Date;
          Latitude?: number;
          Longitude?: number;
        }[]
      | undefined {
      return this.rawMeasuringpoints?.map(
        ({
          Id,
          Shortname,
          SnowHeight,
          newSnowHeight,
          LastSnowDate,
          Altitude,
          LastUpdate,
          Latitude,
          Longitude,
        }) => {
          return {
            Id: Id ?? undefined,
            Shortname: Shortname ?? undefined,
            SnowHeight: SnowHeight ?? undefined,
            newSnowHeight: newSnowHeight ?? undefined,
            LastSnowDate: LastSnowDate ?? undefined,
            Altitude: Altitude ?? undefined,
            LastUpdate: LastUpdate ?? undefined,
            Latitude: Latitude ?? undefined,
            Longitude: Longitude ?? undefined,
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

          this.center = [this.item.Latitude!, this.item.Longitude!];
        });
    },
    returnMarkerLatLng(marker: Measuringpoint) {
      return [marker.Latitude, marker.Longitude];
    },
    getMarkerContent(marker: Measuringpoint) {
      const mpname = '<tr><td><h3>' + marker.Shortname + '</h3></td></tr>';
      const snowheight =
        '<tr><td>Snow Height: ' + marker.SnowHeight + '</td></tr>';
      const newsnow =
        '<tr><td>New Snow: ' + marker.newSnowHeight + '</td></tr>';
      const lastupdate =
        '<tr><td>Last Update: ' +
        moment(marker.LastUpdate).format('DD-MM-YYYY HH:MM') +
        '</td></tr>';
      const altitude = '<tr><td>Altitude: ' + marker.Altitude + '</td></tr>';

      return (
        '<table class="table table-striped">' +
        mpname +
        snowheight +
        newsnow +
        lastupdate +
        altitude +
        '</table>'
      );
    },
    getSkiAreaContent() {
      const mpname =
        '<h3>' + this.item?.Detail?.[this.language].Title + '</h3>';

      return mpname;
    },
  },
});
</script>

<style>
/* @import 'http://cdn.leafletjs.com/leaflet-0.7.5/leaflet.css'; */

.map {
  position: relative;
  width: 100%;
  height: 500px;
  max-height: 500px;
  min-height: 300px;
  overflow: hidden;
}
</style>

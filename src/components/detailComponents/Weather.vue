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
            <td
              v-for="entry in Object.entries(point).filter(
                (x) =>
                  x[0] != 'Id' &&
                  x[0] != 'Altitude' &&
                  x[0] != 'Latitude' &&
                  x[0] != 'Longitude'
              )"
              :key="entry[0]"
            >
              <span v-if="entry[0] == 'Shortname'">{{ entry[1] }}</span>
              <span v-if="entry[0] == 'LastSnowDate'">{{
                lastsnowdate(entry[1])
              }}</span>
              <span v-if="entry[0] == 'LastUpdate'">{{
                lastupdate(entry[1])
              }}</span>
              <span v-if="entry[0] == 'SnowHeight'">{{ entry[1] }} cm</span>
              <span v-if="entry[0] == 'newSnowHeight'">{{ entry[1] }} cm</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="text-center">
      <span>{{ $t('noData.weather') }}</span>
    </div>
    <div v-if="measuringpoints">
      <WeatherMap :item="item" :language="language" />
    </div>
  </div>
</template>

<script lang="ts">
import { LMap } from 'vue2-leaflet';
import { LatLngTuple } from 'leaflet';
import { WeatherApi } from '@/api/api';
import { Measuringpoint, SkiAreaLinked } from '@/api/models';
import Vue, { PropType } from 'vue';
import moment from 'moment';

import WeatherMap from './WeatherMap.vue';

export default Vue.extend({
  components: {
    WeatherMap,
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
    refreshmarker: {
      type: Number,
      required: true,
    },
  },
  data() {
    const data: {
      rawMeasuringpoints: Measuringpoint[] | null;
      titles: string[];
      url: string;
      center: LatLngTuple | null;
      zoom: number;
      markerLatLng: LatLngTuple[] | null;
    } = {
      rawMeasuringpoints: null,
      titles: [
        this.$t('weathertable.measuringpointname').toString(),
        this.$t('weathertable.snowheight').toString(),
        this.$t('weathertable.newsnow').toString(),
        this.$t('weathertable.lastsnowdate').toString(),
        this.$t('weathertable.lastupdate').toString(),
      ],
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      center: null,
      zoom: 13,
      markerLatLng: null,
    };

    return data;
  },
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
    refreshmarker: function() {
      console.log('refreshmarker changed');
      this.resizeMap();
    },
  },
  methods: {
    init() {
      this.loadMeasuringpoints();
    },
    loadMeasuringpoints() {
      if (!this.item.Id) return;

      this.center = [this.item.Latitude ?? 0, this.item.Longitude ?? 0];

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
    getSkiAreaContent: function() {
      const mpname =
        '<h3>' + this.item?.Detail?.[this.language].Title + '</h3>';

      return mpname;
    },
    lastupdate: function(date: any) {
      return moment(date).format('DD-MM-YYYY');
    },
    lastsnowdate: function(date: any) {
      const lastsnowdatetemp = moment(date).format('DD-MM-YYYY');
      if (lastsnowdatetemp == '01-01-0001') return 'no info';
      else return lastsnowdatetemp;
    },
    resizeMap: function() {
      const mymap = (this.$refs?.myMap as LMap).mapObject;
      console.log('refresh map');
      mymap.invalidateSize();
    },
  },
});
</script>

<style>
.map {
  position: relative;
  width: 100%;
  min-height: 300px;
  max-height: 300px;
  height: 350px;
  overflow: hidden;
}
</style>

<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="d-flex flex-column w-100">

    <div v-if="isItemEmpty && !isLoading" class="flex-grow-1 d-flex flex-row align-items-center">
      <span
        class="p-1 pe-3 card border-0 rounded-pill shadow-sm d-inline-flex flex-row align-items-center"
        @click="close"
      >
        <arrow-icon-left viewBox="0 0 24 24" height="30" width="30" />
        <span>{{ $t('back') }}</span>
      </span>
      {{ $t('noItemData') }}
    </div>

    <div v-else-if="item" class="d-flex flex-column card rounded-4 border-0 shadow overflow-hidden">
      <div class="d-flex flex-column align-items-start justify-content-between" :style="titleImage">

        <span
          class="m-4 p-1 pe-3 card border-0 rounded-pill shadow-sm d-inline-flex flex-row align-items-center"
          @click="close"
        >
          <arrow-icon-left viewBox="0 0 24 24" height="30" width="30" />
          <span>{{ $t('back') }}</span>
        </span>

        <div class="p-4 w-100 gradient-black-transparent d-flex align-items-end">
          <h1 class="mb-0 mt-5 text-white fs-1">{{ itemDetail.Title }}</h1>
          <div class="flex-grow-1">
            <nav class="nav nav-underline justify-content-end gap-4">
              <div
                v-for="menu in menus"
                :key="menu"
                class="nav-item"
              >
                <a
                  class="nav-link"
                  :class="selectedMenu === menu ? 'active' : ''"
                  @click="selectedMenu = menu"
                >{{ menu }}</a>
              </div>
            </nav>
          </div>
        </div>

      </div>

      <div class="p-4">
        <div class="d-flex flex-column gap-4" v-if="selectedMenu === 'Info'">
          <div class="row g-2">
            <!-- SkiRegion -->
            <div class="col-4 d-flex align-items-center gap-1">
              <map-icon class="map-icon icon"></map-icon>
              <span>{{ $t('skiregion') }}:</span>
              <span class="fw-bold">{{ item.SkiRegionName[language] }}</span>
            </div>

            <!-- Lift Count -->
            <div class="col-4 d-flex align-items-center gap-1">
              <highlight class="highlight icon"></highlight>
                <span>{{ $t('props.LiftCount') }}:</span>
                <span class="fw-bold">{{ item.LiftCount }}</span>
            </div>

            <!-- Total Slope KM with colors -->
            <div class="col-4 d-flex align-items-center gap-1">
              <distance-length  class="distance-length icon"></distance-length>
              <span>{{ $t('props.TotalSlopeKm') }}:</span>
              <span class="fw-bold">{{ item.TotalSlopeKm }} km</span> (
              <span style="color:blue">{{ item.SlopeKmBlue }}</span> /
              <span style="color:red">{{ item.SlopeKmRed }}</span> /
              <span style="color:black">{{ item.SlopeKmBlack }}</span> )
            </div>

            <!-- Altitude -->
            <div class="col-4 d-flex align-items-center gap-1">
              <altitude-difference class="altitude-difference icon"></altitude-difference>
              <span>{{ $t('props.Altitude') }}:</span>
              <span class="fw-bold">{{ item.AltitudeTo }} - {{ item.AltitudeFrom }} m</span>
            </div>

            <!-- Location info -->
            <div class="col-4 d-flex align-items-center gap-1">
              <map-icon class="map-icon icon"></map-icon>
              <span>{{ $t('location') }}: </span>
              <span class="fw-bold text-truncate" :title="itemLocationInfo">{{ itemLocationInfo }}</span>
            </div>

            <!-- Contact info -->
            <div class="col-4 d-flex align-items-center gap-1">
              <external-link class=""></external-link>
              <span>{{ $t('web') }}: </span>
              <a :href="itemContactInfos.Url" target="_blank">
                Homepage
              </a>
            </div>

            <!-- Phone info -->
            <div class="col-4 d-flex align-items-center gap-1">
              <phone class="phone icon"></phone>
              <span>{{ $t('phone') }}: </span>
              <span class="fw-bold">{{ itemContactInfos.Phonenumber }}</span>
            </div>

            <!-- Google Maps Link -->
            <div class="col-4 d-flex align-items-center gap-1">
              <map-icon class="map-icon icon"></map-icon>
                <a :href="googleMapsLink" target="_blank">Google Maps</a>
            </div>

            <!-- Open / Closed -->
            <div class="col-4 d-flex align-items-center gap-1">
              <calendar class="calendar icon"></calendar>
                <span v-if="isSkiAreaOpen === true" style="color:#9BC320">{{
                  $t(`scheduleTypes.1`)
                }}</span>
                <span v-if="isSkiAreaOpen === false" style="color:red">{{
                  $t(`scheduleTypes.2`)
                }}</span>
            </div>
          </div>
          <div
            v-if="itemDetail.BaseText"
            v-html="itemDetail.BaseText"
          ></div>
        </div>

        <div v-if="selectedMenu === 'Lifts'">
          <!-- <div class="detail-box-lifts">
            <ul class="props">
              <li class="text" v-for="(liftvalue, key) of itemLifts" :key="key">
                <span class="prop-key">{{ liftvalue.title }} / {{ liftvalue.category }} </span>

                <span v-if="liftvalue.IsOpen === true" style="color:#9BC320">{{
                $t('scheduleTypes.1')
              }}</span>
              <span v-if="liftvalue.IsOpen === false" style="color:red">{{
                $t('scheduleTypes.2')
              }}</span>
              </li>
            </ul>
          </div> -->
        </div>
        
        <small class="d-block mt-4">
          {{ $t('lastChange') }}: {{ item.LastChange }}
        </small>
        <small class="d-block"> Opendatahub ID: {{ this.item.Id }} </small>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ArrowIconLeft from '@/assets/img/arrow_left.svg';
import ExternalLink from '@/assets/img/ic_external-link.svg';
import AltitudeDifference from '@/assets/img/ic_altitudedifference.svg';
import Calendar from '@/assets/img/ic_calendar.svg';
import DistanceLength from '@/assets/img/ic_distancelength.svg';
import Highlight from '@/assets/img/ic_highlight.svg';
import MapIcon from '@/assets/img/ic_map.svg';
import Phone from '@/assets/img/ic_phone.svg';
import { CommonApi, ODHActivityPoiApi, WeatherApi, TagApi } from '@/api';
import { Measuringpoint, SkiAreaLinked, ODHActivityPoiLinked, TagLinked } from '@/api/models';
import { APIResponse } from '@/types';
import { PropType } from 'vue';

type Menu = "Info" | "Slopes" | "Lifts" | "Weather" | "Webcam";

export default {
  components: {
    ArrowIconLeft,
    ExternalLink,
    AltitudeDifference,
    Calendar,
    DistanceLength,
    MapIcon,
    Phone,
    Highlight,
  },
  props: {
    item: {
      type: Object as PropType<SkiAreaLinked>,
      required: true,
    },
    language: {
      type: String,
      default: 'en',
    },
  },
  data() {
    const data: {
      lifts: ODHActivityPoiLinked[],
      measuringpoints: Measuringpoint[],
      lifttypes: TagLinked[],
      showImage: boolean,
      imageUrl: string | null,
      selectedImage: null,
      isLoading: boolean,
      menus: Menu[],
      selectedMenu: Menu,
    } = {
      lifts: [],
      measuringpoints: [],
      lifttypes: [],
      showImage: false,
      imageUrl: null,
      selectedImage: null,
      isLoading: false,
      menus: [
        "Info",
        "Slopes",
        "Lifts",
        "Weather",
        "Webcam",
      ],
      selectedMenu: "Info",
    };

    return data;
  },
  computed: {
    itemDetail() {
      return this.item?.Detail?.[this.language] || {};
    },
    itemContactInfos() {
      return this.item?.ContactInfos?.[this.language] || {};
    },
    titleImage(): {
      backgroundImage?: string,
      height?: string,
      backgroundSize?: string,
      backgroundPosition?: string
    } {
      const image = this.item?.ImageGallery != null ? this.item?.ImageGallery[0] : null;
      if (image == null) {
        return {};
      } else {
        return {
          backgroundImage: 'url(' + image.ImageUrl + ') ',
          height: '400px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        };
      }
    },
    googleMapsLink(): string | null | undefined {
      return this.item?.GpsPoints?.position?.Latitude && this.item?.GpsPoints?.position?.Longitude
        ? `https://www.google.com/maps/search/?api=1&query=${this.item.GpsPoints['position']?.Latitude},${this.item.GpsPoints['position']?.Longitude}`
        : null;
    },
    isSkiAreaOpen() {
      const schedules = this.item.OperationSchedule?.filter((s) => {
        const start = new Date(s.Start);
        const stop = new Date(s.Stop);
        const now = new Date();
        return ((s.Type === '1' || s.Type === '2' ||  s.Type === '3'));
      });
      const schedule =
       schedules !== undefined && schedules !== null && schedules.length > 0 ? schedules[0] : null;
      let open = null;
      if (schedule !== null) {


        if(schedule.start < new Date() && schedule.stop > new Date())
            open = true;
        else
            open = false;

      }

      //console.log(open);

      return open;
    },
    itemLocationInfo() {
      let region = "";
      let tv = "";

      if (this.item?.LocationInfo?.RegionInfo?.Name[this.language]) {
        region = this.item?.LocationInfo?.RegionInfo?.Name[this.language];
      }
      if (this.item?.LocationInfo?.TvInfo?.Name[this.language] ) {
        tv = ' - ' + this.item?.LocationInfo?.TvInfo?.Name[this.language];
      }

      const location = region + tv;

      return location;
    },
    isItemEmpty() {
      return Object.keys(this.item).length === 0;
    },
  },
  created() {
    this.isLoading = true;
    console.log(this);
    this.loadSkiAreaMeasuringpoints();
    this.loadLiftTypes();
    this.loadSkiAreaLifts();
  },
  methods: {
    dateFormat(dateString: string): string {
      const d = new Date(dateString);
      const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
      const month = d.getMonth() + 1;
      const monthStr = month < 10 ? '0' + month : month;
      return `${day}/${monthStr}/${d.getFullYear()}`;
    },
    loadSkiAreaLifts(): void {
      if (!this.item.Id) return;
      new ODHActivityPoiApi()
        .v1ODHActivityPoiGet(this.language,
        1, 1000, undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.language, "ska" + this.item.Id, undefined, undefined,
        "aufstiegsanlagen", undefined, undefined, true, undefined, undefined, undefined, undefined, undefined, undefined,undefined,undefined,undefined,undefined,
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, false, undefined)
        .then((value) => {
          this.lifts = (value.data as unknown as APIResponse<Measuringpoint>).Items ?? [];
        });
    },
    loadSkiAreaMeasuringpoints(): void {
      if (!this.item.Id) return;
      new WeatherApi()
        .v1WeatherMeasuringpointGet(1, 25, undefined, undefined, undefined, this.item.Id, this.language, undefined, true, undefined, undefined, undefined,
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, false, undefined)
        .then((value) => {
          this.measuringpoints = (value.data as unknown as APIResponse<Measuringpoint>).Items ?? [];
        });
    },
    loadLiftTypes(): void {
      new TagApi()
      .v1TagGet(1, 0, this.language, undefined, undefined, undefined, undefined, undefined, ['Id', 'TagName'],
        undefined, 'eq(Mapping.odh.parent_id,"Aufstiegsanlagen")', undefined, undefined, false, undefined)
        .then((value) => {
          this.lifttypes = (value.data as unknown as APIResponse<TagLinked>).Items ?? [];
        });
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>

<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <div class="row g-2">
      <!-- SkiRegion -->
      <div v-if="skiRegionName" class="col-4 d-flex align-items-center gap-1">
        <map-icon class="map-icon icon"></map-icon>
        <span>{{ $t('skiregion') }}:</span>
        <span class="fw-bold">{{ skiRegionName }}</span>
      </div>

      <!-- Lift Count -->
      <div v-if="item.LiftCount" class="col-4 d-flex align-items-center gap-1">
        <highlight class="highlight icon"></highlight>
        <span>{{ $t('props.LiftCount') }}:</span>
        <span class="fw-bold">{{ item.LiftCount }}</span>
      </div>

      <!-- Total Slope KM with colors -->
      <div v-if="hasSlopeInfo" class="col-4 d-flex align-items-center gap-1">
        <distance-length class="distance-length icon"></distance-length>
        <span>{{ $t('props.TotalSlopeKm') }}:</span>
        <span class="fw-bold">{{ item.TotalSlopeKm }} km</span> (
        <span style="color:blue">{{ item.SlopeKmBlue }}</span> /
        <span style="color:red">{{ item.SlopeKmRed }}</span> /
        <span style="color:black">{{ item.SlopeKmBlack }}</span> )
      </div>

      <!-- Altitude -->
      <div
        v-if="item.AltitudeTo && item.AltitudeFrom"
        class="col-4 d-flex align-items-center gap-1"
      >
        <altitude-difference
          class="altitude-difference icon"
        ></altitude-difference>
        <span>{{ $t('props.Altitude') }}:</span>
        <span class="fw-bold"
          >{{ item.AltitudeTo }} - {{ item.AltitudeFrom }} m</span
        >
      </div>

      <!-- Location info -->
      <div v-if="locationInfo" class="col-4 d-flex align-items-center gap-1">
        <map-icon class="map-icon icon"></map-icon>
        <span>{{ $t('location') }}: </span>
        <span class="fw-bold text-truncate" :title="locationInfo">{{
          locationInfo
        }}</span>
      </div>

      <!-- Contact info -->
      <div v-if="contactInfos" class="col-4 d-flex align-items-center gap-1">
        <external-link class=""></external-link>
        <span>{{ $t('web') }}: </span>
        <a :href="contactInfos.Url" target="_blank">
          Homepage
        </a>
      </div>

      <!-- Phone info -->
      <div v-if="contactInfos" class="col-4 d-flex align-items-center gap-1">
        <phone class="phone icon"></phone>
        <span>{{ $t('phone') }}: </span>
        <span class="fw-bold">{{ contactInfos.Phonenumber }}</span>
      </div>

      <!-- Google Maps Link -->
      <div v-if="googleMapsLink" class="col-4 d-flex align-items-center gap-1">
        <map-icon class="map-icon icon"></map-icon>
        <a :href="googleMapsLink" target="_blank">Google Maps</a>
      </div>

      <!-- Open / Closed -->
      <div
        v-if="isOpen != undefined"
        class="col-4 d-flex align-items-center gap-1"
      >
        <calendar class="calendar icon"></calendar>
        <span v-if="isOpen" style="color:#9BC320">{{
          $t(`scheduleTypes.1`)
        }}</span>
        <span v-else style="color:red">{{ $t(`scheduleTypes.2`) }}</span>
      </div>
    </div>
    <div v-if="detail && detail.BaseText" v-html="detail.BaseText"></div>
  </div>
</template>

<script lang="ts">
import { ContactInfos, Detail, SkiAreaLinked } from '@/api/models';
import Vue, { PropType } from 'vue';
import ExternalLink from '@/assets/img/ic_external-link.svg';
import AltitudeDifference from '@/assets/img/ic_altitudedifference.svg';
import Calendar from '@/assets/img/ic_calendar.svg';
import DistanceLength from '@/assets/img/ic_distancelength.svg';
import Highlight from '@/assets/img/ic_highlight.svg';
import MapIcon from '@/assets/img/ic_map.svg';
import Phone from '@/assets/img/ic_phone.svg';

export default Vue.extend({
  components: {
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
      required: false,
      default: 'en',
    },
  },
  computed: {
    skiRegionName(): string | undefined {
      return this.item.SkiRegionName?.[this.language];
    },
    locationInfo(): string | undefined {
      let region = '';
      let tv = '';

      if (this.item?.LocationInfo?.RegionInfo?.Name?.[this.language]) {
        region = this.item?.LocationInfo?.RegionInfo?.Name[this.language];
      }
      if (this.item?.LocationInfo?.TvInfo?.Name?.[this.language]) {
        tv = ' - ' + this.item?.LocationInfo?.TvInfo?.Name[this.language];
      }

      const location = region + tv;

      return location !== '' ? location : undefined;
    },
    contactInfos(): ContactInfos | undefined {
      return this.item?.ContactInfos?.[this.language];
    },
    googleMapsLink(): string | undefined {
      return this.item?.GpsPoints?.position?.Latitude &&
        this.item?.GpsPoints?.position?.Longitude
        ? `https://www.google.com/maps/search/?api=1&query=${this.item.GpsPoints['position']?.Latitude},${this.item.GpsPoints['position']?.Longitude}`
        : undefined;
    },
    isOpen(): boolean | undefined {
      const schedules = this.item.OperationSchedule?.filter((s) => {
        return s.Type === '1' || s.Type === '2' || s.Type === '3';
      });

      const schedule = schedules?.[0];
      if (!schedule?.Start || !schedule?.Stop) return undefined;

      return schedule.Start < new Date() && schedule.Stop > new Date();
    },
    detail(): Detail | undefined {
      return this.item?.Detail?.[this.language];
    },
    hasSlopeInfo(): boolean {
      return (
        (this.item.SlopeKmBlack != null &&
          this.item.SlopeKmRed != null &&
          this.item.SlopeKmBlue != null &&
          this.item.TotalSlopeKm != null) ??
        false
      );
    },
  },
});
</script>

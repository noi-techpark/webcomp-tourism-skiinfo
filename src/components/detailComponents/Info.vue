<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="d-flex flex-column justify-content-between">
    <div class="d-flex flex-column gap-4">
      <div class="row g-2">
        <!-- SkiRegion -->
        <div
          v-if="skiRegionName"
          class="col-12 col-lg-4 d-flex align-items-center gap-2"
        >
          <map-icon class="map-icon icon"></map-icon>
          <span>{{ $t('skiregion') }}:</span>
          <span class="fw-bold text-truncate">{{ skiRegionName }}</span>
        </div>

        <!-- Lift Count -->
        <div
          v-if="item.LiftCount"
          class="col-12 col-lg-4 d-flex align-items-center gap-2"
        >
          <highlight class="highlight icon"></highlight>
          <span>{{ $t('props.LiftCount') }}:</span>
          <span class="fw-bold">{{ item.LiftCount }}</span>
        </div>

        <!-- Total Slope KM with colors -->
        <div
          v-if="hasSlopeInfo"
          class="col-12 col-lg-4 d-flex align-items-center gap-2"
        >
          <distance-length class="distance-length icon"></distance-length>
          <span>{{ $t('props.TotalSlopeKm') }}:</span>
          <div class="fw-bold">
            <span>{{ item.TotalSlopeKm }} km</span> (
            <span class="text-slope-blue">{{ item.SlopeKmBlue }}</span> /
            <span class="text-slope-red">{{ item.SlopeKmRed }}</span> /
            <span class="text-slope-black">{{ item.SlopeKmBlack }}</span>
            )
          </div>
        </div>

        <!-- Altitude -->
        <div
          v-if="item.AltitudeTo && item.AltitudeFrom"
          class="col-12 col-lg-4 d-flex align-items-center gap-2"
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
        <div
          v-if="locationInfo"
          class="col-12 col-lg-4 d-flex align-items-center gap-2"
        >
          <map-icon class="map-icon icon"></map-icon>
          <span>{{ $t('location') }}: </span>
          <span class="fw-bold text-truncate" :title="locationInfo">{{
            locationInfo
          }}</span>
        </div>

        <!-- Contact info -->
        <div
          v-if="contactInfos"
          class="col-12 col-lg-4 d-flex align-items-center gap-2"
        >
          <external-link></external-link>
          <span>{{ $t('web') }}: </span>
          <a class="fw-bold" :href="contactInfos.Url" target="_blank">
            Homepage
          </a>
        </div>

        <!-- Phone info -->
        <div
          v-if="contactInfos"
          class="col-12 col-lg-4 d-flex align-items-center gap-2"
        >
          <phone class="phone icon"></phone>
          <span>{{ $t('phone') }}: </span>
          <span class="fw-bold">{{ contactInfos.Phonenumber }}</span>
        </div>

        <!-- Google Maps Link -->
        <div
          v-if="googleMapsLink"
          class="col-12 col-lg-4 d-flex align-items-center gap-2"
        >
          <map-icon class="map-icon icon"></map-icon>
          <span>{{ $t('info.location') }}: </span>
          <a class="fw-bold" :href="googleMapsLink" target="_blank"
            >Google Maps</a
          >
        </div>

        <!-- Open / Closed -->
        <div
          v-if="isOpen != undefined"
          class="col-12 col-lg-4 d-flex align-items-center gap-2"
          fw-bold
        >
          <calendar class="calendar icon"></calendar>
          <span v-if="isOpen" class="text-open-green fw-bold">{{
            $t(`scheduleTypes.1`)
          }}</span>
          <span v-else class="text-closed-red fw-bold">{{
            $t(`scheduleTypes.2`)
          }}</span>
          <span class="fw bold">{{ seasonDates }}</span>
        </div>
      </div>

      <div v-if="detail && detail.BaseText" v-html="detail.BaseText"></div>
    </div>

    <div class="align-self-baseline">
      <!-- <small class="d-block mt-4">
        {{ $t('lastChange') }}: {{ item.LastChange }}
      </small> -->
      <small class="d-block opendatahubid">Opendatahub ID: {{ item.Id }}</small>
    </div>
  </div>
</template>

<script lang="ts">
import { Detail, SkiAreaLinked } from '@/api/models';
import Vue, { PropType } from 'vue';
import ExternalLink from '@/assets/img/ic_external-link.svg';
import AltitudeDifference from '@/assets/img/ic_altitudedifference.svg';
import Calendar from '@/assets/img/ic_calendar.svg';
import DistanceLength from '@/assets/img/ic_distancelength.svg';
import Highlight from '@/assets/img/ic_highlight.svg';
import MapIcon from '@/assets/img/ic_map.svg';
import Phone from '@/assets/img/ic_phone.svg';
import moment from 'moment';

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
    seasonDates(): string | undefined {
      const schedules = this.item.OperationSchedule?.filter((s) => {
        return s.Type === '1' || s.Type === '2' || s.Type === '3';
      });

      const schedule = schedules?.[0];
      if (!schedule?.Start || !schedule?.Stop) return undefined;
      else {
        const formatL = moment.localeData().longDateFormat('L');
        return (
          '(' +
          moment(schedule?.Start).format(formatL) +
          ' - ' +
          moment(schedule?.Stop).format(formatL) +
          ')'
        );
      }
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
    contactInfos():
      | { Url: string | undefined; Phonenumber: string | undefined }
      | undefined {
      return {
        Url: this.item?.ContactInfos?.[this.language].Url ?? undefined,
        Phonenumber:
          this.item?.ContactInfos?.[this.language].Phonenumber ?? undefined,
      };
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

      const start = new Date(schedule.Start);
      const end = new Date(schedule.Stop);

      if (start < new Date() && end > new Date()) return true;

      return false;
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

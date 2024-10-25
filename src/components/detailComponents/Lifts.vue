<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <div v-if="lifts" class="row gy-3">
      <div
        class="col-12 col-md-6 col-lg-4"
        v-for="(lift, index) in lifts"
        :key="index"
      >
        <OpenClosed :is-open="lift.IsOpen">
          <template #icon>
            <img class="fs-3 s-em" :src="getIcon(lift)" alt="" />
          </template>

          <template #title>
            <span class="fs-5 fw-bold">
              {{ lift.Shortname }}
            </span>
          </template>

          <template>
            <span> {{ getinfo(lift).join(' | ') }}</span>
          </template>
        </OpenClosed>
      </div>
    </div>
    <div v-else class="text-center">
      <span>{{ $t('noData.lifts') }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { ODHActivityPoiApi, TagApi } from '@/api';
import { ODHActivityPoiLinked, SkiAreaLinked, TagLinked } from '@/api/models';
import Vue, { PropType } from 'vue';
import OpenClosed from './OpenClosed.vue';
import icons from '../../assets/img/liftIcons';

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
      liftsUnsorted: ODHActivityPoiLinked[] | null;
      allLiftTypes: TagLinked[] | null | undefined;
    } = {
      liftsUnsorted: null,
      allLiftTypes: null,
    };

    return data;
  },
  computed: {
    lifts(): ODHActivityPoiLinked[] | undefined {
      return this.liftsUnsorted?.sort(({ IsOpen: a }, { IsOpen: b }) =>
        !a && b ? 1 : a && !b ? -1 : 0
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
      this.loadLiftTypes();
      this.loadLifts();
    },
    loadLifts() {
      //To many districts inside
      // let districtIds = "";
      // this.item.DistrictIds?.forEach((currentElement) => districtIds = districtIds + "fra" + currentElement + ",");

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
          this.item.SkiRegionId == '8260DC5B815D40B98A1B53E84EC2B419'
            ? 'ska' + this.item.Id
            : undefined,
          undefined,
          this.item.SkiRegionId == '8260DC5B815D40B98A1B53E84EC2B419'
            ? 'dss'
            : undefined,
          'aufstiegsanlagen',
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
          this.item.SkiRegionId != '8260DC5B815D40B98A1B53E84EC2B419'
            ? this.item.Latitude?.toString()
            : undefined,
          this.item.SkiRegionId != '8260DC5B815D40B98A1B53E84EC2B419'
            ? this.item.Longitude?.toString()
            : undefined,
          this.item.SkiRegionId != '8260DC5B815D40B98A1B53E84EC2B419'
            ? this.item.AreaRadius?.toString()
            : undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          false,
          undefined
        )
        .then((value) => {
          this.liftsUnsorted =
            !value.data.Items || value.data.Items.length === 0
              ? null
              : value.data.Items;
        });
    },
    loadLiftTypes() {
      new TagApi()
        .v1TagGet(
          1,
          0,
          this.language,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          ['Id', 'TagName'],
          undefined,
          'eq(Mapping.odh.parent_id,"Aufstiegsanlagen")',
          undefined,
          undefined,
          false,
          undefined
        )
        .then((value) => {
          this.allLiftTypes = value.data.Items;
        });
    },
    getLiftTypes(lift: ODHActivityPoiLinked): TagLinked[] {
      return (
        this.allLiftTypes?.filter((liftType: TagLinked) =>
          lift.Tags?.some((tag) => tag.Id === liftType.Id)
        ) ?? []
      );
    },
    getinfo(lift: ODHActivityPoiLinked): string[] {
      return [
        this.getLiftTypes(lift)[0]?.TagName?.[this.language] ?? '',
        lift.DistanceLength ? lift.DistanceLength + ' m' : '',
        lift.AltitudeDifference ? lift.AltitudeDifference + ' hm' : '',
      ].filter((e) => e !== '');
    },
    getIcon(lift: ODHActivityPoiLinked): string | undefined {
      const entries = Object.entries(icons);
      //console.log(lift.Shortname);
      const tag = this.getLiftTypes(lift)[0].Id ?? 'cabin train';
      return entries.find((entry) => tag.includes(entry[0]))?.[1];
    },
  },
});
</script>

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
        <OpenClosed :open="lift.IsOpen">
          <span class="d-block fs-5 fw-bold mb-1">
            {{ lift.Shortname }}
          </span>
          <span
            ><img class="fs-5 s-em" :src="getIcon(lift)" alt="" /> |
            {{ getinfo(lift).join(' | ') }}</span
          >
        </OpenClosed>
      </div>
    </div>
    <div v-else class="text-center">
      <span>No lift data available</span>
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
      allLiftTypes: TagLinked[] | null;
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
          this.liftsUnsorted =
            !value.data.Items || value.data.Items.length === 0
              ? null
              : value.data.Items;
        });
    },
    loadLiftTypes() {
      new TagApi()
        .v1TagGet(
          undefined,
          undefined,
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
          this.allLiftTypes = value.data;
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
      const tag = this.getLiftTypes(lift)[0].Id ?? 'cabin train';
      return entries.find((entry) => tag.includes(entry[0]))?.[1];
    },
  },
});
</script>

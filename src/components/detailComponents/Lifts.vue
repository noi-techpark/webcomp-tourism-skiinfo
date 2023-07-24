<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <div v-if="lifts" class="row g-2">
      <div class="col-6 p-2" v-for="lift in lifts" :key="lift.Id">
        <div class="d-flex gap-2">
          <Tick class="fs-3 s-em text-success" v-if="lift.IsOpen" />
          <Cross class="fs-3 s-em text-danger" v-else />
          <div>
            <h2 class="fs-4 mb-1">
              {{ lift.Shortname }}
            </h2>
            <small>{{ getinfo(lift).join(" | ") }}</small>
          </div>
        </div>
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
import Tick from "@/assets/img/ic_tick.svg";
import Cross from "@/assets/img/ic_cross.svg";

export default Vue.extend({
  components: {
    Tick,
    Cross
  },
  props: {
    item: {
      type: Object as PropType<SkiAreaLinked>,
      required: true
    },
    language: {
      type: String,
      required: false,
      default: "en"
    }
  },
  data() {
    const data: {
      lifts: ODHActivityPoiLinked[] | null,
      allLiftTypes: TagLinked[] | null,
    } = {
      lifts: null,
      allLiftTypes: null
    };

    return data;
  },
  created() {
    this.loadLiftTypes();
    this.loadLifts();
  },
  methods: {
    loadLifts() {
      new ODHActivityPoiApi()
        .v1ODHActivityPoiGet(
          this.language, 1, 1000, undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.language, "ska" + this.item.Id, undefined, undefined, "aufstiegsanlagen", undefined, undefined, true, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, false, undefined
        )
        .then((value) => {
          this.lifts = !value.data.Items || value.data.Items.length === 0 
            ? null
            : value.data.Items;
        });
    },
    loadLiftTypes() {
      new TagApi()
        .v1TagGet(
          undefined, undefined, this.language, undefined, undefined, undefined, undefined, undefined, ['Id', 'TagName'], undefined, 'eq(Mapping.odh.parent_id,"Aufstiegsanlagen")', undefined, undefined, false, undefined
        )
        .then((value) => {
          this.allLiftTypes = value.data;
        });
    },
    getLiftTypes(lift: ODHActivityPoiLinked): TagLinked[] {
      return this.allLiftTypes?.filter((liftType: TagLinked) => lift.Tags?.some((tag) => tag.Id === liftType.Id)) ?? [];
    },
    getinfo(lift: ODHActivityPoiLinked): Record<string, any> {
      return [
        this.getLiftTypes(lift)[0]?.TagName?.[this.language],
        lift.DistanceLength ? lift.DistanceLength + " m" : null, 
      ].filter((e) => e);
    }
  }
});
</script>

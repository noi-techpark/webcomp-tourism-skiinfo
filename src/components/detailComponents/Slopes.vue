<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <div v-if="slopes" class="row">
      <!-- <div v-for="slopeColors" :key="color" class="col-4"></div> -->
    </div>
    <div v-else class="text-center">
      <span>No slope data available</span>
    </div>
  </div>
</template>

<script lang="ts">
import { ODHActivityPoiApi } from '@/api/api';
import { ODHActivityPoiLinked, SkiAreaLinked } from '@/api/models';
import Vue, { PropType } from 'vue';

export default Vue.extend({
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
      slopes: ODHActivityPoiLinked[] | null,
    } = {
      slopes: null,
    };

    return data;
  },
  computed: {
  },
  created() {
    this.loadSlopes();
  },
  methods: {
    loadSlopes() {
      if (!this.item.Id) return;
      new ODHActivityPoiApi()
        .v1ODHActivityPoiGet(this.language,
        1, 1000, undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.language, "ska" + this.item.Id, undefined, undefined,
        "pisten", undefined, undefined, true, undefined, undefined, undefined, undefined, undefined, undefined,undefined,undefined,undefined,undefined,
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, false, undefined)
        .then((value) => {
          this.slopes = !value.data.Items || value.data.Items.length === 0
            ? null
            : value.data.Items
        });
    },
  }
});
</script>

<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="d-flex gap-2">
    <Tick class="flex-shrink-0 fs-3 s-em text-success" v-if="open" />
    <Cross class="flex-shrink-0 fs-3 s-em text-danger" v-else />
    <div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Tick from '@/assets/img/ic_tick.svg';
import Cross from '@/assets/img/ic_cross.svg';
import Vue from 'vue';

export default Vue.extend({
  components: {
    Tick,
    Cross,
  },
  props: {
    open: {
      type: Boolean,
    },
  },
});
</script>

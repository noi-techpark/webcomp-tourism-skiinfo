<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <span class="p-1 card border-0 rounded-pill shadow-sm pointer">
    <ArrowIconLeft
      v-if="direction === 'left'"
      viewBox="0 0 24 24"
      class="s-em fs-1 text-secondary"
      @click="$emit('previous-item')"
    />
    <ArrowIconRight
      v-else-if="direction === 'right'"
      viewBox="0 0 24 24"
      class="s-em fs-1 text-secondary"
      @click="$emit('next-item')"
    />
  </span>
</template>

<script>
import ArrowIconLeft from '@/assets/img/arrow_left.svg';
import ArrowIconRight from '@/assets/img/arrow_right.svg';
import Vue from 'vue';

export default Vue.extend({
  props: {
    direction: {
      type: String,
    },
  },
  components: {
    ArrowIconLeft,
    ArrowIconRight,
  },
});
</script>

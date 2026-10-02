<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <span class="skiinfo-icon-btn">
    <ArrowIconLeft
      v-if="direction === 'left'"
      viewBox="0 0 24 24"
      @click="$emit('previous-item')"
    />
    <ArrowIconRight
      v-else-if="direction === 'right'"
      viewBox="0 0 24 24"
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

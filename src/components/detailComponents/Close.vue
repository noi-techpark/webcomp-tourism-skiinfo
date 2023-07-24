<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <span
    class="p-1 m-4 card border-0 rounded-pill shadow-sm pointer"
    @click="$emit('close')"
  >
    <ArrowIconLeft viewBox="0 0 24 24" class="s-em fs-1 text-secondary" />
  </span>
</template>

<script>
import ArrowIconLeft from '@/assets/img/arrow_left.svg';
import Vue from 'vue';

export default Vue.extend({
  components: {
    ArrowIconLeft,
  },
});
</script>

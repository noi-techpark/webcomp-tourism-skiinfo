<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <span class="skiinfo-icon-btn" @click="$emit('close')">
    <ArrowIconLeft viewBox="0 0 24 24" />
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

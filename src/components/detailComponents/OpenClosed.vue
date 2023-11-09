<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="d-flex align-items-center gap-3">
    <slot name="icon" />
    <div>
      <div class="d-flex align-items-center gap-2">
        <slot name="title" />

        <div v-if="!isOpen" class="badge rounded-pill text-bg-danger">
          Closed
        </div>

        <div v-if="isOpen" class="badge rounded-pill text-bg-success">
          Open
        </div>
      </div>
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    isOpen: {
      type: Boolean,
    },
  },
});
</script>

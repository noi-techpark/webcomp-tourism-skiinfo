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

        <span v-if="!isOpen" class="status-badge is-closed">
          {{ $t('closed') }}
        </span>

        <span v-if="isOpen" class="status-badge is-open">
          {{ $t('open') }}
        </span>
      </div>
      <div class="small text-secondary">
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

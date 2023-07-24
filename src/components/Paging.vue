<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="text-center" v-if="totalPages > 1">

    <span class="pointer px-3" @click="lastPage" :class="currentPage !== 1 ? 'visible' : 'invisible'">
      {{ $t('paging.back') }}
    </span>

    <span v-if="totalPages < 8">
      <span
        class="pointer px-1"
        v-for="page in totalPages"
        @click="goToPage(page)"
        :class="{ 'fw-bold': currentPage === page }"
        :key="page"
      >
        {{ page }}
      </span>
    </span>

    <span v-else>
      <span v-if="currentPage < 4">
        <span
          class="pointer px-1"
          v-for="i in [1, 2, 3, 4]"
          :key="i"
          @click="goToPage(i)"
          :class="{ 'fw-bold': currentPage === i }"
          >{{ i }}</span
        >
        <span class="px-1">...</span>
        <span class="pointer px-1" @click="goToPage(totalPages)">{{ totalPages }}</span>
      </span>

      <span v-else-if="currentPage < totalPages - 2">
        <span class="pointer px-1" @click="goToPage(1)">1</span>
        <span class="px-1">...</span>
        <span class="pointer px-1" @click="goToPage(currentPage - 1)">{{
          currentPage - 1
        }}</span>
        <span class="fw-bold pointer" @click="goToPage(currentPage + 1)">{{ currentPage }}</span>
        <span class="pointer px-1" @click="goToPage(currentPage + 1)">{{
          currentPage + 1
        }}</span>
        <span class="px-1">...</span>
        <span class="pointer px-1" @click="goToPage(totalPages)">{{ totalPages }}</span>
      </span>

      <span v-else>
        <span class="pointer px-1" @click="goToPage(1)">1</span>
        <span class="px-1">...</span>
        <span
          class="pointer px-1"
          v-for="i in [3, 2, 1, 0]"
          :key="i"
          @click="goToPage(totalPages - i)"
          :class="{ 'fw-bold': currentPage === totalPages - i }"
          >{{ totalPages - i }}</span
        >
      </span>
    </span>

    <span class="pointer px-3" @click="nextPage" :class="currentPage !== totalPages ? 'visible' : 'invisible'">
      {{ $t('paging.next') }}
    </span>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'Paging',
  props: {
    currentPage: {
      required: true,
      type: Number,
    },
    totalPages: {
      required: true,
      type: Number,
    },
  },
  methods: {
    nextPage() {
      this.$emit('next-page');
    },
    lastPage() {
      this.$emit('last-page');
    },
    goToPage(pageNum) {
      this.$emit('go-to-page', pageNum);
    },
  },
});
</script>

<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="skiinfo-paging" v-if="totalPages > 1">
    <span
      class="page-btn"
      @click="lastPage"
      :class="currentPage !== 1 ? 'visible' : 'invisible'"
    >
      {{ $t('paging.back') }}
    </span>

    <span v-if="totalPages < 8">
      <span
        class="page-btn"
        v-for="page in totalPages"
        @click="goToPage(page)"
        :class="{ active: currentPage === page }"
        :key="page"
      >
        {{ page }}
      </span>
    </span>

    <span v-else>
      <span v-if="currentPage < 4">
        <span
          class="page-btn"
          v-for="i in [1, 2, 3, 4]"
          :key="i"
          @click="goToPage(i)"
          :class="{ active: currentPage === i }"
          >{{ i }}</span
        >
        <span class="page-ellipsis">…</span>
        <span class="page-btn" @click="goToPage(totalPages)">{{
          totalPages
        }}</span>
      </span>

      <span v-else-if="currentPage < totalPages - 2">
        <span class="page-btn" @click="goToPage(1)">1</span>
        <span class="page-ellipsis">…</span>
        <span class="page-btn" @click="goToPage(currentPage - 1)">{{
          currentPage - 1
        }}</span>
        <span class="page-btn active">{{ currentPage }}</span>
        <span class="page-btn" @click="goToPage(currentPage + 1)">{{
          currentPage + 1
        }}</span>
        <span class="page-ellipsis">…</span>
        <span class="page-btn" @click="goToPage(totalPages)">{{
          totalPages
        }}</span>
      </span>

      <span v-else>
        <span class="page-btn" @click="goToPage(1)">1</span>
        <span class="page-ellipsis">…</span>
        <span
          class="page-btn"
          v-for="i in [3, 2, 1, 0]"
          :key="i"
          @click="goToPage(totalPages - i)"
          :class="{ active: currentPage === totalPages - i }"
          >{{ totalPages - i }}</span
        >
      </span>
    </span>

    <span
      class="page-btn"
      @click="nextPage"
      :class="currentPage !== totalPages ? 'visible' : 'invisible'"
    >
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

<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <head>
      <meta
        name="description"
        content="List of all datasets available through the Open Data Hub metadata API"
      />
      <link rel="stylesheet" :href="fontUrl" />
    </head>
    <body
      class="container-fluid p-0 d-flex flex-direction-row align-items-stretch"
      data-bs-theme="light"
      :style="
        `font-family: ${fontFamily}; min-height: ${
          fullscreen ? '100vh' : '100%'
        };`
      "
    >
      <item-detail
        v-if="displayedItem"
        :item="displayedItem"
        :language="language"
        :show-back="!idList"
        :interval-millies="menuIntervalMillies"
        :scroll-bottom-delay-millies="scrollToBottomDelayMillies"
        :scroll-bottom-duration-millies="scrollToBottomDurationMillies"
        :fullscreen="fullscreen"
        @close="closeDetail"
      />
      <items-list
        v-else-if="!idList"
        @show-detail="showDetail"
        @next-page="nextPage"
        @last-page="lastPage"
        @go-to-page="goToPage"
        :language="language"
        :pageSize="pageSize"
        :current-page="currentPage"
        :with-image-only="withImageOnly"
        :enable-placeholder="enablePlaceholder"
      />
      <div
        v-else
        class="flex-grow-1 d-flex align-items-center justify-content-center"
      >
        <Spinner />
      </div>
    </body>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ItemsList from './components/ItemsList.vue';
import ItemDetail from './components/ItemDetail.vue';
import VueI18n from 'vue-i18n';
import Spinner from './components/Spinner.vue';

import messagesEn from '@/assets/locales/en.json';
import messagesDe from '@/assets/locales/de.json';
import messagesIt from '@/assets/locales/it.json';
import { SkiAreaLinked } from './api/models';
import { CommonApi } from './api';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'de',
  messages: {
    en: messagesEn,
    de: messagesDe,
    it: messagesIt,
  },
});

export default Vue.extend({
  i18n,
  components: {
    ItemsList,
    ItemDetail,
    Spinner,
  },
  props: {
    idList: {
      type: String,
      default:
        'SKI6C7D174390D44D0ABC1C9105F8C37C5E,SKIB0D17A56116D45EE9CC6EDDB9D4AD466,SKI8660FA0AAEF54865A7109BAB46AE6C23',
    },
    itemIntervalMillies: {
      type: Number,
      default: 25000,
    },
    menuIntervalMillies: {
      type: Number,
      default: 5000,
    },
    fullscreen: {
      type: Boolean,
      default: true,
    },
    scrollToBottomDelayMillies: {
      type: Number,
      default: 1000,
    },
    scrollToBottomDurationMillies: {
      type: Number,
      default: 3000,
    },
    language: {
      type: String,
      default: 'en',
    },
    pageSize: {
      type: Number,
      default: 8,
    },
    withImageOnly: {
      type: Boolean,
      default: false,
    },
    enablePlaceholder: {
      type: Boolean,
      default: true,
    },
    fontUrl: {
      type: String,
      default: 'https://fonts.testingmachine.eu/open-sans/style.css',
    },
    fontName: {
      type: String,
      default: 'Open Sans',
    },
  },
  data() {
    const data: {
      items: SkiAreaLinked[] | null;
      selectedItem: SkiAreaLinked | null;
      displayedItem: SkiAreaLinked | null;
      currentPage: number;
    } = {
      items: null,
      selectedItem: null,
      displayedItem: null,
      currentPage: 1,
    };

    return data;
  },
  computed: {
    fontFamily(): string[] {
      const fallbacks = ['Avenir', 'Helvetica', 'Arial', 'sans-serif'];
      return this.fontName ? [this.fontName, ...fallbacks] : fallbacks;
    },
  },
  watch: {
    language: {
      immediate: true,
      handler(value) {
        this.$i18n.locale = value;
      },
    },
    idList: function() {
      this.loadItems;
    },
    items: function() {
      this.setDisplayedItem();
    },
    selectedItem: function() {
      this.setDisplayedItem();
    },
    displayedItem: function() {
      this.scheduleNextDisplayedItem();
    },
  },
  created() {
    if (this.idList) {
      this.loadItems();
    }
  },
  methods: {
    showDetail(item: SkiAreaLinked) {
      this.selectedItem = item;
    },
    closeDetail() {
      this.selectedItem = null;
    },
    nextPage() {
      this.currentPage++;
    },
    lastPage() {
      this.currentPage--;
    },
    goToPage(pageNum: number) {
      this.currentPage = pageNum;
    },
    setDisplayedItem() {
      this.displayedItem = this.items?.[0] ?? this.selectedItem;
    },
    scheduleNextDisplayedItem() {
      if (!this.itemIntervalMillies) return;

      setTimeout(() => {
        if (!this.items || !this.displayedItem) return;
        const currentIndex = this.items.indexOf(this.displayedItem);
        const nextIndex = (currentIndex + 1) % this.items.length;
        // resets the detail component to prevent out of sync
        this.displayedItem = null;
        this.displayedItem = this.items[nextIndex];
      }, this.itemIntervalMillies);
    },
    loadItems() {
      new CommonApi()
        .v1SkiAreaGet(
          undefined,
          undefined,
          this.idList,
          undefined,
          true,
          undefined,
          undefined,
          undefined,
          this.language,
          this.language,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          false
        )
        .then((value) => {
          this.items = value.data.length > 0 ? value.data : null;
        });
    },
  },
});
</script>

<style lang="scss">
@import './assets/scss/styles.scss';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

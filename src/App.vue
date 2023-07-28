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
          fullscreen && mode === 'display' ? '100vh' : '100%'
        };`
      "
    >
      <item-detail
        v-if="(mode === 'display' && displayedItem) || selectedItem"
        :item="mode === 'display' ? displayedItem : selectedItem"
        :show-back="mode === 'browse'"
        :interval-millies="mode === 'display' ? menuIntervalMillies : 0"
        :scroll-bottom-delay-millies="
          mode === 'display' ? scrollToBottomDelayMillies : 0
        "
        :scroll-bottom-duration-millies="
          mode === 'display' ? scrollToBottomDurationMillies : 0
        "
        :fullscreen="fullscreen && mode === 'display'"
        :autoplay="autoplay"
        :language="language"
        :key="displayedItem?.Id"
        @close="unsetSelectedItem"
      />
      <items-list
        v-else-if="mode === 'browse'"
        @show-detail="setSelectedItem"
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
    mode: {
      type: String,
      default: 'display',
    },
    idList: {
      type: String,
      default:
        'SKIFFC3B47C3CEA4426AE850E333EFE79CE,SKIB0D17A56116D45EE9CC6EDDB9D4AD466,SKIB0D17A56116D45EE9CC6EDDB9D4AD466',
      // '',
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
      default: false,
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
      default: false,
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
      displayedItem: SkiAreaLinked | undefined;
      currentPage: number;
    } = {
      items: null,
      selectedItem: null,
      displayedItem: undefined,
      currentPage: 1,
    };

    return data;
  },
  computed: {
    fontFamily(): string[] {
      const fallbacks = ['Avenir', 'Helvetica', 'Arial', 'sans-serif'];
      return this.fontName ? [this.fontName, ...fallbacks] : fallbacks;
    },
    autoplay(): boolean {
      return (
        this.mode === 'display' &&
        (this.itemIntervalMillies != null ||
          this.menuIntervalMillies != null ||
          this.scrollToBottomDelayMillies != null ||
          this.scrollToBottomDurationMillies != null)
      );
    },
  },
  watch: {
    language: {
      immediate: true,
      handler(value) {
        this.$i18n.locale = value;
      },
    },
    idListChecked: function() {
      this.loadItems;
    },
    items: function() {
      this.displayFirstItem();
    },
    selectedItem: function() {
      this.displayFirstItem();
    },
    displayedItem: function() {
      this.scheduleDisplayNextItem();
    },
  },
  created() {
    if (this.mode === 'display') {
      this.loadItems();
    }
  },
  methods: {
    setSelectedItem(item: SkiAreaLinked) {
      this.selectedItem = item;
    },
    unsetSelectedItem() {
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
    displayFirstItem() {
      this.displayedItem = this.items?.[0];
    },
    scheduleDisplayNextItem() {
      if (!this.itemIntervalMillies) return;

      setTimeout(() => {
        if (!this.items || !this.displayedItem) return;
        const currentIndex = this.items.indexOf(this.displayedItem);
        const nextIndex = (currentIndex + 1) % this.items.length;
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

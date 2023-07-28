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
          autoplay && mode === 'display' ? '100vh' : '100%'
        };`
      "
    >
      <item-detail
        v-if="(mode === 'display' && displayedItem[0]) || selectedItem"
        :item="mode === 'display' ? displayedItem[0] : selectedItem"
        :show-back="mode === 'browse'"
        :autoplay="autoplay && mode === 'display'"
        :scroll-delay="scrollDelay"
        :scroll-factor="scrollFactor"
        :exclude-menus="mode === 'display' ? excludeMenus : ''"
        :language="language"
        :key="displayedItem[0]?.Id"
        @close="unsetSelectedItem"
        @next-item="
          setDisplayedItem(
            ((displayedItem[1] ?? -1) + 1) % (items?.length ?? 1)
          )
        "
        @previous-item="
          setDisplayedItem(
            ((items?.length ?? 1) + ((displayedItem[1] ?? 1) - 1)) %
              (items?.length ?? 1)
          )
        "
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
        'SKIB0D17A56116D45EE9CC6EDDB9D4AD466,SKI34ACBD6AE92F40EB9187C3785F942DE3,SKI6C7D174390D44D0ABC1C9105F8C37C5E',
    },
    autoplay: {
      type: Boolean,
      default: false,
    },
    scrollDelay: {
      type: Number,
      default: 2000,
    },
    scrollFactor: {
      type: Number,
      default: 15,
    },
    excludeMenus: {
      type: String,
      default: '',
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
      items: SkiAreaLinked[] | undefined;
      selectedItem: SkiAreaLinked | null;
      displayedItem: [SkiAreaLinked?, number?];
      currentPage: number;
    } = {
      items: undefined,
      selectedItem: null,
      displayedItem: [],
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
    idListChecked: function() {
      this.loadItems;
    },
    items: function() {
      this.setDisplayedItem(0);
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
    setDisplayedItem(index: number) {
      this.displayedItem = [this.items?.[index], index];
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
          const idList = this.idList.split(',');
          const res = value.data.length > 0 ? value.data : undefined;
          this.items = res?.sort(
            ({ Id: a }, { Id: b }) =>
              idList.indexOf(a ?? '') - idList.indexOf(b ?? '')
          );
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

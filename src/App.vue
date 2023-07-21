<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <head>
      <meta name="description" content="List of all datasets available through the Open Data Hub metadata API">
      <link rel="stylesheet" :href="fontUrl">
    </head>
    <body
      data-bs-theme="light"
      :style="`font-family: ${fontFamily}`"
    >
      <div class="container py-4 d-flex flex-direction-row align-items-stretch" style="min-height: 100vh">
        <item-detail
          v-if="item"
          :item="item"
          :language="language"
          @close="closeDetail"
        />
        <items-list
          v-else
          @show-detail="showDetail"
          :language="language"
          :pageSize="pageSize"
          :loc-filter="locFilter"
          :source-filter="sourceFilter"
          :with-image-only="withImageOnly"
          :enable-placeholder="enablePlaceholder"
          :tag-id-list="tagIdList"
        />
      </div>
    </body>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ItemsList from './components/ItemsList.vue';
import ItemDetail from './components/ItemDetail.vue';
import VueI18n from 'vue-i18n';

import messagesEn from '@/assets/locales/en.json';
import messagesDe from '@/assets/locales/de.json';
import messagesIt from '@/assets/locales/it.json';
import { SkiAreaLinked } from './api/models';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'de',
  messages: {
    en: messagesEn,
    de: messagesDe,
    it: messagesIt,
  },
});

export default {
  i18n,
  components: {
    ItemsList,
    ItemDetail,
  },
  props: {
    contentIdList: {
      type: String,
      default: null,
    },
    locFilter: {
      type: String,
      default: null,
    },
    sourceFilter: {
      type: String,
      default: null,
    },
    language: {
      type: String,
      default: 'en',
    },
    pageSize: {
      type: Number,
      default: 8,
    },
    tagIdList: {
      type: String,
      default: null,
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
      default: "https://fonts.testingmachine.eu/open-sans/style.css",
    },
    fontName: {
      type: String,
      default: "Open Sans",
    },
  },
  data() {
    const data: {
      item: SkiAreaLinked | null,
    } = {
      item: null,
    };

    return data;
  },
  computed: {
    contentIds(): string[] {
      return this.contentIdList !== null
        ? this.contentIdList.split(',').map((e: string) => e.trim())
        : [];
    },
    tagIds(): string[] {
      return this.tagIdList !== null
        ? this.tagIdList.split(',').map((e: string) => e.trim())
        : [];
    },
    fontFamily(): string[] {
      const fallbacks = ["Avenir", "Helvetica", "Arial", "sans-serif"];
      return this.fontName
        ? [this.fontName, ...fallbacks]
        : fallbacks
    }
  },
  watch: {
    language: {
      immediate: true,
      handler(value) {
        this.$i18n.locale = value;
      },
    },
  },
  methods: {
    showDetail(item: SkiAreaLinked) {
      this.item = item;
    },
    closeDetail() {
      this.item = null;
    }
  },
};
</script>

<style lang="scss">
@import "./assets/scss/styles.scss";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

<template>
  <div id="app">
    <item-detail
      v-if="detailContentId"
      :content-id="detailContentId"
      :is-list-available="islistAvailable"      
      :language="language"
      @close="closeDetail"
    />
    <items-list
      v-else
      @show-detail="showDetail"
      @change-current-page="changeCurrentPage"
      :language="language"      
      :contentIdList="contentIdList"
      :pageSize="pageSize"
      :loc-filter="locFilter"
      :source-filter="sourceFilter"
      :currentPage="currentPage"
      :with-image-only="withImageOnly"
      :enable-placeholder="enablePlaceholder"
      :tag-id-list="tagIdList"
    />
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
      default: 30,
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
  },
  data() {
    return {
      detailContentId: null,
      currentPage: 1,
    };
  },
  computed: {
    contentIds() {
      return this.contentIdList !== null
        ? this.contentIdList.split(',').filter((e) => e)
        : [];
    },
    islistAvailable() {
      return this.contentIds.length != 1;
    },
    tagIds() {
      return this.tagIdList !== null
        ? this.tagIdList.split(',').filter((e) => e)
        : [];
    },
    istaglistAvailable() {
      return this.tagIds.length != 1;
    },
  },
  watch: {
    language: {
      immediate: true,
      handler(value) {
        this.$i18n.locale = value;
      },
    },
  },
  created() {
    if (!this.islistAvailable) {
      this.detailContentId = this.contentIds[0];
    }
  },
  methods: {
    showDetail(detailContentId) {
      this.detailContentId = detailContentId;
    },
    closeDetail() {
      this.detailContentId = null;
    },
    changeCurrentPage(pageNum) {
      this.currentPage = pageNum;
    },
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

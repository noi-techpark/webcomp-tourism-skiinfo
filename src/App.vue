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
        :skiregion-list="skiregionList"
        :id-list="idList"
        :sorting="sorting"
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

import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

type D = Icon.Default & {
  _getIconUrl?: string;
};

delete (Icon.Default.prototype as D)._getIconUrl;

//Hack to load icons
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

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
      default: 'browse',
    },
    idList: {
      type: String,
      default: '',
      //'SKI1D3A1908193F46E0B2D2C3A4F420FDAE,SKID0F083267FA0476E818FFD6E0F065968,SKIEC3B49365C47477B83D124D9AE6C3259,SKIED972FD646964BB7B5C48D845FC6A790,SKI24524D1085B94B798E86556CEA0F9D27,SKIDB8A00512E8B4714BDD1B7F065C2F38F,SKI8D0B57D3EB7649A4A4E389F2807FCC2D,SKIBCEE846200D84151998854D37FFC06AF,SKI28F1AE811BE8418DBCCACBAA604272C8,SKI28AC06BDE728421B90958330F11ABBE0,SKI451F7C4C21CF443F83BC9CD007870FD9,SKI606B8A0664354FC1A4A9836DAF7415C3,SKI376CDCBA8AFD4E159D5313DD26C56D26,SKI6C7D174390D44D0ABC1C9105F8C37C5E,SKI34ACBD6AE92F40EB9187C3785F942DE3,SKIC57DA31F859141A1802E86B410FEBD70,SKI04EBE61F5AA0473F871AF0297887D6C2,SKI2C99CEA3DF2F458FB75E45CA39222E9D,SKI8660FA0AAEF54865A7109BAB46AE6C23,SKI04A713E6479A4BE4BD158019A6DA546C,SKIB0D17X57116D4A5E9CR6EJDB9D4AD466,SKIFFC3B47C3CEA4426AE850E333EFE79CE,SKIB0D17A56116D45EE9CC6EDDB9D4AD466,SKI4972D41A8DC042F88190C154D9CC8A8E,SKI0E9790D2D4BD4F84B1E0055BC96277E4,SKI4096611E0BDA4794BB8983B897A68F7C',
    },
    skiregionList: {
      type: String,
      default: '',
      //default: 'ortler skiarena,dolomiti superski,skiregion tauferer ahrntal',
      //ortler skiarena, dolomiti superski, skiregion tauferer ahrntal, skiverbund eisacktal-wipptal
    },
    sorting: {
      type: String,
      default: 'random',
      //random,alphabetically,skiregion
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
      default: 10,
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
    mappedskiareaIds(): string {
      const nameToIdMap: { [key: string]: string } = {
        '3 Zinnen Dolomiten ski area': 'SKI04A713E6479A4BE4BD158019A6DA546C',
        'Kronplatz ski area': 'SKI8660FA0AAEF54865A7109BAB46AE6C23',
        'Gitschberg - Jochtal ski area': 'SKIB0D17A56116D45EE9CC6EDDB9D4AD466',
        'Ratschings ski area': 'SKI4972D41A8DC042F88190C154D9CC8A8E',
        'Schwemmalm ski area': 'SKI451F7C4C21CF443F83BC9CD007870FD9',
        'Speikboden ski area': 'SKI4096611E0BDA4794BB8983B897A68F7C',
        'Vigiljoch ski area': 'SKI28AC06BDE728421B90958330F11ABBE0',
        'Watles ski area': 'SKI606B8A0664354FC1A4A9836DAF7415C3',
        'Alta Badia ski area': 'SKI04EBE61F5AA0473F871AF0297887D6C2',
        'Trafoi ski area': 'SKI8D0B57D3EB7649A4A4E389F2807FCC2D',
        'Meran 2000 ski area': 'SKIDB8A00512E8B4714BDD1B7F065C2F38F',
        'Carezza Dolomites ski area': 'SKI34ACBD6AE92F40EB9187C3785F942DE3',
        'Alpe di Siusi - Val Gardena ski area':
          'SKIFFC3B47C3CEA4426AE850E333EFE79CE',
        'Pfelders ski area': 'SKIED972FD646964BB7B5C48D845FC6A790',
        'Ski area Alpin Arena Schnals/Senales':
          'SKI24524D1085B94B798E86556CEA0F9D27',
        'Reinswald ski area': 'SKIBCEE846200D84151998854D37FFC06AF',
        'Obereggen ski area': 'SKIC57DA31F859141A1802E86B410FEBD70',
        'Val Gardena - Alpe di Siusi ski area':
          'SKI2C99CEA3DF2F458FB75E45CA39222E9D',
        'Rosskopf ski area': 'SKID0F083267FA0476E818FFD6E0F065968',
        'Plose ski area': 'SKI6C7D174390D44D0ABC1C9105F8C37C5E',
        'Sulden ski area': 'SKI28F1AE811BE8418DBCCACBAA604272C8',
        'Rittner Horn ski area': 'SKI376CDCBA8AFD4E159D5313DD26C56D26',
        'Schoeneben/Haideralm ski area': 'SKI1D3A1908193F46E0B2D2C3A4F420FDAE',
        'Klausberg ski area': 'SKI0E9790D2D4BD4F84B1E0055BC96277E4',
        'Jochgrimm ski area': 'SKIB0D17X57116D4A5E9CR6EJDB9D4AD466',
        'Ladurns ski area': 'SKIEC3B49365C47477B83D124D9AE6C3259',
      };

      const names = this.idList.split(',');
      const ids = names.map((name) => {
        name = name.trim();
        return nameToIdMap[name] || name;
      });

      return ids.join(',');
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
      //console.log(this.mappedskiareaIds);
      new CommonApi()
        .v1SkiAreaGet(
          undefined,
          undefined,
          this.mappedskiareaIds,
          this.skiregionList,
          true,
          undefined,
          undefined,
          undefined,
          this.language,
          this.language,
          undefined,
          this.sorting == 'random' ? new Date().getDay().toString() : undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          this.sorting == 'alphabetically'
            ? 'Detail.' + this.language + '.Title'
            : this.sorting == 'skiregion'
            ? 'SkiRegionName.' + this.language
            : undefined,
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
@import '//unpkg.com/leaflet@1.9.4/dist/leaflet.css';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

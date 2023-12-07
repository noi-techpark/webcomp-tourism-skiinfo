<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="w-100 py-2 d-flex flex-column align-items-stretch gap-4">
    <div class="px-2 d-flex align-items-center gap-3">
      <input
        type="text"
        class="form-control card border-0 rounded-pill shadow-sm"
        :placeholder="$t('searchSkiArea').toString()"
        v-model="searchInput"
        @keyup="searchSkiAreaList"
      />
      <search-icon
        class="pointer"
        @click="loadSkiAreaList(currentPage)"
      ></search-icon>
    </div>

    <div v-if="items.length > 0" class="flex-grow-1">
      <div class="row gy-4 mw-100 mx-0">
        <div
          v-for="(item, index) of items"
          :key="index"
          @click.prevent="showDetail(item)"
          class="col-12 col-lg-6"
        >
          <div class="pointer h-100">
            <div class="d-flex flex-row align-items-stretch gap-3">
              <div
                style="height: 100px; width: 100px"
                class="ratio ratio-1x1 flex-shrink-0"
              >
                <POIPlaceholder
                  v-if="enablePlaceholder && !getImage(item)"
                  class="rounded-1 object-fit-cover"
                ></POIPlaceholder>
                <img
                  v-else
                  class="rounded-1 object-fit-cover"
                  :src="getImage(item)"
                />
              </div>

              <div
                class="flex-shrink-1 text-truncate d-flex flex-column justify-content-around"
              >
                <span class="fs-5 fw-bold">{{ getTitle(item, language) }}</span>
                <div>
                  <div
                    class="text-truncate"
                    v-for="(info, i) of getShortInfo(item)"
                    :key="i"
                    :title="info"
                  >
                    {{ info }}
                  </div>
                </div>
              </div>

              <div
                class="flex-grow-1 flex-shrink-0 d-flex align-items-center justify-content-end"
              >
                <arrow-icon-right
                  height="30"
                  width="30"
                  class="text-black"
                  viewBox="0 0 24 24"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-else-if="isLoading"
      class="flex-grow-1 d-flex align-items-center justify-content-center"
    >
      <spinner></spinner>
    </div>
    <div
      class="flex-grow-1 d-flex align-items-center justify-content-center"
      v-else
    >
      {{ $t('noResults') }}
    </div>
    <paging
      :current-page="currentPage"
      :total-pages="totalPages"
      @next-page="nextPage"
      @last-page="lastPage"
      @go-to-page="goToPage"
    ></paging>
    <div id="footer">
        <a href="https://opendatahub.com" target="_blank"
          ><span id="footer-text">powered by Open Data Hub</span>
          <img
            :src="require('@/assets/icons/NOI_OPENDATAHUB_NEW_WH-01.png')"
            height="35px"
        /></a>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { CommonApi } from '@/api';
import { APIResponse } from '@/types';
import Paging from '@/components/Paging.vue';
import ArrowIconRight from '@/assets/img/arrow_right.svg';
import POIPlaceholder from '@/assets/img/POI-Placeholder.svg';
import Spinner from '@/components/Spinner.vue';
import SearchIcon from '@/assets/img/ic_search.svg';
import { SkiAreaLinked } from '@/api/models/ski-area-linked';

export default Vue.extend({
  components: {
    Spinner,
    Paging,
    ArrowIconRight,
    POIPlaceholder,
    SearchIcon,
  },
  props: {
    language: {
      type: String,
      default: 'en',
    },
    pageSize: {
      type: Number,
      default: 20,
    },
    currentPage: {
      type: Number,
    },
    locFilter: {
      type: String,
      default: null,
    },
    sourceFilter: {
      type: String,
      default: null,
    },
    withImageOnly: {
      type: Boolean,
      default: false,
    },
    enablePlaceholder: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const data: {
      items: SkiAreaLinked[];
      totalPages: number;
      isLoading: boolean;
      searchInput: string;
    } = {
      items: [],
      totalPages: 0,
      isLoading: false,
      searchInput: '',
    };

    return data;
  },
  created() {
    this.loadSkiAreaList(this.currentPage);
  },
  watch: {
    currentPage: function(val) {
      this.loadSkiAreaList(val);
    },
  },
  methods: {
    nextPage() {
      this.$emit('next-page');
    },
    lastPage() {
      this.$emit('last-page');
    },
    goToPage(pageNum: number) {
      this.$emit('go-to-page', pageNum);
    },
    showDetail(item: SkiAreaLinked) {
      this.$emit('show-detail', item);
    },
    searchSkiAreaList() {
      this.loadSkiAreaList(1);
    },
    loadSkiAreaList(pageNum: number) {
      this.isLoading = true;
      new CommonApi()
        .v1SkiAreaGet(
          pageNum,
          this.pageSize,
          undefined,
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
          this.searchInput,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          false
        )
        .then((value) => {
          const apiResponse = (value.data as unknown) as APIResponse<
            SkiAreaLinked
          >;
          this.items = apiResponse?.Items ?? [];
          this.totalPages = apiResponse?.TotalPages;
          this.isLoading = false;
        });
    },
    getShortInfo(item: SkiAreaLinked): string[] {
      const shortInfo = [];

      shortInfo.push(this.getLocationInfo(item));

      if (item?.SkiRegionName?.[this.language]) {
        const skiregion =
          this.$t('skiregion') + ': ' + item.SkiRegionName[this.language];
        shortInfo.push(skiregion);
      }

      return shortInfo.filter((info) => info != null);
    },
    getLocationInfo(item: SkiAreaLinked) {
      let region = '';
      let tv = '';

      if (item?.LocationInfo?.RegionInfo?.Name?.[this.language]) {
        region = item?.LocationInfo?.RegionInfo?.Name[this.language];
      }
      if (item?.LocationInfo?.TvInfo?.Name?.[this.language]) {
        tv = ' - ' + item?.LocationInfo?.TvInfo?.Name[this.language];
      }

      const location = this.$t('location') + ': ' + region + tv;

      return location;
    },
    getTitle(item: SkiAreaLinked, language: string) {
      return item?.Detail?.[language]?.Title ?? '';
    },
    getImage(item: SkiAreaLinked) {
      return item.ImageGallery?.[0].ImageUrl
        ? item.ImageGallery?.[0].ImageUrl + '&height=200'
        : undefined;
    },
  },
});
</script>

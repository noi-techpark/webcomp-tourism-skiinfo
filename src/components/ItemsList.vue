<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="w-100 d-flex flex-column align-items-stretch gap-4">
    <div class="d-flex align-items-center gap-3">
      <input
        type="text"
        class="form-control card border-0 rounded-pill shadow-sm"
        :placeholder="$t('searchSkiArea')"
        v-model="searchInput"
        @keyup="searchSkiAreaList"
      />
      <search-icon
        class="pointer"
        @click="loadSkiAreaList(currentPage)"
      ></search-icon>
    </div>

    <div v-if="items.length > 0" class="flex-grow-1">
      <div class="row g-3">
        <div
          v-for="item of items"
          :key="item.Id"
          @click.prevent="showDetail(item)"
          class="col-12 col-lg-6"
        >
          <div class="card border-0 rounded-4 overflow-hidden shadow pointer h-100">
            <div class="d-flex flex-row align-items-center gap-3">
              <div style="height: 110px; width: 110px" class="ratio ratio-1x1 flex-shrink-0">
                <POIPlaceholder
                  v-if="enablePlaceholder && (!item.ImageGallery || item.ImageGallery.length === 0)"
                  class="object-fit-cover"
                ></POIPlaceholder>
                <img v-else class="object-fit-cover" :src="item.ImageGallery[0].ImageUrl + '&height=200'" />
              </div>

              <div class="flex-shrink-1 text-truncate" >
                <span class="fs-5 fw-bold">{{ getTitle(item, language) }}</span>
                <div
                  class="text-truncate"
                  v-for="info, i of getSkiAreaShortInfo(item)"
                  :key="i"
                  :title="info"
                >{{ info }}</div>
              </div>

              <div class="flex-grow-1 flex-shrink-0 px-2 text-end">
                <arrow-icon-right height="30" width="30" class="text-black" viewBox="0 0 24 24"/>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div v-else-if="isLoading" class="flex-grow-1 d-flex align-items-center justify-content-center">
      <spinner></spinner>
    </div>
    <div class="flex-grow-1 d-flex align-items-center justify-content-center" v-else>{{ $t('noResults') }}</div>
    <paging
      :current-page="currentPage"
      :total-pages="totalPages"
      @next-page="nextPage"
      @last-page="lastPage"
      @go-to-page="goToPage"
    ></paging>
  </div>
</template>

<script lang="ts">
import { CommonApi } from '@/api';
import { APIResponse } from '@/types';
import Paging from '@/components/Paging.vue';
import ArrowIconRight from '@/assets/img/arrow_right.svg';
import POIPlaceholder from '@/assets/img/POI-Placeholder.svg';
import Spinner from '@/components/Spinner.vue';
import SearchIcon from '@/assets/img/ic_search.svg';
import { SkiAreaLinked } from '@/api/models/ski-area-linked';

export default {
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
      default: true,
    },
  },
  data() {
    const data: {
      items: SkiAreaLinked[],
      totalPages: number,
      isLoading: boolean,
      searchInput: string,
      currentPage: number
    } = {
      items: [],
      totalPages: 0,
      isLoading: false,
      searchInput: '',
      currentPage: 1
    };

    return data;
  },
  created() {
    this.loadSkiAreaList(this.currentPage);
  },
  watch: {
    currentPage: function (val) { this.loadSkiAreaList(val) }
  },
  methods: {
    nextPage() {
      this.currentPage + 1;
    },
    lastPage() {
      this.currentPage - 1;
    },
    goToPage(pageNum: number) {
      this.currentPage = pageNum;
    },
    showDetail(item: SkiAreaLinked) {
      this.$emit('show-detail', item);
    },
    searchSkiAreaList() {
      this.loadSkiAreaList(1);
    },
    loadSkiAreaList(pageNum: number) {
      this.isLoading = true;
      const commonApi = new CommonApi();
      commonApi
        .v1SkiAreaGet(
          pageNum,
          this.pageSize,
          this.contentIdList == null ? undefined : this.contentIdList,
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
          undefined, undefined, undefined,
          undefined,
          undefined,
          false
        )
        .then((value) => {
          const apiResponse = value.data as unknown as APIResponse<SkiAreaLinked>;
          this.items = apiResponse?.Items ?? [];
          this.$emit('change-current-page', apiResponse?.CurrentPage);
          this.totalPages = apiResponse?.TotalPages;
          this.isLoading = false;
        });
    },
    getSkiAreaShortInfo(item: SkiAreaLinked): string[] {
      const shortInfo = [];

      shortInfo.push(this.getSkiAreaLocationInfo(item));

      if (item?.SkiRegionName[this.language]) {
        const skiregion =
          this.$t('skiregion') + ': ' + item.SkiRegionName[this.language];
        shortInfo.push(skiregion);
      }

      return shortInfo.filter((info) => info != null);
    },
    getSkiAreaLocationInfo(item: SkiAreaLinked) {
      let region = "";
      let tv = "";

      if (item?.LocationInfo?.RegionInfo?.Name[this.language]) {
        region = item?.LocationInfo?.RegionInfo?.Name[this.language];
      }
      if (item?.LocationInfo?.TvInfo?.Name[this.language] ) {
        tv = ' - ' + item?.LocationInfo?.TvInfo?.Name[this.language];
      }

      const location =
          this.$t('location') + ': ' + region + tv;

      return location;
    },
    getTitle(item: SkiAreaLinked, language: string) {
      return item?.Detail?.[language]?.Title ?? '';
    },
  },
};
</script>

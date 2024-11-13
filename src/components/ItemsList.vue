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
            <div class="d-flex flex-row align-items-stretch gap-4">
              <div
                style="height: 130px; width: 130px"
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
                <div
                  style="height: 24px; width: 24px"
                  class="ratio ratio-1x1 flex-shrink-0"
                >
                  <img
                    v-if="getSkiRegionImage(item) == 'dss'"
                    class="rounded-1 object-fit-cover"
                    :src="require('@/assets/icons/dss.png')"
                  />
                  <img
                    v-if="getSkiRegionImage(item) == 'osa'"
                    class="rounded-1 object-fit-cover"
                    :src="require('@/assets/icons/osa.png')"
                  />
                  <img
                    v-if="getSkiRegionImage(item) == 'ahrntal'"
                    class="rounded-1 object-fit-cover"
                    :src="require('@/assets/icons/ahrntal.png')"
                  />
                  <img
                    v-if="getSkiRegionImage(item) == ''"
                    class="rounded-1 object-fit-cover"
                    :src="require('@/assets/icons/empty.png')"
                  />
                  <!-- <div class="ms-4 small">{{ getskiRegionName(item) }}</div> -->
                </div>
                <span class="fs-5 fw-bold">{{ getTitle(item, language) }}</span>
                <span class="small">{{ getSubTitle(item, language) }}</span>
                <!-- <div
                  style="height: 24px; width: 24px"
                  class="ratio ratio-1x1 flex-shrink-0"
                >
                  <img v-if="getSkiRegionImage(item) == 'dss'"
                    class="rounded-1 object-fit-cover"
                    :src="require('@/assets/icons/dss.png')"
                  />
                  <img v-if="getSkiRegionImage(item) == 'osa'"
                    class="rounded-1 object-fit-cover"
                    :src="require('@/assets/icons/osa.png')"
                  />
                  <img v-if="getSkiRegionImage(item) == 'ahrntal'"
                    class="rounded-1 object-fit-cover"
                    :src="require('@/assets/icons/ahrntal.png')"
                  />
                  <img v-if="getSkiRegionImage(item) == ''"
                    class="rounded-1 object-fit-cover"
                    :src="require('@/assets/icons/empty.png')"
                  />
                  <small class="flex-al">{{ getskiRegionName(item) }}</small>
                </div> -->
                <div>
                  <div
                    class="text-truncate small"
                    v-for="(info, i) of getShortInfo(item)"
                    :key="i"
                    :title="info"
                  >
                    {{ info }}
                  </div>
                  <span v-if="isOpen(item)" class="text-open-green fw-bold"
                    >{{ $t(`scheduleTypes.1`) }}
                  </span>
                  <span v-else class="text-closed-red fw-bold"
                    >{{ $t(`scheduleTypes.2`) }}
                  </span>
                  <span class="small">{{ getOpeningTime(item) }}</span>
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
import moment from 'moment';

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
    skiregionList: {
      type: String,
      default: null,
    },
    idList: {
      type: String,
      default: '',
      //'SKI1D3A1908193F46E0B2D2C3A4F420FDAE,SKID0F083267FA0476E818FFD6E0F065968,SKIEC3B49365C47477B83D124D9AE6C3259,SKIED972FD646964BB7B5C48D845FC6A790,SKI24524D1085B94B798E86556CEA0F9D27,SKIDB8A00512E8B4714BDD1B7F065C2F38F,SKI8D0B57D3EB7649A4A4E389F2807FCC2D,SKIBCEE846200D84151998854D37FFC06AF,SKI28F1AE811BE8418DBCCACBAA604272C8,SKI28AC06BDE728421B90958330F11ABBE0,SKI451F7C4C21CF443F83BC9CD007870FD9,SKI606B8A0664354FC1A4A9836DAF7415C3,SKI376CDCBA8AFD4E159D5313DD26C56D26,SKI6C7D174390D44D0ABC1C9105F8C37C5E,SKI34ACBD6AE92F40EB9187C3785F942DE3,SKIC57DA31F859141A1802E86B410FEBD70,SKI04EBE61F5AA0473F871AF0297887D6C2,SKI2C99CEA3DF2F458FB75E45CA39222E9D,SKI8660FA0AAEF54865A7109BAB46AE6C23,SKI04A713E6479A4BE4BD158019A6DA546C,SKIB0D17X57116D4A5E9CR6EJDB9D4AD466,SKIFFC3B47C3CEA4426AE850E333EFE79CE,SKIB0D17A56116D45EE9CC6EDDB9D4AD466,SKI4972D41A8DC042F88190C154D9CC8A8E,SKI0E9790D2D4BD4F84B1E0055BC96277E4,SKI4096611E0BDA4794BB8983B897A68F7C',
    },
    sorting: {
      type: String,
      default: null,
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
  computed: {
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
        'Schöneben - Haideralm ski area': 'SKI1D3A1908193F46E0B2D2C3A4F420FDAE',
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
      console.log('hallo' + this.skiregionList);

      this.isLoading = true;
      new CommonApi()
        .v1SkiAreaGet(
          pageNum,
          this.pageSize,
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
          this.searchInput,
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

      // if (item?.SkiRegionName?.[this.language]) {
      //   const skiregion =
      //     this.$t('skiregion') + ': ' + item.SkiRegionName[this.language];
      //   shortInfo.push(skiregion);
      // }

      return shortInfo.filter((info) => info != null);
    },
    isOpen(item: SkiAreaLinked): boolean {
      const schedules = item.OperationSchedule?.filter((s) => {
        return s.Type === '1' || s.Type === '2' || s.Type === '3';
      });

      const schedule = schedules?.[0];
      if (!schedule?.Start || !schedule?.Stop) return false;

      const start = new Date(schedule.Start);
      const end = new Date(schedule.Stop);

      if (start < new Date() && end > new Date()) return true;

      return false;
    },
    getOpeningTime(item: SkiAreaLinked): string {
      const schedules = item.OperationSchedule?.filter((s) => {
        return s.Type === '1' || s.Type === '2' || s.Type === '3';
      });

      const schedule = schedules?.[0];
      if (!schedule?.Start || !schedule?.Stop) return '';
      else {
        const start = new Date(schedule.Start);
        const end = new Date(schedule.Stop);

        if (start < new Date() && end > new Date()) {
          const formatL = moment.localeData(this.language).longDateFormat('L');
          return (
            '(' +
            this.$t('openedto') +
            moment(schedule?.Stop).format(formatL) +
            ')'
          );
        } else {
          const formatL = moment.localeData(this.language).longDateFormat('L');
          return (
            '(' +
            this.$t('openingon') +
            moment(schedule?.Start).format(formatL) +
            ')'
          );
        }
      }
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

      //const location = this.$t('location') + ': ' + region + tv;

      return region + tv;
    },
    getTitle(item: SkiAreaLinked, language: string) {
      return item?.Detail?.[language]?.Title ?? '';
    },
    getSubTitle(item: SkiAreaLinked, language: string) {
      return item?.Detail?.[language]?.SubHeader ?? '';
    },
    getImage(item: SkiAreaLinked) {
      return item.ImageGallery?.[0].ImageUrl
        ? item.ImageGallery?.[0].ImageUrl + '&height=200'
        : undefined;
    },
    getSkiRegionImage(item: SkiAreaLinked) {
      return item.SkiRegionId == '8260DC5B815D40B98A1B53E84EC2B419'
        ? 'dss'
        : item.SkiRegionId == '121569EF80404748803057DE3C9A92C0'
        ? 'osa'
        : item.SkiRegionId == 'EA4E0412203E472897362FCAA2CC5F74'
        ? 'ahrntal'
        : '';
    },
    getskiRegionName(item: SkiAreaLinked) {
      if (item?.SkiRegionName?.[this.language]) {
        return item.SkiRegionName[this.language];
      } else return '';
    },
  },
});
</script>

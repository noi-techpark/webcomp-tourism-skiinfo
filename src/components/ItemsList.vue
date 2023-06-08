<template>
  <div class="list">
    <h2 class="page-title">SkiAreas</h2>
    <!-- <h3>parameter: {{ contentType }} - {{ language }} - {{ category }} - {{ sourceFilter }} - {{ locFilter }} - {{ withImageOnly }}</h3> -->
    <div class="search-bar">
      <input
        type="text"
        class="search-input"
        :placeholder="$t('searchSkiArea')"
        v-model="searchInput"
        @keyup="searchSkiAreaList"
      />
      <div class="search-button">
        <search-icon
          @click="loadSkiAreaList(currentPage)"
          width="24px"
          height="24pxs"
        ></search-icon>
      </div>
    </div>
    <paging
      :current-page="currentPage"
      :total-pages="totalPages"
      @next-page="nextPage"
      @last-page="lastPage"
      @go-to-page="goToPage"
    ></paging>
    <template v-if="items.length > 0">
      <div
        v-for="item of items"
        :key="item.id"
        @click.prevent="showDetail(item.Id)"
        class="item-container"
      >
        <hr class="solid" />
        <div class="list-item">
          <div v-if="enablePlaceholder">
            <div
            v-if="item.ImageGallery === null || item.ImageGallery.length === 0"
          >
            <div class="thumbnail">           
              <POIPlaceholder
                class="poiSvg"
                viewBox="0 0 595.3 367.54"
                width="60px"
                height="60px"
                preserveAspectRatio="xMidYMid slice"                
              ></POIPlaceholder>
            </div>
          </div>
          <div v-else>
            <img class="thumbnail" :src="item.ImageGallery[0].ImageUrl" />
          </div>
          </div>
         
          <div class="info">
            <div class="title">{{ getTitle(item, language) }}</div>
               {{ getSkiAreaShortInfo(item) }}
          </div>
          <div class="arrow-icon">
            <arrow-icon-right viewBox="0 0 24 24" width="100%" height="100%" />
          </div>
        </div>
      </div>
    </template>
    <div v-else-if="isLoading" class="loading-spinner">
      <spinner></spinner>
    </div>
    <div class="noResult" v-else>{{ $t('noResults') }}</div>
    <div v-if="items.length === 1" class="item-container"></div>
    <div class="bottom-divider" v-if="items.length > 0">
      <hr class="solid" />
    </div>
    <div class="bottom-divider bottom-divider2" v-if="items.length > 1">
      <hr class="solid" />
    </div>
    <paging
      :current-page="currentPage"
      :total-pages="totalPages"
      @next-page="nextPage"
      @last-page="lastPage"
      @go-to-page="goToPage"
    ></paging>
  </div>
</template>

<script>
import { CommonApi } from '@/api';
import Paging from '@/components/Paging';
import ArrowIconRight from '@/assets/img/arrow_right.svg';
import POIPlaceholder from '@/assets/img/POI-Placeholder.svg';
import Spinner from '@/components/Spinner';
import SearchIcon from '@/assets/img/ic_search.svg';

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
    contentIdList: {
      type: String,
      default: null,
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
    currentPage: {
      type: Number,
      default: 1,
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
      items: [],
      totalPages: 0,
      isLoading: false,
      searchInput: '',
    };
  },
  created() {        
    this.loadSkiAreaList(this.currentPage);    
  },
  // computed: {
  //   placeholderImage() {
  //     if (this.contentType === 'Gastronomy') {
  //       return 'gastro';
  //     } else if (this.contentType === 'Activity') {
  //       return 'activity';
  //     } else {
  //       return 'poi';
  //     }
  //   },
  // },
  methods: {
    nextPage() {
      this.items = [];
      this.loadSkiAreaList(this.currentPage + 1);      
      this.$emit('change-current-page', this.currentPage + 1);
    },
    lastPage() {
      this.items = [];
      this.loadSkiAreaList(this.currentPage - 1);     
      this.$emit('change-current-page', this.currentPage - 1);
    },
    goToPage(pageNum) {
      this.items = [];
      this.loadSkiAreaList(pageNum);     
      this.$emit('change-current-page', pageNum);
    },
    showDetail(contentId) {
      this.$emit('show-detail', contentId);
    },
    searchSkiAreaList() {
      clearTimeout(this.timer);
      this.timer = setTimeout(this.loadSkiAreaList, 300, 1);
    },
    loadSkiAreaList(pageNum) {
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
          false, 
          []       
        )
        .then((value) => {
          this.items = value?.data?.Items ?? [];
          this.$emit('change-current-page', value?.data?.CurrentPage);
          this.totalPages = value?.data?.TotalPages;
          this.isLoading = false;
        });
    },    
    getSkiAreaShortInfo(item) {
      const shortInfo = [];
      // shortInfo.push(...this.getSkiAreaDetails(item));
      
      // if (item?.LocationInfo?.MunicipalityInfo?.Name[this.language]) {
      //    const municipality =
      //      this.$t('location') + ': ' + item.LocationInfo.MunicipalityInfo.Name[this.language];
      //    shortInfo.push(municipality);
      // };

      shortInfo.push(this.getSkiAreaLocationInfo(item)); 
      if (item?.SkiRegionName[this.language]) {
        const skiregion =
          this.$t('skiregion') + ': ' + item.SkiRegionName[this.language];
        shortInfo.push(skiregion);
      }
      
      return shortInfo.filter((info) => info != null).join(', ');
    },
    getSkiAreaDetails(item) {      
      const categories = [];      
      
      if (item?.AdditionalPoiInfos[this.language]?.Categories){
        item?.AdditionalPoiInfos[this.language]?.Categories.forEach(
          categoryname => categories.push(categoryname)
          );        
      }
      return categories;
    },
    getSkiAreaLocationInfo(item) {      
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
    getTitle(item, language) {
      return item?.Detail?.[language]?.Title ?? '';
    },    
  },
};
</script>
<style scoped lang="scss">
.list-item {
  display: flex;
  flex-direction: row;
  padding: 8px 40px 8px 40px;
  align-items: center;
}

.thumbnail {
  min-height: 60px;
  min-width: 60px;
  max-width: 60px;
  max-height: 60px;
  background-color: #e8ecf1;
  object-fit: cover;
}

.poiSvg g {
  .a,
  .d {
    fill: none;
  }
  .b {
    fill: #e8ecf1;
  }
  .c {
    clip-path: url(#a);
  }
  .d {
    stroke: #fff;
    stroke-miterlimit: 10;
    stroke-width: 9px;
  }
  .e {
    fill: #fff;
  }
}

.gastroSvg g {
  .a,
  .e {
    fill: none;
  }
  .b {
    fill: #e8ecf1;
  }
  .c {
    clip-path: url(#a);
  }
  .d {
    fill: #fff;
  }
  .e {
    stroke: #fff;
    stroke-miterlimit: 10;
    stroke-width: 9px;
  }
}

.activitySvg g {
  .a {
    fill: #e8ecf1;
  }
  .b {
    fill: #fff;
  }
}

.info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-left: 24px;
}

hr.solid {
  border-top: 1px solid #e8ecf1;
  margin: 8px 40px 8px 40px;
}

.title {
  font-size: 18px;
  font-weight: bold;
}

.short-info {
  font-size: 14px;
  word-break: break-word;
  color: #888888;
}

.page-title {
  font-weight: bold;
  font-size: 36px;
  padding-left: 40px;
  padding-right: 40px;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
}

.list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}

.item-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  cursor: pointer;
}

.bottom-divider {
  width: 100%;
}

.bottom-divider2 {
  visibility: hidden;
}

@media (min-width: 768px) {
  .item-container {
    width: 50%;
  }

  .bottom-divider {
    width: 50%;
  }

  .bottom-divider2 {
    visibility: visible;
  }
}

.loading-spinner {
  height: 70vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.noResult {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 100%;
}

.arrow-icon {
  min-height: 40px;
  min-width: 40px;
  max-height: 40px;
  max-width: 40px;
  display: flex;
}

input:focus {
  outline: none;
}

.search-bar {
  width: 100%;
  margin: 16px;
  display: flex;
  border: 1px solid #e8ecf1;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: 10px;
  border: none;
  flex-grow: 1;
}

.search-button {
  padding-top: 4px;
  padding-right: 20px;
  cursor: pointer;
  min-width: 24px;
  max-width: 24px;
  min-height: 24px;
  max-height: 24px;
}
</style>
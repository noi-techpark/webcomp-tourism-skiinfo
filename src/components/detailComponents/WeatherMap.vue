<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <div>
      <!-- <div id="mapContainer"></div> -->
      <l-map
        :center="center"
        :zoom="zoom"
        class="map"
        ref="myMap"               
        @ready="doSomethingOnReady"
      >  <!-- @update:center="centerUpdated" -->
      <l-tile-layer
          :url="url"
        >             
        </l-tile-layer>  
      <l-marker 
        :lat-lng="center"
        >        
        </l-marker>
        <l-marker v-for="marker in measuringpoints" :key="marker.Id"
        :lat-lng="returnMarkerLatLng(marker)"
        >                   
        <!-- <l-popup :options="{ autoClose: false, closeOnClick: false }" :content="getMarkerContent(marker)"></l-popup>   -->
        </l-marker>         
        <l-layer-group ref="popups">
          <l-popup>Hallo</l-popup>
        </l-layer-group>
      </l-map>
    </div>
  </div>
</template>

<script lang="ts">
import L from 'leaflet';
import { LMap, LTileLayer, LMarker, LPopup, LLayerGroup, } from 'vue2-leaflet';
import { LatLngTuple } from 'leaflet';
import { WeatherApi } from '@/api/api';
import { Measuringpoint, SkiAreaLinked } from '@/api/models';
import Vue, { PropType } from 'vue';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

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


export default Vue.extend({
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LLayerGroup
  },
  props: {
    item: {
      type: Object as PropType<SkiAreaLinked>,
      required: true,
    },
    language: {
      type: String,
      required: false,
      default: 'en',
    },
  },
  data() {
    const data: {
      rawMeasuringpoints: Measuringpoint[] | null;
      titles: string[];
      url: string;
      center: LatLngTuple;       
      zoom: number;
      markerLatLng: LatLngTuple[] | null;
    } = {
      rawMeasuringpoints: null,
      titles: [
        'Name',
        'Snow Height',
        'New Snow',
        'Last Snow Date',
        'Altitude',
        'Last Update',
      ],
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      center: [46.7728692,10.7916716],
      zoom: 13,
      markerLatLng: null
    };

    return data;
  },
  // mounted() {
  //  this.setupLeafletMap();
  // },
  computed: {
    measuringpoints():
      | {
          Id?: string;
          Shortname?: string;
          SnowHeight?: string;
          newSnowHeight?: string;
          LastSnowDate?: Date;
          Altitude?: number;
          LastUpdate?: Date;
          Latitude?: number;
          Longitude?: number;
        }[]
      | undefined {
      return this.rawMeasuringpoints?.map(
        ({
          Id,
          Shortname,
          SnowHeight,
          newSnowHeight,
          LastSnowDate,
          Altitude,
          LastUpdate,
          Latitude,
          Longitude,                 
        }) => {
          return {
            Id: Id ?? undefined,
            Shortname: Shortname ?? undefined,
            SnowHeight: SnowHeight ?? undefined,
            newSnowHeight: newSnowHeight ?? undefined,
            LastSnowDate: LastSnowDate ?? undefined,
            Altitude: Altitude ?? undefined,
            LastUpdate: LastUpdate ?? undefined,
            Latitude: Latitude ?? undefined,
            Longitude: Longitude ?? undefined            
          };
        }
      );    
    }
  },
  created() {
    this.init();
  },
  watch: {
    item: function() {
      this.init();
    },
  },
  methods: {
    init() {
      this.loadMeasuringpoints();
    },
    // setupLeafletMap() {
    //   const mapDiv = L.map("mapContainer").setView(this.center!, 13);
    //   L.tileLayer(
    //     'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',        
    //   ).addTo(mapDiv);
    // },
    loadMeasuringpoints() {
      if (!this.item.Id) return;
      new WeatherApi()
        .v1WeatherMeasuringpointGet(
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          this.item.Id,
          undefined,
          undefined,
          true,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined
        )
        .then((value) => {
          this.rawMeasuringpoints = value.data.length === 0 ? null : value.data;
                            
          this.center = [this.item.Latitude!, this.item.Longitude!]

          //var myobject = this.$refs.features.mapObject as L.map
          
          //.openPopup(this.center);

          //https://vue2-leaflet.netlify.app/faq/#my-map-and-or-markers-don-t-fully-render-what-gives
        });
    },
  //   centerUpdated (center: LatLngTuple) {
  //         this.center = center;
  //         //L.map("mapContainer").setView(this.center!, 15);
        
  //  },
   doSomethingOnReady() {
        const mymap = (this.$refs?.myMap as unknown as L.Map);
        console.log('ready');
        
        //working
        mymap.setZoom(10);

        //vue.runtime.esm.js:3049  TypeError: mymap.invalidateSize is not a function
        //mymap.invalidateSize(true);
        //vue.runtime.esm.js:3049  TypeError: mymap.invalidateSize is not a function
        
        mymap.setView(this.center, this.zoom);
        //vue.runtime.esm.js:3049  TypeError: mymap.invalidateSize is not a function
        //mymap.setTimeout(function(){map.invalidateSize(true);},500);;
   },
   returnMarkerLatLng(marker: Measuringpoint)
   {
        return [marker.Latitude, marker.Longitude];
   },
   getMarkerContent(marker: Measuringpoint)
   {
      const mpname = "<tr><td><h3>" + marker.Shortname + "</h2></td></tr>";
      const snowheight = "<tr><td>Snow Height: " + marker.SnowHeight + "</td></tr>";
      const newsnow = "<tr><td>New Snow: " + marker.newSnowHeight + "</td></tr>";
      const lastupdate = "<tr><td>Last Update: " + marker.LastUpdate + "</td></tr>";
      const altitude = "<tr><td>Altitude: " + marker.Altitude + "</td></tr>";      

      return "<table class=\"table table-striped\">" + mpname + snowheight + newsnow + lastupdate + altitude + "</table>";
   }
  },
});
</script>


<style>
/* @import 'http://cdn.leafletjs.com/leaflet-0.7.5/leaflet.css'; */

 .map {
   position: relative;
   width: 100%;
   height: 500px;
   max-height: 500px;
   min-height: 300px;
   overflow :hidden
 }
 /* #mapContainer {
   position: absolute;
   width: 100%;
   max-height: 500px;
   min-height: 250px;
   overflow :hidden
 } */
</style>
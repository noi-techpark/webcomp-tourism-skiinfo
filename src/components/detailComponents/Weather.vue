<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <div v-if="hasContent" class="weather">
      <!-- forecast of the municipality closest to the ski area -->
      <section v-if="forecast" class="weather-forecast">
        <h3 class="weather-section-title">
          {{ $t('weathertable.forecast') }} · {{ forecast.municipality }}
        </h3>
        <div class="weather-forecast-days">
          <div
            v-for="day in forecast.days"
            :key="day.date.getTime()"
            class="weather-forecast-day"
          >
            <div class="weather-forecast-date">
              {{ formatWeekday(day.date) }}
            </div>
            <img
              v-if="day.icon"
              class="weather-forecast-icon"
              :src="day.icon"
              :alt="day.description"
              :title="day.description"
            />
            <div class="weather-forecast-temp">
              <strong>{{ day.maxTemp }}°</strong>
              <span>{{ day.minTemp }}°</span>
            </div>
            <div
              v-if="day.precipitationProbability !== null"
              class="weather-forecast-rain"
              :title="$t('weathertable.precipitation')"
            >
              <umbrella class="weather-icon" />
              {{ day.precipitationProbability }} %
            </div>
          </div>
        </div>
      </section>

      <!-- summary over all measuring points -->
      <div v-if="points.length" class="weather-summary">
        <div v-if="summary.snow !== null" class="weather-stat">
          <snowflake class="weather-stat-icon" />
          <div>
            <div class="weather-stat-value">{{ summary.snow }} cm</div>
            <div class="weather-stat-label">
              {{ $t('weathertable.snowdepthmax') }}
            </div>
          </div>
        </div>
        <div v-if="summary.newSnow !== null" class="weather-stat">
          <new-snow class="weather-stat-icon" />
          <div>
            <div class="weather-stat-value">{{ summary.newSnow }} cm</div>
            <div class="weather-stat-label">
              {{ $t('weathertable.newsnowmax') }}
            </div>
          </div>
        </div>
        <div v-if="summary.lastSnow" class="weather-stat">
          <snowfall class="weather-stat-icon" />
          <div>
            <div class="weather-stat-value">
              {{ formatDate(summary.lastSnow) }}
            </div>
            <div class="weather-stat-label">
              {{ $t('weathertable.lastsnowdate') }}
            </div>
          </div>
        </div>
        <div v-if="summary.updated" class="weather-stat">
          <clock class="weather-stat-icon" />
          <div>
            <div class="weather-stat-value">
              {{ formatDate(summary.updated) }}
            </div>
            <div class="weather-stat-label">
              {{ $t('weathertable.lastupdate') }}
            </div>
          </div>
        </div>
      </div>

      <div class="weather-layout" :class="{ 'has-map': hasMap }">
        <div class="weather-sections">
          <h3 v-if="points.length" class="weather-section-title">
            {{ $t('weathertable.measuringpoints') }}
          </h3>
          <div v-if="points.length" class="weather-points">
            <article
              v-for="point in points"
              :key="point.id"
              class="weather-point"
              :class="{
                'is-highlighted': point.id === highlight,
                'is-outdated': point.outdated,
              }"
              @mouseenter="highlight = point.id"
              @mouseleave="highlight = null"
            >
              <header class="weather-point-head">
                <h3 class="weather-point-name">{{ point.name }}</h3>
                <span v-if="point.altitude" class="weather-chip">
                  <mountain class="weather-icon" /> {{ point.altitude }} m
                </span>
                <span v-if="point.outdated" class="weather-chip is-muted">
                  {{ $t('weathertable.outdated') }}
                </span>
              </header>

              <div v-if="point.snow !== null" class="weather-snow">
                <div class="weather-snow-label">
                  <snowflake class="weather-icon" />
                  <span>{{ $t('weathertable.snowheight') }}</span>
                  <strong>{{ point.snow }} cm</strong>
                </div>
                <div class="weather-snow-bar">
                  <span
                    :style="{ width: snowPercent(point.snow) + '%' }"
                  ></span>
                </div>
              </div>

              <dl class="weather-facts">
                <div v-if="point.newSnow !== null">
                  <dt>
                    <new-snow class="weather-icon" />{{
                      $t('weathertable.newsnow')
                    }}
                  </dt>
                  <dd>{{ point.newSnow }} cm</dd>
                </div>
                <div v-if="point.temperature !== null">
                  <dt>
                    <thermometer class="weather-icon" />{{
                      $t('weathertable.temperature')
                    }}
                  </dt>
                  <dd>{{ point.temperature }} °C</dd>
                </div>
                <div v-if="point.lastSnow">
                  <dt>
                    <snowfall class="weather-icon" />{{
                      $t('weathertable.lastsnowdate')
                    }}
                  </dt>
                  <dd>{{ formatDate(point.lastSnow) }}</dd>
                </div>
                <div v-if="point.updated">
                  <dt>
                    <clock class="weather-icon" />{{
                      $t('weathertable.lastupdate')
                    }}
                  </dt>
                  <dd>{{ formatDate(point.updated) }}</dd>
                </div>
              </dl>
            </article>
          </div>

          <h3 v-if="stations.length" class="weather-section-title">
            {{ $t('weathertable.stations') }}
          </h3>
          <div v-if="stations.length" class="weather-points">
            <article
              v-for="station in stations"
              :key="station.id"
              class="weather-point"
              :class="{ 'is-highlighted': station.id === highlight }"
              @mouseenter="highlight = station.id"
              @mouseleave="highlight = null"
            >
              <header class="weather-point-head">
                <h3 class="weather-point-name">{{ station.name }}</h3>
                <span v-if="station.altitude" class="weather-chip">
                  <mountain class="weather-icon" /> {{ station.altitude }} m
                </span>
              </header>
              <div
                v-if="station.temperature !== null"
                class="weather-station-temp"
              >
                <thermometer class="weather-icon" />
                <strong>{{ station.temperature }} °C</strong>
              </div>
              <dl class="weather-facts">
                <div v-if="station.snow !== null && station.snow >= 0">
                  <dt>
                    <snowflake class="weather-icon" />{{
                      $t('weathertable.snowheight')
                    }}
                  </dt>
                  <dd>{{ station.snow }} cm</dd>
                </div>
                <div v-if="station.wind !== null">
                  <dt>
                    <wind class="weather-icon" />{{ $t('weathertable.wind') }}
                  </dt>
                  <dd>
                    {{ station.wind }} m/s
                    <span v-if="station.windDirection">
                      {{ station.windDirection }}</span
                    >
                  </dd>
                </div>
                <div v-if="station.humidity !== null">
                  <dt>
                    <humidity class="weather-icon" />{{
                      $t('weathertable.humidity')
                    }}
                  </dt>
                  <dd>{{ station.humidity }} %</dd>
                </div>
                <div v-if="station.updated">
                  <dt>
                    <clock class="weather-icon" />{{
                      $t('weathertable.lastupdate')
                    }}
                  </dt>
                  <dd>{{ formatDateTime(station.updated) }}</dd>
                </div>
              </dl>
            </article>
          </div>
        </div>

        <WeatherMap
          v-if="hasMap"
          ref="map"
          :rings="rings"
          :points="mapPoints"
          :highlight="highlight"
          @highlight="highlight = $event"
        />
      </div>
    </div>
    <div v-else-if="loaded" class="skiinfo-empty text-center">
      <span>{{ $t('noData.weather') }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Measuringpoint, SkiAreaLinked } from '@/api/models';
import Vue, { PropType } from 'vue';
import WeatherMap, { MapPoint } from './WeatherMap.vue';
import {
  getSkiAreaPolygonWkt,
  hasPosition,
  LatLng,
  loadSkiAreaMeasuringpoints,
  parsePolygonRings,
} from './measuringPoints';
import {
  Forecast,
  loadForecast,
  loadWeatherStations,
  WeatherStation,
} from './weatherData';
import Snowflake from '@/assets/img/ic_snowflake.svg';
import NewSnow from '@/assets/img/ic_newsnow.svg';
import Thermometer from '@/assets/img/ic_thermometer.svg';
import Mountain from '@/assets/img/ic_mountain.svg';
import Clock from '@/assets/img/ic_clock.svg';
import Snowfall from '@/assets/img/ic_snowfall.svg';
import Wind from '@/assets/img/ic_wind.svg';
import Humidity from '@/assets/img/ic_humidity.svg';
import Umbrella from '@/assets/img/ic_umbrella.svg';

interface WeatherPoint {
  id: string;
  name: string;
  altitude: number | null;
  snow: number | null;
  newSnow: number | null;
  temperature: number | null;
  lastSnow: Date | null;
  updated: Date | null;
  outdated: boolean;
  latLng: LatLng | null;
}

const OUTDATED_DAYS = 30;

function toNumber(value?: string | number | null): number | null {
  if (value === null || value === undefined || value === '') return null;
  const number = parseFloat(String(value).replace(',', '.'));
  return isNaN(number) ? null : number;
}

function toDate(value?: Date | string | null): Date | null {
  if (!value) return null;
  const date = new Date(value);
  // the API uses 0001-01-01 for "no date"
  return isNaN(date.getTime()) || date.getFullYear() < 1900 ? null : date;
}

export default Vue.extend({
  components: {
    WeatherMap,
    Snowflake,
    NewSnow,
    Thermometer,
    Mountain,
    Clock,
    Snowfall,
    Wind,
    Humidity,
    Umbrella,
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
    refreshmarker: {
      type: Number,
      required: true,
    },
  },
  data() {
    const data: {
      rawMeasuringpoints: Measuringpoint[];
      stations: WeatherStation[];
      forecast: Forecast | null;
      loaded: boolean;
      highlight: string | null;
    } = {
      rawMeasuringpoints: [],
      stations: [],
      forecast: null,
      loaded: false,
      highlight: null,
    };
    return data;
  },
  computed: {
    points(): WeatherPoint[] {
      const outdatedBefore = Date.now() - OUTDATED_DAYS * 24 * 3600 * 1000;
      return this.rawMeasuringpoints
        .map((point, index) => {
          const updated = toDate(point.LastUpdate);
          return {
            id: point.Id ?? String(index),
            name: point.Shortname ?? '',
            altitude: toNumber(point.Altitude) || null,
            snow: toNumber(point.SnowHeight),
            newSnow: toNumber(point.newSnowHeight),
            temperature: toNumber(point.Temperature),
            lastSnow: toDate(point.LastSnowDate),
            updated,
            outdated: !!updated && updated.getTime() < outdatedBefore,
            latLng: hasPosition(point)
              ? ([point.Latitude, point.Longitude] as LatLng)
              : null,
          };
        })
        .sort(
          (a, b) =>
            (b.altitude ?? -1) - (a.altitude ?? -1) ||
            (b.snow ?? -1) - (a.snow ?? -1) ||
            a.name.localeCompare(b.name)
        );
    },
    summary(): {
      snow: number | null;
      newSnow: number | null;
      lastSnow: Date | null;
      updated: Date | null;
    } {
      const max = (values: (number | null)[]) => {
        const numbers = values.filter((v): v is number => v !== null);
        return numbers.length ? Math.max(...numbers) : null;
      };
      const latest = (values: (Date | null)[]) => {
        const dates = values.filter((v): v is Date => v !== null);
        return dates.length
          ? new Date(Math.max(...dates.map((d) => d.getTime())))
          : null;
      };
      return {
        snow: max(this.points.map((p) => p.snow)),
        newSnow: max(this.points.map((p) => p.newSnow)),
        lastSnow: latest(this.points.map((p) => p.lastSnow)),
        updated: latest(this.points.map((p) => p.updated)),
      };
    },
    rings(): LatLng[][] {
      return parsePolygonRings(getSkiAreaPolygonWkt(this.item));
    },
    mapPoints(): MapPoint[] {
      return this.points
        .filter((p) => p.latLng)
        .map(
          (p): MapPoint => ({
            id: p.id,
            name: p.name,
            label: p.snow !== null ? p.snow + ' cm' : '',
            kind: 'snow',
            latLng: p.latLng as LatLng,
          })
        )
        .concat(
          this.stations.map(
            (s): MapPoint => ({
              id: s.id,
              name: s.name,
              label: s.temperature !== null ? s.temperature + ' °C' : '',
              kind: 'station',
              latLng: s.latLng,
            })
          )
        );
    },
    hasMap(): boolean {
      return this.rings.length > 0 || this.mapPoints.length > 0;
    },
    hasContent(): boolean {
      return (
        this.points.length > 0 || this.stations.length > 0 || !!this.forecast
      );
    },
  },
  created() {
    this.init();
  },
  watch: {
    item() {
      this.init();
    },
    refreshmarker() {
      (this.$refs.map as
        | { invalidate?: () => void }
        | undefined)?.invalidate?.();
    },
  },
  methods: {
    init() {
      this.loaded = false;
      Promise.all([
        loadSkiAreaMeasuringpoints(this.item),
        loadWeatherStations(this.item, this.language).catch(() => []),
        loadForecast(this.item, this.language),
      ]).then(([points, stations, forecast]) => {
        this.rawMeasuringpoints = points;
        this.stations = stations;
        this.forecast = forecast;
        this.loaded = true;
      });
    },
    snowPercent(snow: number): number {
      const max = this.summary.snow;
      return max ? Math.max(4, Math.round((snow / max) * 100)) : 0;
    },
    locale(): string {
      return this.language === 'en' ? 'en-GB' : this.language;
    },
    formatDate(date: Date): string {
      return new Intl.DateTimeFormat(this.locale(), {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).format(date);
    },
    formatDateTime(date: Date): string {
      return new Intl.DateTimeFormat(this.locale(), {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
    },
    formatWeekday(date: Date): string {
      return new Intl.DateTimeFormat(this.locale(), {
        weekday: 'short',
        day: 'numeric',
        month: 'numeric',
      }).format(date);
    },
  },
});
</script>

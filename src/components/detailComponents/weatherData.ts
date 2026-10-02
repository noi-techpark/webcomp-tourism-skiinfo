// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import globalAxios from 'axios';
import { CommonApi, WeatherApi } from '@/api/api';
import { BASE_PATH } from '@/api/base';
import { SkiAreaLinked } from '@/api/models';
import {
  getSkiAreaPolygonWkt,
  insideRing,
  LatLng,
  parsePolygonRings,
} from './measuringPoints';

// stations outside the polygon are only used when none is inside and this close
const STATION_MAX_KM = 5;
// forecasts exist per South Tyrol municipality; ski areas further away get none
const FORECAST_MAX_KM = 10;

export interface WeatherStation {
  id: string;
  name: string;
  altitude: number | null;
  temperature: number | null;
  snow: number | null;
  wind: number | null;
  windDirection: string | null;
  humidity: number | null;
  updated: Date | null;
  latLng: LatLng;
}

export interface ForecastDay {
  date: Date;
  minTemp: number | null;
  maxTemp: number | null;
  description: string;
  icon: string | null;
  precipitationProbability: number | null;
}

export interface Forecast {
  municipality: string;
  days: ForecastDay[];
}

// Weather/Realtime delivers lowercase keys (the generated model expects PascalCase)
interface RealtimeItem {
  id?: string;
  name?: string;
  altitude?: number;
  latitude?: number;
  longitude?: number;
  t?: string;
  hs?: string;
  ff?: string;
  dd?: string;
  rh?: string;
  lastUpdated?: string;
}

interface ForecastResponse {
  Shortname?: string;
  MunicipalityName?: { [lang: string]: string };
  ForeCastDaily?: {
    Date: string;
    MinTemp?: number;
    MaxTemp?: number;
    WeatherDesc?: string;
    WeatherDescription?: { [lang: string]: string };
    WeatherImgUrl?: string;
    PrecipitationProbability?: number;
  }[];
}

function toNumber(value?: string | number | null): number | null {
  if (value === null || value === undefined) return null;
  const number = parseFloat(String(value).replace(',', '.'));
  return isNaN(number) ? null : number;
}

function distanceKm([lat1, lng1]: LatLng, [lat2, lng2]: LatLng): number {
  const dy = (lat2 - lat1) * 111.32;
  const dx = (lng2 - lng1) * 111.32 * Math.cos((lat1 * Math.PI) / 180);
  return Math.hypot(dx, dy);
}

function skiAreaPosition(item: SkiAreaLinked): LatLng | null {
  return item.Latitude && item.Longitude
    ? [item.Latitude, item.Longitude]
    : null;
}

/**
 * Realtime weather stations for a ski area: all stations inside the ski area
 * polygon, or the nearest station close to the ski area when none is inside.
 */
export function loadWeatherStations(
  item: SkiAreaLinked,
  language: string
): Promise<WeatherStation[]> {
  const rings = parsePolygonRings(getSkiAreaPolygonWkt(item));
  const position = skiAreaPosition(item);
  if (!rings.length && !position) return Promise.resolve([]);

  // the realtime endpoint has no polygon filter, but only ~100 stations
  return new WeatherApi()
    .v1WeatherRealtimeGet(undefined, undefined, language)
    .then((value) => {
      const stations = ((value.data as unknown) as RealtimeItem[])
        .filter((s) => s.latitude && s.longitude)
        .map(
          (s): WeatherStation => ({
            id: s.id ?? s.name ?? '',
            name: s.name ?? '',
            altitude: s.altitude ?? null,
            temperature: toNumber(s.t),
            snow: toNumber(s.hs),
            wind: toNumber(s.ff),
            windDirection: s.dd && s.dd !== '--' ? s.dd : null,
            humidity: toNumber(s.rh),
            updated: s.lastUpdated ? new Date(s.lastUpdated) : null,
            latLng: [s.latitude as number, s.longitude as number],
          })
        );

      const inside = stations.filter((s) =>
        rings.some((ring) => insideRing(s.latLng, ring))
      );
      if (inside.length || !position) return inside;

      const nearest = stations
        .map((s) => ({ s, km: distanceKm(position, s.latLng) }))
        .sort((a, b) => a.km - b.km)[0];
      return nearest && nearest.km <= STATION_MAX_KM ? [nearest.s] : [];
    });
}

/**
 * Daily forecast of the municipality closest to the ski area
 * (Weather/Forecast is provided per South Tyrol municipality, id forecast_<ISTAT>).
 */
export function loadForecast(
  item: SkiAreaLinked,
  language: string
): Promise<Forecast | null> {
  const position = skiAreaPosition(item);
  if (!position) return Promise.resolve(null);

  return new CommonApi()
    .v1MunicipalityGet(
      1,
      1,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      position[0].toString(),
      position[1].toString(),
      (FORECAST_MAX_KM * 1000).toString(),
      ['Id', 'IstatNumber'],
      language
    )
    .then((value) => {
      const data = (value.data as unknown) as
        | { Items?: { IstatNumber?: string }[] }
        | { IstatNumber?: string }[];
      const items = Array.isArray(data) ? data : data.Items ?? [];
      // results are sorted by distance, the first one is the closest
      const istat = items[0]?.IstatNumber;
      if (!istat) return null;
      return globalAxios
        .get<ForecastResponse>(
          `${BASE_PATH}/v1/Weather/Forecast/forecast_${istat}`,
          { params: { language } }
        )
        .then(({ data: forecast }) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const days = (forecast.ForeCastDaily ?? [])
            .map(
              (day): ForecastDay => ({
                date: new Date(day.Date),
                minTemp: day.MinTemp ?? null,
                maxTemp: day.MaxTemp ?? null,
                description:
                  day.WeatherDescription?.[language] ?? day.WeatherDesc ?? '',
                icon: day.WeatherImgUrl ?? null,
                precipitationProbability: day.PrecipitationProbability ?? null,
              })
            )
            // dates are midnight local time sent as UTC; drop days already past
            .filter((day) => day.date.getTime() >= today.getTime())
            .slice(0, 5);
          return days.length
            ? {
                municipality:
                  forecast.MunicipalityName?.[language] ??
                  forecast.Shortname ??
                  '',
                days,
              }
            : null;
        });
    })
    .catch(() => null);
}

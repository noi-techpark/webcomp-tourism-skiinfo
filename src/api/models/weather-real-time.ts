/* tslint:disable */
/* eslint-disable */
/**
 * Open Data Hub Tourism Api
 * Open Data Hub Tourism Api based on .Net Core with PostgreSQL
 *
 * OpenAPI spec version: v1
 * Contact: help@opendatahub.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { RealTimeMeasurements } from './real-time-measurements';
/**
 * 
 * @export
 * @interface WeatherRealTime
 */
export interface WeatherRealTime {
    /**
     * 
     * @type {number}
     * @memberof WeatherRealTime
     */
    altitude?: number;
    /**
     * Indicates whether the weather stations are: [1] in the valley, [2] gauge stations, [3] on the mountain
     * @type {number}
     * @memberof WeatherRealTime
     */
    categoryId?: number;
    /**
     * 
     * @type {string}
     * @memberof WeatherRealTime
     */
    code?: string | null;
    /**
     * 
     * @type {string}
     * @memberof WeatherRealTime
     */
    id?: string | null;
    /**
     * Wind direction
     * @type {string}
     * @memberof WeatherRealTime
     */
    dd?: string | null;
    /**
     * Wind speed (km/h)
     * @type {string}
     * @memberof WeatherRealTime
     */
    ff?: string | null;
    /**
     * Snow depth (cm)
     * @type {string}
     * @memberof WeatherRealTime
     */
    hs?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof WeatherRealTime
     */
    lastUpdated?: Date;
    /**
     * 
     * @type {number}
     * @memberof WeatherRealTime
     */
    latitude?: number;
    /**
     * 
     * @type {number}
     * @memberof WeatherRealTime
     */
    longitude?: number;
    /**
     * Only for weather stations on the mountain: [1] if the weather station is a snow measuring field, [2] if the weather station is a wind station, [null] otherwise
     * @type {string}
     * @memberof WeatherRealTime
     */
    lwdType?: string | null;
    /**
     * Precipitation from midnight (mm)
     * @type {string}
     * @memberof WeatherRealTime
     */
    n?: string | null;
    /**
     * 
     * @type {string}
     * @memberof WeatherRealTime
     */
    name?: string | null;
    /**
     * Atmospheric pressure (hPa)
     * @type {string}
     * @memberof WeatherRealTime
     */
    p?: string | null;
    /**
     * Flow rate (m³/s)
     * @type {string}
     * @memberof WeatherRealTime
     */
    q?: string | null;
    /**
     * Relative humidity (rH)
     * @type {string}
     * @memberof WeatherRealTime
     */
    rh?: string | null;
    /**
     * Air temperature (°C)
     * @type {string}
     * @memberof WeatherRealTime
     */
    t?: string | null;
    /**
     * 
     * @type {string}
     * @memberof WeatherRealTime
     */
    vaxcode?: string | null;
    /**
     * Water level (cm)
     * @type {string}
     * @memberof WeatherRealTime
     */
    w?: string | null;
    /**
     * Wind gust
     * @type {string}
     * @memberof WeatherRealTime
     */
    wMax?: string | null;
    /**
     * Sunshine duration (h)
     * @type {string}
     * @memberof WeatherRealTime
     */
    sd?: string | null;
    /**
     * Global radiation
     * @type {string}
     * @memberof WeatherRealTime
     */
    gs?: string | null;
    /**
     * Water temperature (°C)
     * @type {string}
     * @memberof WeatherRealTime
     */
    wt?: string | null;
    /**
     * 
     * @type {string}
     * @memberof WeatherRealTime
     */
    visibility?: string | null;
    /**
     * 
     * @type {string}
     * @memberof WeatherRealTime
     */
    zoomLevel?: string | null;
    /**
     * 
     * @type {Array<RealTimeMeasurements>}
     * @memberof WeatherRealTime
     */
    measurements?: Array<RealTimeMeasurements> | null;
}

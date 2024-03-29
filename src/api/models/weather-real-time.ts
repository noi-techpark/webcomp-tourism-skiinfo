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
    Altitude?: number;
    /**
     * Indicates whether the weather stations are: [1] in the valley, [2] gauge stations, [3] on the mountain
     * @type {number}
     * @memberof WeatherRealTime
     */
    CategoryId?: number;
    /**
     * 
     * @type {string}
     * @memberof WeatherRealTime
     */
    Code?: string | null;
    /**
     * 
     * @type {string}
     * @memberof WeatherRealTime
     */
    Id?: string | null;
    /**
     * Wind direction
     * @type {string}
     * @memberof WeatherRealTime
     */
    Dd?: string | null;
    /**
     * Wind speed (km/h)
     * @type {string}
     * @memberof WeatherRealTime
     */
    Ff?: string | null;
    /**
     * Snow depth (cm)
     * @type {string}
     * @memberof WeatherRealTime
     */
    Hs?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof WeatherRealTime
     */
    LastUpdated?: Date;
    /**
     * 
     * @type {number}
     * @memberof WeatherRealTime
     */
    Latitude?: number;
    /**
     * 
     * @type {number}
     * @memberof WeatherRealTime
     */
    Longitude?: number;
    /**
     * Only for weather stations on the mountain: [1] if the weather station is a snow measuring field, [2] if the weather station is a wind station, [null] otherwise
     * @type {string}
     * @memberof WeatherRealTime
     */
    LwdType?: string | null;
    /**
     * Precipitation from midnight (mm)
     * @type {string}
     * @memberof WeatherRealTime
     */
    N?: string | null;
    /**
     * 
     * @type {string}
     * @memberof WeatherRealTime
     */
    Name?: string | null;
    /**
     * Atmospheric pressure (hPa)
     * @type {string}
     * @memberof WeatherRealTime
     */
    P?: string | null;
    /**
     * Flow rate (m³/s)
     * @type {string}
     * @memberof WeatherRealTime
     */
    Q?: string | null;
    /**
     * Relative humidity (rH)
     * @type {string}
     * @memberof WeatherRealTime
     */
    Rh?: string | null;
    /**
     * Air temperature (°C)
     * @type {string}
     * @memberof WeatherRealTime
     */
    T?: string | null;
    /**
     * 
     * @type {string}
     * @memberof WeatherRealTime
     */
    Vaxcode?: string | null;
    /**
     * Water level (cm)
     * @type {string}
     * @memberof WeatherRealTime
     */
    W?: string | null;
    /**
     * Wind gust
     * @type {string}
     * @memberof WeatherRealTime
     */
    WMax?: string | null;
    /**
     * Sunshine duration (h)
     * @type {string}
     * @memberof WeatherRealTime
     */
    Sd?: string | null;
    /**
     * Global radiation
     * @type {string}
     * @memberof WeatherRealTime
     */
    Gs?: string | null;
    /**
     * Water temperature (°C)
     * @type {string}
     * @memberof WeatherRealTime
     */
    Wt?: string | null;
    /**
     * 
     * @type {string}
     * @memberof WeatherRealTime
     */
    Visibility?: string | null;
    /**
     * 
     * @type {string}
     * @memberof WeatherRealTime
     */
    ZoomLevel?: string | null;
    /**
     * 
     * @type {Array<RealTimeMeasurements>}
     * @memberof WeatherRealTime
     */
    Measurements?: Array<RealTimeMeasurements> | null;
}

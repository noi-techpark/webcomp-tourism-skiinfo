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
import { BezirksForecast } from './bezirks-forecast';
import { LicenseInfo } from './license-info';
/**
 * 
 * @export
 * @interface BezirksWeather
 */
export interface BezirksWeather {
    /**
     * 
     * @type {number}
     * @memberof BezirksWeather
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof BezirksWeather
     */
    districtName?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof BezirksWeather
     */
    date?: Date;
    /**
     * 
     * @type {Array<string>}
     * @memberof BezirksWeather
     */
    tourismVereinIds?: Array<string> | null;
    /**
     * 
     * @type {Array<BezirksForecast>}
     * @memberof BezirksWeather
     */
    bezirksForecast?: Array<BezirksForecast> | null;
    /**
     * 
     * @type {LicenseInfo}
     * @memberof BezirksWeather
     */
    licenseInfo?: LicenseInfo;
}

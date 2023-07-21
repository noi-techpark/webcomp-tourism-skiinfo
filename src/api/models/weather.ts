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
import { Conditions } from './conditions';
import { Forecast } from './forecast';
import { LicenseInfo } from './license-info';
import { Mountain } from './mountain';
import { Stationdata } from './stationdata';
/**
 * 
 * @export
 * @interface Weather
 */
export interface Weather {
    /**
     * 
     * @type {number}
     * @memberof Weather
     */
    Id?: number;
    /**
     * 
     * @type {Date}
     * @memberof Weather
     */
    Date?: Date;
    /**
     * 
     * @type {string}
     * @memberof Weather
     */
    Evolutiontitle?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Weather
     */
    Evolution?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Weather
     */
    Language?: string | null;
    /**
     * 
     * @type {Array<Conditions>}
     * @memberof Weather
     */
    Conditions?: Array<Conditions> | null;
    /**
     * 
     * @type {Array<Forecast>}
     * @memberof Weather
     */
    Forecast?: Array<Forecast> | null;
    /**
     * 
     * @type {Array<Mountain>}
     * @memberof Weather
     */
    Mountain?: Array<Mountain> | null;
    /**
     * 
     * @type {Array<Stationdata>}
     * @memberof Weather
     */
    Stationdata?: Array<Stationdata> | null;
    /**
     * 
     * @type {LicenseInfo}
     * @memberof Weather
     */
    LicenseInfo?: LicenseInfo;
}

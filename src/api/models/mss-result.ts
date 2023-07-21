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
import { MssResponseShort } from './mss-response-short';
/**
 * 
 * @export
 * @interface MssResult
 */
export interface MssResult {
    /**
     * 
     * @type {string}
     * @memberof MssResult
     */
    ResultId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof MssResult
     */
    CheapestChannel?: string | null;
    /**
     * 
     * @type {number}
     * @memberof MssResult
     */
    Cheapestprice?: number | null;
    /**
     * 
     * @type {number}
     * @memberof MssResult
     */
    BookableHotels?: number | null;
    /**
     * 
     * @type {Array<MssResponseShort>}
     * @memberof MssResult
     */
    MssResponseShort?: Array<MssResponseShort> | null;
}

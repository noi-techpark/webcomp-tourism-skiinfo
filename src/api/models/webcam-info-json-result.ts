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
import { WebcamInfo } from './webcam-info';
/**
 * 
 * @export
 * @interface WebcamInfoJsonResult
 */
export interface WebcamInfoJsonResult {
    /**
     * 
     * @type {number}
     * @memberof WebcamInfoJsonResult
     */
    TotalResults?: number;
    /**
     * 
     * @type {number}
     * @memberof WebcamInfoJsonResult
     */
    TotalPages?: number;
    /**
     * 
     * @type {number}
     * @memberof WebcamInfoJsonResult
     */
    CurrentPage?: number;
    /**
     * 
     * @type {string}
     * @memberof WebcamInfoJsonResult
     */
    PreviousPage?: string | null;
    /**
     * 
     * @type {string}
     * @memberof WebcamInfoJsonResult
     */
    NextPage?: string | null;
    /**
     * 
     * @type {string}
     * @memberof WebcamInfoJsonResult
     */
    Seed?: string | null;
    /**
     * 
     * @type {Array<WebcamInfo>}
     * @memberof WebcamInfoJsonResult
     */
    Items?: Array<WebcamInfo> | null;
}

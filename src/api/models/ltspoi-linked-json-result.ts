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
import { LTSPoiLinked } from './ltspoi-linked';
/**
 * 
 * @export
 * @interface LTSPoiLinkedJsonResult
 */
export interface LTSPoiLinkedJsonResult {
    /**
     * 
     * @type {number}
     * @memberof LTSPoiLinkedJsonResult
     */
    TotalResults?: number;
    /**
     * 
     * @type {number}
     * @memberof LTSPoiLinkedJsonResult
     */
    TotalPages?: number;
    /**
     * 
     * @type {number}
     * @memberof LTSPoiLinkedJsonResult
     */
    CurrentPage?: number;
    /**
     * 
     * @type {string}
     * @memberof LTSPoiLinkedJsonResult
     */
    PreviousPage?: string | null;
    /**
     * 
     * @type {string}
     * @memberof LTSPoiLinkedJsonResult
     */
    NextPage?: string | null;
    /**
     * 
     * @type {string}
     * @memberof LTSPoiLinkedJsonResult
     */
    Seed?: string | null;
    /**
     * 
     * @type {Array<LTSPoiLinked>}
     * @memberof LTSPoiLinkedJsonResult
     */
    Items?: Array<LTSPoiLinked> | null;
}

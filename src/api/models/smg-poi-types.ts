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
/**
 * 
 * @export
 * @interface SmgPoiTypes
 */
export interface SmgPoiTypes {
    /**
     * 
     * @type {string}
     * @memberof SmgPoiTypes
     */
    Id?: string | null;
    /**
     * 
     * @type {number}
     * @memberof SmgPoiTypes
     */
    Bitmask?: number;
    /**
     * 
     * @type {string}
     * @memberof SmgPoiTypes
     */
    Type?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SmgPoiTypes
     */
    Parent?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SmgPoiTypes
     */
    Key?: string | null;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof SmgPoiTypes
     */
    TypeDesc?: { [key: string]: string; } | null;
}

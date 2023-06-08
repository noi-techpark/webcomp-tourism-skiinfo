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
 * @interface TvInfo
 */
export interface TvInfo {
    /**
     * 
     * @type {string}
     * @memberof TvInfo
     */
    id?: string | null;
    /**
     * Deprecated use the Id/Selflink to retrieve correct names from the appropriate Endpoint
     * @type {{ [key: string]: string; }}
     * @memberof TvInfo
     */
    name?: { [key: string]: string; } | null;
}

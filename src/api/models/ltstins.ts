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
 * @interface LTSTins
 */
export interface LTSTins {
    /**
     * 
     * @type {string}
     * @memberof LTSTins
     */
    Id?: string | null;
    /**
     * 
     * @type {string}
     * @memberof LTSTins
     */
    LTSRID?: string | null;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof LTSTins
     */
    TinName?: { [key: string]: string; } | null;
}

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
 * @interface DDVenueCodes
 */
export interface DDVenueCodes {
    /**
     * 
     * @type {string}
     * @memberof DDVenueCodes
     */
    Id?: string | null;
    /**
     * 
     * @type {string}
     * @memberof DDVenueCodes
     */
    Code?: string | null;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof DDVenueCodes
     */
    TypeDesc?: { [key: string]: string; } | null;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof DDVenueCodes
     */
    Name?: { [key: string]: string; } | null;
    /**
     * 
     * @type {number}
     * @memberof DDVenueCodes
     */
    Bitmask?: number;
    /**
     * 
     * @type {string}
     * @memberof DDVenueCodes
     */
    Type?: string | null;
}

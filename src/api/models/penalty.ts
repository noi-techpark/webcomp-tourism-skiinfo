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
 * @interface Penalty
 */
export interface Penalty {
    /**
     * 
     * @type {number}
     * @memberof Penalty
     */
    Percent?: number | null;
    /**
     * 
     * @type {Date}
     * @memberof Penalty
     */
    Datefrom?: Date | null;
    /**
     * 
     * @type {number}
     * @memberof Penalty
     */
    Daysarrival?: number | null;
}
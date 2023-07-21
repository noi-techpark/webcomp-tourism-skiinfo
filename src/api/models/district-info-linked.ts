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
 * @interface DistrictInfoLinked
 */
export interface DistrictInfoLinked {
    /**
     * 
     * @type {string}
     * @memberof DistrictInfoLinked
     */
    Self?: string | null;
    /**
     * 
     * @type {string}
     * @memberof DistrictInfoLinked
     */
    Id?: string | null;
    /**
     * Deprecated use the Id/Selflink to retrieve correct names from the appropriate Endpoint
     * @type {{ [key: string]: string; }}
     * @memberof DistrictInfoLinked
     */
    Name?: { [key: string]: string; } | null;
}

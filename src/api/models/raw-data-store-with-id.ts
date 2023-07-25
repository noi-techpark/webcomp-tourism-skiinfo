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
 * @interface RawDataStoreWithId
 */
export interface RawDataStoreWithId {
    /**
     * 
     * @type {number}
     * @memberof RawDataStoreWithId
     */
    Id?: number | null;
    /**
     * 
     * @type {string}
     * @memberof RawDataStoreWithId
     */
    Type?: string | null;
    /**
     * 
     * @type {string}
     * @memberof RawDataStoreWithId
     */
    Datasource?: string | null;
    /**
     * 
     * @type {string}
     * @memberof RawDataStoreWithId
     */
    Sourceinterface?: string | null;
    /**
     * 
     * @type {string}
     * @memberof RawDataStoreWithId
     */
    Sourceid?: string | null;
    /**
     * 
     * @type {string}
     * @memberof RawDataStoreWithId
     */
    Sourceurl?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof RawDataStoreWithId
     */
    Importdate?: Date;
    /**
     * 
     * @type {string}
     * @memberof RawDataStoreWithId
     */
    License?: string | null;
    /**
     * 
     * @type {string}
     * @memberof RawDataStoreWithId
     */
    Rawformat?: string | null;
    /**
     * 
     * @type {string}
     * @memberof RawDataStoreWithId
     */
    Raw?: string | null;
}
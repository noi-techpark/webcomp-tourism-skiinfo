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
//import { LTSTaggingInfo } from './ltstagging-info';
import { LicenseInfo } from './license-info';
import { Metadata } from './metadata';
/**
 * 
 * @export
 * @interface TagLinked
 */
export interface TagLinked {
    /**
     * 
     * @type {Metadata}
     * @memberof TagLinked
     */
    meta?: Metadata;
    /**
     * 
     * @type {string}
     * @memberof TagLinked
     */
    self?: string | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof TagLinked
     */
    oDHTagIds?: Array<string> | null;
    /**
     * 
     * @type {LicenseInfo}
     * @memberof TagLinked
     */
    licenseInfo?: LicenseInfo;
    /**
     * 
     * @type {string}
     * @memberof TagLinked
     */
    id?: string | null;
    /**
     * Deprecated, refer to TagName
     * @type {string}
     * @memberof TagLinked
     */
    shortname?: string | null;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof TagLinked
     */
    tagName?: { [key: string]: string; } | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof TagLinked
     */
    validForEntity?: Array<string> | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof TagLinked
     */
    source?: Array<string> | null;
    /**
     * 
     * @type {Date}
     * @memberof TagLinked
     */
    firstImport?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof TagLinked
     */
    lastChange?: Date | null;
    /**
     * 
     * @type {boolean}
     * @memberof TagLinked
     */
    displayAsCategory?: boolean | null;
    /**
     * Deprecated, use Mapping or MappedIds
     * @type {{ [key: string]: string; }}
     * @memberof TagLinked
     */
    iDMCategoryMapping?: { [key: string]: string; } | null;
    /**
     * 
     * @type {LTSTaggingInfo}
     * @memberof TagLinked
     */
    //lTSTaggingInfo?: LTSTaggingInfo;
    /**
     * Deprecated, use ValidForEntity
     * @type {string}
     * @memberof TagLinked
     */
    mainEntity?: string | null;
    /**
     * 
     * @type {{ [key: string]: { [key: string]: string; }; }}
     * @memberof TagLinked
     */
    mapping?: { [key: string]: { [key: string]: string; }; } | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof TagLinked
     */
    mappedTagIds?: Array<string> | null;
    /**
     * 
     * @type {{ [key: string]: boolean; }}
     * @memberof TagLinked
     */
    publishDataWithTagOn?: { [key: string]: boolean; } | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof TagLinked
     */
    publishedOn?: Array<string> | null;
}

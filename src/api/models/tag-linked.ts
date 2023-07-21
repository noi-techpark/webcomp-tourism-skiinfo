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
import { LTSTaggingInfo } from './ltstagging-info';
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
    Meta?: Metadata;
    /**
     * 
     * @type {string}
     * @memberof TagLinked
     */
    Self?: string | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof TagLinked
     */
    ODHTagIds?: Array<string> | null;
    /**
     * 
     * @type {LicenseInfo}
     * @memberof TagLinked
     */
    LicenseInfo?: LicenseInfo;
    /**
     * 
     * @type {string}
     * @memberof TagLinked
     */
    Id?: string | null;
    /**
     * Deprecated, refer to TagName
     * @type {string}
     * @memberof TagLinked
     */
    Shortname?: string | null;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof TagLinked
     */
    TagName?: { [key: string]: string; } | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof TagLinked
     */
    ValidForEntity?: Array<string> | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof TagLinked
     */
    Source?: Array<string> | null;
    /**
     * 
     * @type {Date}
     * @memberof TagLinked
     */
    FirstImport?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof TagLinked
     */
    LastChange?: Date | null;
    /**
     * 
     * @type {boolean}
     * @memberof TagLinked
     */
    DisplayAsCategory?: boolean | null;
    /**
     * Deprecated, use Mapping or MappedIds
     * @type {{ [key: string]: string; }}
     * @memberof TagLinked
     */
    IDMCategoryMapping?: { [key: string]: string; } | null;
    /**
     * 
     * @type {LTSTaggingInfo}
     * @memberof TagLinked
     */
    LTSTaggingInfo?: LTSTaggingInfo;
    /**
     * Deprecated, use ValidForEntity
     * @type {string}
     * @memberof TagLinked
     */
    MainEntity?: string | null;
    /**
     * 
     * @type {{ [key: string]: { [key: string]: string; }; }}
     * @memberof TagLinked
     */
    Mapping?: { [key: string]: { [key: string]: string; }; } | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof TagLinked
     */
    MappedTagIds?: Array<string> | null;
    /**
     * 
     * @type {{ [key: string]: boolean; }}
     * @memberof TagLinked
     */
    PublishDataWithTagOn?: { [key: string]: boolean; } | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof TagLinked
     */
    PublishedOn?: Array<string> | null;
}

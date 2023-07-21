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
/**
 * 
 * @export
 * @interface SmgTags
 */
export interface SmgTags {
    /**
     * 
     * @type {LicenseInfo}
     * @memberof SmgTags
     */
    LicenseInfo?: LicenseInfo;
    /**
     * 
     * @type {string}
     * @memberof SmgTags
     */
    Id?: string | null;
    /**
     * Deprecated, refer to TagName
     * @type {string}
     * @memberof SmgTags
     */
    Shortname?: string | null;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof SmgTags
     */
    TagName?: { [key: string]: string; } | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof SmgTags
     */
    ValidForEntity?: Array<string> | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof SmgTags
     */
    Source?: Array<string> | null;
    /**
     * 
     * @type {Date}
     * @memberof SmgTags
     */
    FirstImport?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof SmgTags
     */
    LastChange?: Date | null;
    /**
     * 
     * @type {boolean}
     * @memberof SmgTags
     */
    DisplayAsCategory?: boolean | null;
    /**
     * Deprecated, use Mapping or MappedIds
     * @type {{ [key: string]: string; }}
     * @memberof SmgTags
     */
    IDMCategoryMapping?: { [key: string]: string; } | null;
    /**
     * 
     * @type {LTSTaggingInfo}
     * @memberof SmgTags
     */
    LTSTaggingInfo?: LTSTaggingInfo;
    /**
     * Deprecated, use ValidForEntity
     * @type {string}
     * @memberof SmgTags
     */
    MainEntity?: string | null;
    /**
     * 
     * @type {{ [key: string]: { [key: string]: string; }; }}
     * @memberof SmgTags
     */
    Mapping?: { [key: string]: { [key: string]: string; }; } | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof SmgTags
     */
    MappedTagIds?: Array<string> | null;
    /**
     * 
     * @type {{ [key: string]: boolean; }}
     * @memberof SmgTags
     */
    PublishDataWithTagOn?: { [key: string]: boolean; } | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof SmgTags
     */
    PublishedOn?: Array<string> | null;
}

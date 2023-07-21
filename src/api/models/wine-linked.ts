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
import { CompanyLink } from './company-link';
import { Detail } from './detail';
import { ImageGallery } from './image-gallery';
import { LicenseInfo } from './license-info';
import { Metadata } from './metadata';
/**
 * 
 * @export
 * @interface WineLinked
 */
export interface WineLinked {
    /**
     * 
     * @type {Metadata}
     * @memberof WineLinked
     */
    Meta?: Metadata;
    /**
     * 
     * @type {string}
     * @memberof WineLinked
     */
    Self?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof WineLinked
     */
    OdhActive?: boolean;
    /**
     * 
     * @type {CompanyLink}
     * @memberof WineLinked
     */
    Company?: CompanyLink;
    /**
     * 
     * @type {LicenseInfo}
     * @memberof WineLinked
     */
    LicenseInfo?: LicenseInfo;
    /**
     * 
     * @type {string}
     * @memberof WineLinked
     */
    Id?: string | null;
    /**
     * 
     * @type {string}
     * @memberof WineLinked
     */
    Shortname?: string | null;
    /**
     * 
     * @type {{ [key: string]: Detail; }}
     * @memberof WineLinked
     */
    Detail?: { [key: string]: Detail; } | null;
    /**
     * 
     * @type {number}
     * @memberof WineLinked
     */
    Vintage?: number;
    /**
     * 
     * @type {number}
     * @memberof WineLinked
     */
    Awardyear?: number;
    /**
     * Id on the primary data Source
     * @type {string}
     * @memberof WineLinked
     */
    CustomId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof WineLinked
     */
    CompanyId?: string | null;
    /**
     * 
     * @type {Array<ImageGallery>}
     * @memberof WineLinked
     */
    ImageGallery?: Array<ImageGallery> | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof WineLinked
     */
    Awards?: Array<string> | null;
    /**
     * 
     * @type {Date}
     * @memberof WineLinked
     */
    LastChange?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof WineLinked
     */
    FirstImport?: Date | null;
    /**
     * 
     * @type {boolean}
     * @memberof WineLinked
     */
    Active?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof WineLinked
     */
    SmgActive?: boolean;
    /**
     * 
     * @type {Array<string>}
     * @memberof WineLinked
     */
    HasLanguage?: Array<string> | null;
    /**
     * 
     * @type {string}
     * @memberof WineLinked
     */
    Source?: string | null;
    /**
     * 
     * @type {{ [key: string]: { [key: string]: string; }; }}
     * @memberof WineLinked
     */
    Mapping?: { [key: string]: { [key: string]: string; }; } | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof WineLinked
     */
    PublishedOn?: Array<string> | null;
}

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
import { ContactInfos } from './contact-infos';
import { Detail } from './detail';
import { DistanceInfo } from './distance-info';
import { GpsInfo } from './gps-info';
import { GpsPolygon } from './gps-polygon';
import { ImageGallery } from './image-gallery';
import { LicenseInfo } from './license-info';
import { Metadata } from './metadata';
import { ODHTags } from './odhtags';
import { RelatedContent } from './related-content';
import { Webcam } from './webcam';
/**
 * 
 * @export
 * @interface SkiRegionLinked
 */
export interface SkiRegionLinked {
    /**
     * 
     * @type {Metadata}
     * @memberof SkiRegionLinked
     */
    Meta?: Metadata;
    /**
     * 
     * @type {string}
     * @memberof SkiRegionLinked
     */
    Self?: string | null;
    /**
     * 
     * @type {Array<ODHTags>}
     * @memberof SkiRegionLinked
     */
    ODHTags?: Array<ODHTags> | null;
    /**
     * 
     * @type {boolean}
     * @memberof SkiRegionLinked
     */
    OdhActive?: boolean;
    /**
     * 
     * @type {Array<GpsPolygon>}
     * @memberof SkiRegionLinked
     */
    GpsPolygon?: Array<GpsPolygon> | null;
    /**
     * 
     * @type {Array<Webcam>}
     * @memberof SkiRegionLinked
     */
    Webcam?: Array<Webcam> | null;
    /**
     * 
     * @type {Array<RelatedContent>}
     * @memberof SkiRegionLinked
     */
    RelatedContent?: Array<RelatedContent> | null;
    /**
     * 
     * @type {LicenseInfo}
     * @memberof SkiRegionLinked
     */
    LicenseInfo?: LicenseInfo;
    /**
     * 
     * @type {string}
     * @memberof SkiRegionLinked
     */
    Id?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof SkiRegionLinked
     */
    Active?: boolean;
    /**
     * 
     * @type {string}
     * @memberof SkiRegionLinked
     */
    CustomId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SkiRegionLinked
     */
    Shortname?: string | null;
    /**
     * Deprecated, use GpsPoints
     * @type {string}
     * @memberof SkiRegionLinked
     */
    Gpstype?: string | null;
    /**
     * Deprecated, use GpsPoints
     * @type {number}
     * @memberof SkiRegionLinked
     */
    Latitude?: number;
    /**
     * Deprecated, use GpsPoints
     * @type {number}
     * @memberof SkiRegionLinked
     */
    Longitude?: number;
    /**
     * Deprecated, use GpsPoints
     * @type {number}
     * @memberof SkiRegionLinked
     */
    Altitude?: number | null;
    /**
     * Deprecated, use GpsPoints
     * @type {string}
     * @memberof SkiRegionLinked
     */
    AltitudeUnitofMeasure?: string | null;
    /**
     * 
     * @type {{ [key: string]: Detail; }}
     * @memberof SkiRegionLinked
     */
    Detail?: { [key: string]: Detail; } | null;
    /**
     * 
     * @type {{ [key: string]: ContactInfos; }}
     * @memberof SkiRegionLinked
     */
    ContactInfos?: { [key: string]: ContactInfos; } | null;
    /**
     * 
     * @type {Array<ImageGallery>}
     * @memberof SkiRegionLinked
     */
    ImageGallery?: Array<ImageGallery> | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof SkiRegionLinked
     */
    SmgTags?: Array<string> | null;
    /**
     * 
     * @type {boolean}
     * @memberof SkiRegionLinked
     */
    SmgActive?: boolean;
    /**
     * 
     * @type {Array<string>}
     * @memberof SkiRegionLinked
     */
    HasLanguage?: Array<string> | null;
    /**
     * 
     * @type {Date}
     * @memberof SkiRegionLinked
     */
    LastChange?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof SkiRegionLinked
     */
    FirstImport?: Date | null;
    /**
     * generated field
     * @type {{ [key: string]: GpsInfo; }}
     * @memberof SkiRegionLinked
     */
    GpsPoints?: { [key: string]: GpsInfo; } | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof SkiRegionLinked
     */
    PublishedOn?: Array<string> | null;
    /**
     * 
     * @type {string}
     * @memberof SkiRegionLinked
     */
    Source?: string | null;
    /**
     * 
     * @type {{ [key: string]: { [key: string]: string; }; }}
     * @memberof SkiRegionLinked
     */
    Mapping?: { [key: string]: { [key: string]: string; }; } | null;
    /**
     * 
     * @type {DistanceInfo}
     * @memberof SkiRegionLinked
     */
    DistanceInfo?: DistanceInfo;
}

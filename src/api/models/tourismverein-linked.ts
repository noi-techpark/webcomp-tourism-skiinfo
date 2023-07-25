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
import { RegionLink } from './region-link';
import { RelatedContent } from './related-content';
import { SkiAreaLink } from './ski-area-link';
import { Webcam } from './webcam';
/**
 * 
 * @export
 * @interface TourismvereinLinked
 */
export interface TourismvereinLinked {
    /**
     * 
     * @type {Metadata}
     * @memberof TourismvereinLinked
     */
    Meta?: Metadata;
    /**
     * 
     * @type {string}
     * @memberof TourismvereinLinked
     */
    Self?: string | null;
    /**
     * 
     * @type {Array<ODHTags>}
     * @memberof TourismvereinLinked
     */
    ODHTags?: Array<ODHTags> | null;
    /**
     * 
     * @type {boolean}
     * @memberof TourismvereinLinked
     */
    OdhActive?: boolean;
    /**
     * 
     * @type {RegionLink}
     * @memberof TourismvereinLinked
     */
    Region?: RegionLink;
    /**
     * 
     * @type {Array<SkiAreaLink>}
     * @memberof TourismvereinLinked
     */
    SkiAreas?: Array<SkiAreaLink> | null;
    /**
     * 
     * @type {string}
     * @memberof TourismvereinLinked
     */
    RegionId?: string | null;
    /**
     * 
     * @type {Array<GpsPolygon>}
     * @memberof TourismvereinLinked
     */
    GpsPolygon?: Array<GpsPolygon> | null;
    /**
     * 
     * @type {Array<Webcam>}
     * @memberof TourismvereinLinked
     */
    Webcam?: Array<Webcam> | null;
    /**
     * 
     * @type {boolean}
     * @memberof TourismvereinLinked
     */
    VisibleInSearch?: boolean;
    /**
     * 
     * @type {Array<string>}
     * @memberof TourismvereinLinked
     */
    SkiareaIds?: Array<string> | null;
    /**
     * 
     * @type {Array<RelatedContent>}
     * @memberof TourismvereinLinked
     */
    RelatedContent?: Array<RelatedContent> | null;
    /**
     * 
     * @type {LicenseInfo}
     * @memberof TourismvereinLinked
     */
    LicenseInfo?: LicenseInfo;
    /**
     * 
     * @type {string}
     * @memberof TourismvereinLinked
     */
    Id?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof TourismvereinLinked
     */
    Active?: boolean;
    /**
     * 
     * @type {string}
     * @memberof TourismvereinLinked
     */
    CustomId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof TourismvereinLinked
     */
    Shortname?: string | null;
    /**
     * Deprecated, use GpsPoints
     * @type {string}
     * @memberof TourismvereinLinked
     */
    Gpstype?: string | null;
    /**
     * Deprecated, use GpsPoints
     * @type {number}
     * @memberof TourismvereinLinked
     */
    Latitude?: number;
    /**
     * Deprecated, use GpsPoints
     * @type {number}
     * @memberof TourismvereinLinked
     */
    Longitude?: number;
    /**
     * Deprecated, use GpsPoints
     * @type {number}
     * @memberof TourismvereinLinked
     */
    Altitude?: number | null;
    /**
     * Deprecated, use GpsPoints
     * @type {string}
     * @memberof TourismvereinLinked
     */
    AltitudeUnitofMeasure?: string | null;
    /**
     * 
     * @type {{ [key: string]: Detail; }}
     * @memberof TourismvereinLinked
     */
    Detail?: { [key: string]: Detail; } | null;
    /**
     * 
     * @type {{ [key: string]: ContactInfos; }}
     * @memberof TourismvereinLinked
     */
    ContactInfos?: { [key: string]: ContactInfos; } | null;
    /**
     * 
     * @type {Array<ImageGallery>}
     * @memberof TourismvereinLinked
     */
    ImageGallery?: Array<ImageGallery> | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof TourismvereinLinked
     */
    SmgTags?: Array<string> | null;
    /**
     * 
     * @type {boolean}
     * @memberof TourismvereinLinked
     */
    SmgActive?: boolean;
    /**
     * 
     * @type {Array<string>}
     * @memberof TourismvereinLinked
     */
    HasLanguage?: Array<string> | null;
    /**
     * 
     * @type {Date}
     * @memberof TourismvereinLinked
     */
    LastChange?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof TourismvereinLinked
     */
    FirstImport?: Date | null;
    /**
     * generated field
     * @type {{ [key: string]: GpsInfo; }}
     * @memberof TourismvereinLinked
     */
    GpsPoints?: { [key: string]: GpsInfo; } | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof TourismvereinLinked
     */
    PublishedOn?: Array<string> | null;
    /**
     * 
     * @type {string}
     * @memberof TourismvereinLinked
     */
    Source?: string | null;
    /**
     * 
     * @type {{ [key: string]: { [key: string]: string; }; }}
     * @memberof TourismvereinLinked
     */
    Mapping?: { [key: string]: { [key: string]: string; }; } | null;
    /**
     * 
     * @type {DistanceInfo}
     * @memberof TourismvereinLinked
     */
    DistanceInfo?: DistanceInfo;
}
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
import { DetailThemed } from './detail-themed';
import { DistanceInfo } from './distance-info';
import { DistrictLink } from './district-link';
import { GpsInfo } from './gps-info';
import { GpsPolygon } from './gps-polygon';
import { ImageGallery } from './image-gallery';
import { LicenseInfo } from './license-info';
import { Metadata } from './metadata';
import { ODHTags } from './odhtags';
import { RegionLink } from './region-link';
import { RelatedContent } from './related-content';
import { TourismAssociationLink } from './tourism-association-link';
import { Webcam } from './webcam';
/**
 * 
 * @export
 * @interface MetaRegionLinked
 */
export interface MetaRegionLinked {
    /**
     * 
     * @type {Metadata}
     * @memberof MetaRegionLinked
     */
    Meta?: Metadata;
    /**
     * 
     * @type {string}
     * @memberof MetaRegionLinked
     */
    Self?: string | null;
    /**
     * 
     * @type {Array<ODHTags>}
     * @memberof MetaRegionLinked
     */
    ODHTags?: Array<ODHTags> | null;
    /**
     * 
     * @type {boolean}
     * @memberof MetaRegionLinked
     */
    OdhActive?: boolean;
    /**
     * 
     * @type {Array<DistrictLink>}
     * @memberof MetaRegionLinked
     */
    Districts?: Array<DistrictLink> | null;
    /**
     * 
     * @type {Array<TourismAssociationLink>}
     * @memberof MetaRegionLinked
     */
    TourismAssociations?: Array<TourismAssociationLink> | null;
    /**
     * 
     * @type {Array<RegionLink>}
     * @memberof MetaRegionLinked
     */
    Regions?: Array<RegionLink> | null;
    /**
     * 
     * @type {{ [key: string]: DetailThemed; }}
     * @memberof MetaRegionLinked
     */
    DetailThemed?: { [key: string]: DetailThemed; } | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof MetaRegionLinked
     */
    DistrictIds?: Array<string> | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof MetaRegionLinked
     */
    TourismvereinIds?: Array<string> | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof MetaRegionLinked
     */
    RegionIds?: Array<string> | null;
    /**
     * 
     * @type {Array<GpsPolygon>}
     * @memberof MetaRegionLinked
     */
    GpsPolygon?: Array<GpsPolygon> | null;
    /**
     * 
     * @type {Array<Webcam>}
     * @memberof MetaRegionLinked
     */
    Webcam?: Array<Webcam> | null;
    /**
     * 
     * @type {boolean}
     * @memberof MetaRegionLinked
     */
    VisibleInSearch?: boolean;
    /**
     * 
     * @type {Array<RelatedContent>}
     * @memberof MetaRegionLinked
     */
    RelatedContent?: Array<RelatedContent> | null;
    /**
     * 
     * @type {LicenseInfo}
     * @memberof MetaRegionLinked
     */
    LicenseInfo?: LicenseInfo;
    /**
     * 
     * @type {string}
     * @memberof MetaRegionLinked
     */
    Id?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof MetaRegionLinked
     */
    Active?: boolean;
    /**
     * 
     * @type {string}
     * @memberof MetaRegionLinked
     */
    CustomId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof MetaRegionLinked
     */
    Shortname?: string | null;
    /**
     * Deprecated, use GpsPoints
     * @type {string}
     * @memberof MetaRegionLinked
     */
    Gpstype?: string | null;
    /**
     * Deprecated, use GpsPoints
     * @type {number}
     * @memberof MetaRegionLinked
     */
    Latitude?: number;
    /**
     * Deprecated, use GpsPoints
     * @type {number}
     * @memberof MetaRegionLinked
     */
    Longitude?: number;
    /**
     * Deprecated, use GpsPoints
     * @type {number}
     * @memberof MetaRegionLinked
     */
    Altitude?: number | null;
    /**
     * Deprecated, use GpsPoints
     * @type {string}
     * @memberof MetaRegionLinked
     */
    AltitudeUnitofMeasure?: string | null;
    /**
     * 
     * @type {{ [key: string]: Detail; }}
     * @memberof MetaRegionLinked
     */
    Detail?: { [key: string]: Detail; } | null;
    /**
     * 
     * @type {{ [key: string]: ContactInfos; }}
     * @memberof MetaRegionLinked
     */
    ContactInfos?: { [key: string]: ContactInfos; } | null;
    /**
     * 
     * @type {Array<ImageGallery>}
     * @memberof MetaRegionLinked
     */
    ImageGallery?: Array<ImageGallery> | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof MetaRegionLinked
     */
    SmgTags?: Array<string> | null;
    /**
     * 
     * @type {boolean}
     * @memberof MetaRegionLinked
     */
    SmgActive?: boolean;
    /**
     * 
     * @type {Array<string>}
     * @memberof MetaRegionLinked
     */
    HasLanguage?: Array<string> | null;
    /**
     * 
     * @type {Date}
     * @memberof MetaRegionLinked
     */
    LastChange?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof MetaRegionLinked
     */
    FirstImport?: Date | null;
    /**
     * generated field
     * @type {{ [key: string]: GpsInfo; }}
     * @memberof MetaRegionLinked
     */
    GpsPoints?: { [key: string]: GpsInfo; } | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof MetaRegionLinked
     */
    PublishedOn?: Array<string> | null;
    /**
     * 
     * @type {string}
     * @memberof MetaRegionLinked
     */
    Source?: string | null;
    /**
     * 
     * @type {{ [key: string]: { [key: string]: string; }; }}
     * @memberof MetaRegionLinked
     */
    Mapping?: { [key: string]: { [key: string]: string; }; } | null;
    /**
     * 
     * @type {DistanceInfo}
     * @memberof MetaRegionLinked
     */
    DistanceInfo?: DistanceInfo;
}

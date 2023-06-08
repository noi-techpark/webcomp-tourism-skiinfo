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
import { AreaLink } from './area-link';
import { ContactInfos } from './contact-infos';
import { Detail } from './detail';
import { DistanceInfo } from './distance-info';
import { GpsInfo } from './gps-info';
import { GpsPolygon } from './gps-polygon';
import { ImageGallery } from './image-gallery';
import { LicenseInfo } from './license-info';
import { LocationInfoLinked } from './location-info-linked';
import { Metadata } from './metadata';
import { ODHTags } from './odhtags';
import { OperationSchedule } from './operation-schedule';
import { RegionLink } from './region-link';
import { RelatedContent } from './related-content';
import { SkiRegionLink } from './ski-region-link';
import { TourismAssociationLink } from './tourism-association-link';
import { Webcam } from './webcam';
/**
 * 
 * @export
 * @interface SkiAreaLinked
 */
export interface SkiAreaLinked {
    /**
     * 
     * @type {Metadata}
     * @memberof SkiAreaLinked
     */
    meta?: Metadata;
    /**
     * 
     * @type {string}
     * @memberof SkiAreaLinked
     */
    self?: string | null;
    /**
     * 
     * @type {Array<ODHTags>}
     * @memberof SkiAreaLinked
     */
    oDHTags?: Array<ODHTags> | null;
    /**
     * 
     * @type {boolean}
     * @memberof SkiAreaLinked
     */
    odhActive?: boolean;
    /**
     * 
     * @type {SkiRegionLink}
     * @memberof SkiAreaLinked
     */
    skiRegion?: SkiRegionLink;
    /**
     * 
     * @type {Array<AreaLink>}
     * @memberof SkiAreaLinked
     */
    areas?: Array<AreaLink> | null;
    /**
     * 
     * @type {Array<TourismAssociationLink>}
     * @memberof SkiAreaLinked
     */
    tourismAssociations?: Array<TourismAssociationLink> | null;
    /**
     * 
     * @type {Array<RegionLink>}
     * @memberof SkiAreaLinked
     */
    regions?: Array<RegionLink> | null;
    /**
     * 
     * @type {LocationInfoLinked}
     * @memberof SkiAreaLinked
     */
    locationInfo?: LocationInfoLinked;
    /**
     * 
     * @type {string}
     * @memberof SkiAreaLinked
     */
    skiRegionId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SkiAreaLinked
     */
    skiAreaMapURL?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SkiAreaLinked
     */
    totalSlopeKm?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SkiAreaLinked
     */
    slopeKmBlue?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SkiAreaLinked
     */
    slopeKmRed?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SkiAreaLinked
     */
    slopeKmBlack?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SkiAreaLinked
     */
    liftCount?: string | null;
    /**
     * 
     * @type {number}
     * @memberof SkiAreaLinked
     */
    altitudeFrom?: number | null;
    /**
     * 
     * @type {number}
     * @memberof SkiAreaLinked
     */
    altitudeTo?: number | null;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof SkiAreaLinked
     */
    skiRegionName?: { [key: string]: string; } | null;
    /**
     * Deprecated use AreaIds
     * @type {Array<string>}
     * @memberof SkiAreaLinked
     */
    areaId?: Array<string> | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof SkiAreaLinked
     */
    areaIds?: Array<string> | null;
    /**
     * 
     * @type {Array<Webcam>}
     * @memberof SkiAreaLinked
     */
    webcam?: Array<Webcam> | null;
    /**
     * 
     * @type {Array<OperationSchedule>}
     * @memberof SkiAreaLinked
     */
    operationSchedule?: Array<OperationSchedule> | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof SkiAreaLinked
     */
    tourismvereinIds?: Array<string> | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof SkiAreaLinked
     */
    regionIds?: Array<string> | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof SkiAreaLinked
     */
    municipalityIds?: Array<string> | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof SkiAreaLinked
     */
    districtIds?: Array<string> | null;
    /**
     * 
     * @type {Array<GpsPolygon>}
     * @memberof SkiAreaLinked
     */
    gpsPolygon?: Array<GpsPolygon> | null;
    /**
     * 
     * @type {Array<RelatedContent>}
     * @memberof SkiAreaLinked
     */
    relatedContent?: Array<RelatedContent> | null;
    /**
     * 
     * @type {LicenseInfo}
     * @memberof SkiAreaLinked
     */
    licenseInfo?: LicenseInfo;
    /**
     * 
     * @type {string}
     * @memberof SkiAreaLinked
     */
    id?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof SkiAreaLinked
     */
    active?: boolean;
    /**
     * 
     * @type {string}
     * @memberof SkiAreaLinked
     */
    customId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SkiAreaLinked
     */
    shortname?: string | null;
    /**
     * Deprecated, use GpsPoints
     * @type {string}
     * @memberof SkiAreaLinked
     */
    gpstype?: string | null;
    /**
     * Deprecated, use GpsPoints
     * @type {number}
     * @memberof SkiAreaLinked
     */
    latitude?: number;
    /**
     * Deprecated, use GpsPoints
     * @type {number}
     * @memberof SkiAreaLinked
     */
    longitude?: number;
    /**
     * Deprecated, use GpsPoints
     * @type {number}
     * @memberof SkiAreaLinked
     */
    altitude?: number | null;
    /**
     * Deprecated, use GpsPoints
     * @type {string}
     * @memberof SkiAreaLinked
     */
    altitudeUnitofMeasure?: string | null;
    /**
     * 
     * @type {{ [key: string]: Detail; }}
     * @memberof SkiAreaLinked
     */
    detail?: { [key: string]: Detail; } | null;
    /**
     * 
     * @type {{ [key: string]: ContactInfos; }}
     * @memberof SkiAreaLinked
     */
    contactInfos?: { [key: string]: ContactInfos; } | null;
    /**
     * 
     * @type {Array<ImageGallery>}
     * @memberof SkiAreaLinked
     */
    imageGallery?: Array<ImageGallery> | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof SkiAreaLinked
     */
    smgTags?: Array<string> | null;
    /**
     * 
     * @type {boolean}
     * @memberof SkiAreaLinked
     */
    smgActive?: boolean;
    /**
     * 
     * @type {Array<string>}
     * @memberof SkiAreaLinked
     */
    hasLanguage?: Array<string> | null;
    /**
     * 
     * @type {Date}
     * @memberof SkiAreaLinked
     */
    lastChange?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof SkiAreaLinked
     */
    firstImport?: Date | null;
    /**
     * generated field
     * @type {{ [key: string]: GpsInfo; }}
     * @memberof SkiAreaLinked
     */
    gpsPoints?: { [key: string]: GpsInfo; } | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof SkiAreaLinked
     */
    publishedOn?: Array<string> | null;
    /**
     * 
     * @type {string}
     * @memberof SkiAreaLinked
     */
    source?: string | null;
    /**
     * 
     * @type {{ [key: string]: { [key: string]: string; }; }}
     * @memberof SkiAreaLinked
     */
    mapping?: { [key: string]: { [key: string]: string; }; } | null;
    /**
     * 
     * @type {DistanceInfo}
     * @memberof SkiAreaLinked
     */
    distanceInfo?: DistanceInfo;
}

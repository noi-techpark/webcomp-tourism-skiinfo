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
import { MunicipalityLink } from './municipality-link';
import { ODHTags } from './odhtags';
import { RegionLink } from './region-link';
import { RelatedContent } from './related-content';
import { TourismAssociationLink } from './tourism-association-link';
import { Webcam } from './webcam';
/**
 * 
 * @export
 * @interface DistrictLinked
 */
export interface DistrictLinked {
    /**
     * 
     * @type {Metadata}
     * @memberof DistrictLinked
     */
    Meta?: Metadata;
    /**
     * 
     * @type {string}
     * @memberof DistrictLinked
     */
    Self?: string | null;
    /**
     * 
     * @type {Array<ODHTags>}
     * @memberof DistrictLinked
     */
    ODHTags?: Array<ODHTags> | null;
    /**
     * 
     * @type {boolean}
     * @memberof DistrictLinked
     */
    OdhActive?: boolean;
    /**
     * 
     * @type {RegionLink}
     * @memberof DistrictLinked
     */
    Region?: RegionLink;
    /**
     * 
     * @type {MunicipalityLink}
     * @memberof DistrictLinked
     */
    Municipality?: MunicipalityLink;
    /**
     * 
     * @type {TourismAssociationLink}
     * @memberof DistrictLinked
     */
    Tourismassociation?: TourismAssociationLink;
    /**
     * 
     * @type {boolean}
     * @memberof DistrictLinked
     */
    IsComune?: boolean | null;
    /**
     * 
     * @type {string}
     * @memberof DistrictLinked
     */
    RegionId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof DistrictLinked
     */
    TourismvereinId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof DistrictLinked
     */
    MunicipalityId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof DistrictLinked
     */
    SiagId?: string | null;
    /**
     * 
     * @type {Array<GpsPolygon>}
     * @memberof DistrictLinked
     */
    GpsPolygon?: Array<GpsPolygon> | null;
    /**
     * 
     * @type {Array<Webcam>}
     * @memberof DistrictLinked
     */
    Webcam?: Array<Webcam> | null;
    /**
     * 
     * @type {boolean}
     * @memberof DistrictLinked
     */
    VisibleInSearch?: boolean;
    /**
     * 
     * @type {Array<RelatedContent>}
     * @memberof DistrictLinked
     */
    RelatedContent?: Array<RelatedContent> | null;
    /**
     * 
     * @type {LicenseInfo}
     * @memberof DistrictLinked
     */
    LicenseInfo?: LicenseInfo;
    /**
     * 
     * @type {string}
     * @memberof DistrictLinked
     */
    Id?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof DistrictLinked
     */
    Active?: boolean;
    /**
     * 
     * @type {string}
     * @memberof DistrictLinked
     */
    CustomId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof DistrictLinked
     */
    Shortname?: string | null;
    /**
     * Deprecated, use GpsPoints
     * @type {string}
     * @memberof DistrictLinked
     */
    Gpstype?: string | null;
    /**
     * Deprecated, use GpsPoints
     * @type {number}
     * @memberof DistrictLinked
     */
    Latitude?: number;
    /**
     * Deprecated, use GpsPoints
     * @type {number}
     * @memberof DistrictLinked
     */
    Longitude?: number;
    /**
     * Deprecated, use GpsPoints
     * @type {number}
     * @memberof DistrictLinked
     */
    Altitude?: number | null;
    /**
     * Deprecated, use GpsPoints
     * @type {string}
     * @memberof DistrictLinked
     */
    AltitudeUnitofMeasure?: string | null;
    /**
     * 
     * @type {{ [key: string]: Detail; }}
     * @memberof DistrictLinked
     */
    Detail?: { [key: string]: Detail; } | null;
    /**
     * 
     * @type {{ [key: string]: ContactInfos; }}
     * @memberof DistrictLinked
     */
    ContactInfos?: { [key: string]: ContactInfos; } | null;
    /**
     * 
     * @type {Array<ImageGallery>}
     * @memberof DistrictLinked
     */
    ImageGallery?: Array<ImageGallery> | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof DistrictLinked
     */
    SmgTags?: Array<string> | null;
    /**
     * 
     * @type {boolean}
     * @memberof DistrictLinked
     */
    SmgActive?: boolean;
    /**
     * 
     * @type {Array<string>}
     * @memberof DistrictLinked
     */
    HasLanguage?: Array<string> | null;
    /**
     * 
     * @type {Date}
     * @memberof DistrictLinked
     */
    LastChange?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof DistrictLinked
     */
    FirstImport?: Date | null;
    /**
     * generated field
     * @type {{ [key: string]: GpsInfo; }}
     * @memberof DistrictLinked
     */
    GpsPoints?: { [key: string]: GpsInfo; } | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof DistrictLinked
     */
    PublishedOn?: Array<string> | null;
    /**
     * 
     * @type {string}
     * @memberof DistrictLinked
     */
    Source?: string | null;
    /**
     * 
     * @type {{ [key: string]: { [key: string]: string; }; }}
     * @memberof DistrictLinked
     */
    Mapping?: { [key: string]: { [key: string]: string; }; } | null;
    /**
     * 
     * @type {DistanceInfo}
     * @memberof DistrictLinked
     */
    DistanceInfo?: DistanceInfo;
}
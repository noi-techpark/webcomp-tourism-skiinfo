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
import { DistrictLink } from './district-link';
import { GpsInfo } from './gps-info';
import { GpsPolygon } from './gps-polygon';
import { ImageGallery } from './image-gallery';
import { LicenseInfo } from './license-info';
import { Metadata } from './metadata';
import { ODHTags } from './odhtags';
import { RelatedContent } from './related-content';
import { TourismAssociationLink } from './tourism-association-link';
/**
 * 
 * @export
 * @interface ExperienceAreaLinked
 */
export interface ExperienceAreaLinked {
    /**
     * 
     * @type {Metadata}
     * @memberof ExperienceAreaLinked
     */
    Meta?: Metadata;
    /**
     * 
     * @type {string}
     * @memberof ExperienceAreaLinked
     */
    Self?: string | null;
    /**
     * 
     * @type {Array<ODHTags>}
     * @memberof ExperienceAreaLinked
     */
    ODHTags?: Array<ODHTags> | null;
    /**
     * 
     * @type {boolean}
     * @memberof ExperienceAreaLinked
     */
    OdhActive?: boolean;
    /**
     * 
     * @type {Array<TourismAssociationLink>}
     * @memberof ExperienceAreaLinked
     */
    TourismAssociations?: Array<TourismAssociationLink> | null;
    /**
     * 
     * @type {Array<DistrictLink>}
     * @memberof ExperienceAreaLinked
     */
    Districts?: Array<DistrictLink> | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof ExperienceAreaLinked
     */
    DistrictIds?: Array<string> | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof ExperienceAreaLinked
     */
    TourismvereinIds?: Array<string> | null;
    /**
     * 
     * @type {Array<GpsPolygon>}
     * @memberof ExperienceAreaLinked
     */
    GpsPolygon?: Array<GpsPolygon> | null;
    /**
     * 
     * @type {boolean}
     * @memberof ExperienceAreaLinked
     */
    VisibleInSearch?: boolean;
    /**
     * 
     * @type {Array<RelatedContent>}
     * @memberof ExperienceAreaLinked
     */
    RelatedContent?: Array<RelatedContent> | null;
    /**
     * 
     * @type {LicenseInfo}
     * @memberof ExperienceAreaLinked
     */
    LicenseInfo?: LicenseInfo;
    /**
     * 
     * @type {string}
     * @memberof ExperienceAreaLinked
     */
    Id?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof ExperienceAreaLinked
     */
    Active?: boolean;
    /**
     * 
     * @type {string}
     * @memberof ExperienceAreaLinked
     */
    CustomId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ExperienceAreaLinked
     */
    Shortname?: string | null;
    /**
     * Deprecated, use GpsPoints
     * @type {string}
     * @memberof ExperienceAreaLinked
     */
    Gpstype?: string | null;
    /**
     * Deprecated, use GpsPoints
     * @type {number}
     * @memberof ExperienceAreaLinked
     */
    Latitude?: number;
    /**
     * Deprecated, use GpsPoints
     * @type {number}
     * @memberof ExperienceAreaLinked
     */
    Longitude?: number;
    /**
     * Deprecated, use GpsPoints
     * @type {number}
     * @memberof ExperienceAreaLinked
     */
    Altitude?: number | null;
    /**
     * Deprecated, use GpsPoints
     * @type {string}
     * @memberof ExperienceAreaLinked
     */
    AltitudeUnitofMeasure?: string | null;
    /**
     * 
     * @type {{ [key: string]: Detail; }}
     * @memberof ExperienceAreaLinked
     */
    Detail?: { [key: string]: Detail; } | null;
    /**
     * 
     * @type {{ [key: string]: ContactInfos; }}
     * @memberof ExperienceAreaLinked
     */
    ContactInfos?: { [key: string]: ContactInfos; } | null;
    /**
     * 
     * @type {Array<ImageGallery>}
     * @memberof ExperienceAreaLinked
     */
    ImageGallery?: Array<ImageGallery> | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof ExperienceAreaLinked
     */
    SmgTags?: Array<string> | null;
    /**
     * 
     * @type {boolean}
     * @memberof ExperienceAreaLinked
     */
    SmgActive?: boolean;
    /**
     * 
     * @type {Array<string>}
     * @memberof ExperienceAreaLinked
     */
    HasLanguage?: Array<string> | null;
    /**
     * 
     * @type {Date}
     * @memberof ExperienceAreaLinked
     */
    LastChange?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof ExperienceAreaLinked
     */
    FirstImport?: Date | null;
    /**
     * generated field
     * @type {{ [key: string]: GpsInfo; }}
     * @memberof ExperienceAreaLinked
     */
    GpsPoints?: { [key: string]: GpsInfo; } | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof ExperienceAreaLinked
     */
    PublishedOn?: Array<string> | null;
    /**
     * 
     * @type {string}
     * @memberof ExperienceAreaLinked
     */
    Source?: string | null;
    /**
     * 
     * @type {{ [key: string]: { [key: string]: string; }; }}
     * @memberof ExperienceAreaLinked
     */
    Mapping?: { [key: string]: { [key: string]: string; }; } | null;
    /**
     * 
     * @type {DistanceInfo}
     * @memberof ExperienceAreaLinked
     */
    DistanceInfo?: DistanceInfo;
}

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
import { AdditionalPoiInfos } from './additional-poi-infos';
import { AreaLink } from './area-link';
import { ContactInfos } from './contact-infos';
import { Detail } from './detail';
import { DistanceInfo } from './distance-info';
import { GpsInfo } from './gps-info';
import { GpsTrack } from './gps-track';
import { ImageGallery } from './image-gallery';
import { LTSTagsLinked } from './ltstags-linked';
import { LicenseInfo } from './license-info';
import { LocationInfoLinked } from './location-info-linked';
import { Metadata } from './metadata';
import { ODHActivityPoiTypesLink } from './odhactivity-poi-types-link';
import { ODHTags } from './odhtags';
import { OperationSchedule } from './operation-schedule';
import { Ratings } from './ratings';
import { Tags } from './tags';
import { VideoItems } from './video-items';
/**
 * 
 * @export
 * @interface LTSActivityLinked
 */
export interface LTSActivityLinked {
    /**
     * 
     * @type {Metadata}
     * @memberof LTSActivityLinked
     */
    Meta?: Metadata;
    /**
     * 
     * @type {string}
     * @memberof LTSActivityLinked
     */
    Self?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof LTSActivityLinked
     */
    OdhActive?: boolean;
    /**
     * 
     * @type {Array<ODHTags>}
     * @memberof LTSActivityLinked
     */
    ODHTags?: Array<ODHTags> | null;
    /**
     * 
     * @type {Array<ODHActivityPoiTypesLink>}
     * @memberof LTSActivityLinked
     */
    ActivityTypes?: Array<ODHActivityPoiTypesLink> | null;
    /**
     * 
     * @type {Array<AreaLink>}
     * @memberof LTSActivityLinked
     */
    Areas?: Array<AreaLink> | null;
    /**
     * 
     * @type {LocationInfoLinked}
     * @memberof LTSActivityLinked
     */
    LocationInfo?: LocationInfoLinked;
    /**
     * 
     * @type {Array<LTSTagsLinked>}
     * @memberof LTSActivityLinked
     */
    LTSTags?: Array<LTSTagsLinked> | null;
    /**
     * generated field
     * @type {{ [key: string]: GpsInfo; }}
     * @memberof LTSActivityLinked
     */
    GpsPoints?: { [key: string]: GpsInfo; } | null;
    /**
     * 
     * @type {LicenseInfo}
     * @memberof LTSActivityLinked
     */
    LicenseInfo?: LicenseInfo;
    /**
     * 
     * @type {string}
     * @memberof LTSActivityLinked
     */
    Id?: string | null;
    /**
     * 
     * @type {string}
     * @memberof LTSActivityLinked
     */
    OutdooractiveID?: string | null;
    /**
     * 
     * @type {string}
     * @memberof LTSActivityLinked
     */
    OutdooractiveElevationID?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof LTSActivityLinked
     */
    CopyrightChecked?: boolean | null;
    /**
     * 
     * @type {boolean}
     * @memberof LTSActivityLinked
     */
    Active?: boolean;
    /**
     * 
     * @type {string}
     * @memberof LTSActivityLinked
     */
    Shortname?: string | null;
    /**
     * 
     * @type {string}
     * @memberof LTSActivityLinked
     */
    SmgId?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof LTSActivityLinked
     */
    Highlight?: boolean | null;
    /**
     * Use Ratings.Difficulty
     * @type {string}
     * @memberof LTSActivityLinked
     */
    Difficulty?: string | null;
    /**
     * Use AdditionalPoiInfos.Categories instead
     * @type {string}
     * @memberof LTSActivityLinked
     */
    Type?: string | null;
    /**
     * Use AdditionalPoiInfos.Categories instead
     * @type {string}
     * @memberof LTSActivityLinked
     */
    SubType?: string | null;
    /**
     * Use AdditionalPoiInfos.Categories instead
     * @type {string}
     * @memberof LTSActivityLinked
     */
    PoiType?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof LTSActivityLinked
     */
    FirstImport?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof LTSActivityLinked
     */
    LastChange?: Date | null;
    /**
     * 
     * @type {boolean}
     * @memberof LTSActivityLinked
     */
    SmgActive?: boolean;
    /**
     * 
     * @type {string}
     * @memberof LTSActivityLinked
     */
    TourismorganizationId?: string | null;
    /**
     * Deprecated use AreaIds
     * @type {Array<string>}
     * @memberof LTSActivityLinked
     */
    AreaId?: Array<string> | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof LTSActivityLinked
     */
    AreaIds?: Array<string> | null;
    /**
     * 
     * @type {number}
     * @memberof LTSActivityLinked
     */
    AltitudeDifference?: number | null;
    /**
     * 
     * @type {number}
     * @memberof LTSActivityLinked
     */
    AltitudeHighestPoint?: number | null;
    /**
     * 
     * @type {number}
     * @memberof LTSActivityLinked
     */
    AltitudeLowestPoint?: number | null;
    /**
     * 
     * @type {number}
     * @memberof LTSActivityLinked
     */
    AltitudeSumUp?: number | null;
    /**
     * 
     * @type {number}
     * @memberof LTSActivityLinked
     */
    AltitudeSumDown?: number | null;
    /**
     * 
     * @type {number}
     * @memberof LTSActivityLinked
     */
    DistanceDuration?: number | null;
    /**
     * 
     * @type {number}
     * @memberof LTSActivityLinked
     */
    DistanceLength?: number | null;
    /**
     * 
     * @type {boolean}
     * @memberof LTSActivityLinked
     */
    IsOpen?: boolean | null;
    /**
     * 
     * @type {boolean}
     * @memberof LTSActivityLinked
     */
    IsPrepared?: boolean | null;
    /**
     * 
     * @type {boolean}
     * @memberof LTSActivityLinked
     */
    RunToValley?: boolean | null;
    /**
     * 
     * @type {boolean}
     * @memberof LTSActivityLinked
     */
    IsWithLigth?: boolean | null;
    /**
     * 
     * @type {boolean}
     * @memberof LTSActivityLinked
     */
    HasRentals?: boolean | null;
    /**
     * 
     * @type {boolean}
     * @memberof LTSActivityLinked
     */
    HasFreeEntrance?: boolean | null;
    /**
     * 
     * @type {boolean}
     * @memberof LTSActivityLinked
     */
    LiftAvailable?: boolean | null;
    /**
     * 
     * @type {boolean}
     * @memberof LTSActivityLinked
     */
    FeetClimb?: boolean | null;
    /**
     * 
     * @type {boolean}
     * @memberof LTSActivityLinked
     */
    BikeTransport?: boolean | null;
    /**
     * 
     * @type {Array<OperationSchedule>}
     * @memberof LTSActivityLinked
     */
    OperationSchedule?: Array<OperationSchedule> | null;
    /**
     * 
     * @type {Array<GpsInfo>}
     * @memberof LTSActivityLinked
     */
    GpsInfo?: Array<GpsInfo> | null;
    /**
     * 
     * @type {Array<GpsTrack>}
     * @memberof LTSActivityLinked
     */
    GpsTrack?: Array<GpsTrack> | null;
    /**
     * 
     * @type {Array<ImageGallery>}
     * @memberof LTSActivityLinked
     */
    ImageGallery?: Array<ImageGallery> | null;
    /**
     * 
     * @type {{ [key: string]: Detail; }}
     * @memberof LTSActivityLinked
     */
    Detail?: { [key: string]: Detail; } | null;
    /**
     * 
     * @type {{ [key: string]: ContactInfos; }}
     * @memberof LTSActivityLinked
     */
    ContactInfos?: { [key: string]: ContactInfos; } | null;
    /**
     * 
     * @type {{ [key: string]: AdditionalPoiInfos; }}
     * @memberof LTSActivityLinked
     */
    AdditionalPoiInfos?: { [key: string]: AdditionalPoiInfos; } | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof LTSActivityLinked
     */
    SmgTags?: Array<string> | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof LTSActivityLinked
     */
    HasLanguage?: Array<string> | null;
    /**
     * 
     * @type {Ratings}
     * @memberof LTSActivityLinked
     */
    Ratings?: Ratings;
    /**
     * 
     * @type {Array<string>}
     * @memberof LTSActivityLinked
     */
    Exposition?: Array<string> | null;
    /**
     * 
     * @type {string}
     * @memberof LTSActivityLinked
     */
    OwnerRid?: string | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof LTSActivityLinked
     */
    ChildPoiIds?: Array<string> | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof LTSActivityLinked
     */
    MasterPoiIds?: Array<string> | null;
    /**
     * 
     * @type {number}
     * @memberof LTSActivityLinked
     */
    WayNumber?: number | null;
    /**
     * 
     * @type {string}
     * @memberof LTSActivityLinked
     */
    Number?: string | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof LTSActivityLinked
     */
    PublishedOn?: Array<string> | null;
    /**
     * 
     * @type {string}
     * @memberof LTSActivityLinked
     */
    Source?: string | null;
    /**
     * 
     * @type {{ [key: string]: { [key: string]: string; }; }}
     * @memberof LTSActivityLinked
     */
    Mapping?: { [key: string]: { [key: string]: string; }; } | null;
    /**
     * 
     * @type {DistanceInfo}
     * @memberof LTSActivityLinked
     */
    DistanceInfo?: DistanceInfo;
    /**
     * 
     * @type {Array<Tags>}
     * @memberof LTSActivityLinked
     */
    Tags?: Array<Tags> | null;
    /**
     * 
     * @type {{ [key: string]: Array<VideoItems>; }}
     * @memberof LTSActivityLinked
     */
    VideoItems?: { [key: string]: Array<VideoItems>; } | null;
}
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
import { AgeRange } from './age-range';
import { Document } from './document';
import { DocumentPDF } from './document-pdf';
import { GpsInfo } from './gps-info';
import { ImageGallery } from './image-gallery';
import { LicenseInfo } from './license-info';
import { Metadata } from './metadata';
import { RoomBooked } from './room-booked';
/**
 * 
 * @export
 * @interface EventShortLinked
 */
export interface EventShortLinked {
    /**
     * 
     * @type {Metadata}
     * @memberof EventShortLinked
     */
    Meta?: Metadata;
    /**
     * 
     * @type {string}
     * @memberof EventShortLinked
     */
    Self?: string | null;
    /**
     * 
     * @type {LicenseInfo}
     * @memberof EventShortLinked
     */
    LicenseInfo?: LicenseInfo;
    /**
     * 
     * @type {string}
     * @memberof EventShortLinked
     */
    Id?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortLinked
     */
    Source?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortLinked
     */
    EventLocation?: EventShortLinkedEventLocationEnum;
    /**
     * 
     * @type {number}
     * @memberof EventShortLinked
     */
    EventId?: number;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof EventShortLinked
     */
    EventText?: { [key: string]: string; } | null;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof EventShortLinked
     */
    EventTitle?: { [key: string]: string; } | null;
    /**
     * Deprecated, use EventText
     * @type {string}
     * @memberof EventShortLinked
     */
    EventTextDE?: string | null;
    /**
     * Deprecated, use EventText
     * @type {string}
     * @memberof EventShortLinked
     */
    EventTextIT?: string | null;
    /**
     * Deprecated, use EventText
     * @type {string}
     * @memberof EventShortLinked
     */
    EventTextEN?: string | null;
    /**
     * Deprecated, use EventTitle
     * @type {string}
     * @memberof EventShortLinked
     */
    EventDescription?: string | null;
    /**
     * Deprecated, use EventTitle
     * @type {string}
     * @memberof EventShortLinked
     */
    EventDescriptionDE?: string | null;
    /**
     * Deprecated, use EventTitle
     * @type {string}
     * @memberof EventShortLinked
     */
    EventDescriptionIT?: string | null;
    /**
     * Deprecated, use EventTitle
     * @type {string}
     * @memberof EventShortLinked
     */
    EventDescriptionEN?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortLinked
     */
    AnchorVenue?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortLinked
     */
    AnchorVenueShort?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof EventShortLinked
     */
    ChangedOn?: Date;
    /**
     * 
     * @type {Date}
     * @memberof EventShortLinked
     */
    StartDate?: Date;
    /**
     * 
     * @type {Date}
     * @memberof EventShortLinked
     */
    EndDate?: Date;
    /**
     * 
     * @type {number}
     * @memberof EventShortLinked
     */
    StartDateUTC?: number;
    /**
     * 
     * @type {number}
     * @memberof EventShortLinked
     */
    EndDateUTC?: number;
    /**
     * 
     * @type {string}
     * @memberof EventShortLinked
     */
    WebAddress?: string | null;
    /**
     * Active
     * @type {string}
     * @memberof EventShortLinked
     */
    Display1?: EventShortLinkedDisplay1Enum;
    /**
     * Intranet Eurac
     * @type {string}
     * @memberof EventShortLinked
     */
    Display2?: EventShortLinkedDisplay2Enum;
    /**
     * Website Eurac
     * @type {string}
     * @memberof EventShortLinked
     */
    Display3?: EventShortLinkedDisplay3Enum;
    /**
     * Deprecated
     * @type {string}
     * @memberof EventShortLinked
     */
    Display4?: EventShortLinkedDisplay4Enum;
    /**
     * Deprecated
     * @type {string}
     * @memberof EventShortLinked
     */
    Display5?: EventShortLinkedDisplay5Enum;
    /**
     * Deprecated
     * @type {string}
     * @memberof EventShortLinked
     */
    Display6?: EventShortLinkedDisplay6Enum;
    /**
     * Deprecated
     * @type {string}
     * @memberof EventShortLinked
     */
    Display7?: EventShortLinkedDisplay7Enum;
    /**
     * Deprecated
     * @type {string}
     * @memberof EventShortLinked
     */
    Display8?: EventShortLinkedDisplay8Enum;
    /**
     * Deprecated
     * @type {string}
     * @memberof EventShortLinked
     */
    Display9?: EventShortLinkedDisplay9Enum;
    /**
     * 
     * @type {string}
     * @memberof EventShortLinked
     */
    CompanyName?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortLinked
     */
    CompanyId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortLinked
     */
    CompanyAddressLine1?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortLinked
     */
    CompanyAddressLine2?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortLinked
     */
    CompanyAddressLine3?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortLinked
     */
    CompanyPostalCode?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortLinked
     */
    CompanyCity?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortLinked
     */
    CompanyCountry?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortLinked
     */
    CompanyPhone?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortLinked
     */
    CompanyFax?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortLinked
     */
    CompanyMail?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortLinked
     */
    CompanyUrl?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortLinked
     */
    ContactCode?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortLinked
     */
    ContactFirstName?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortLinked
     */
    ContactLastName?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortLinked
     */
    ContactPhone?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortLinked
     */
    ContactCell?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortLinked
     */
    ContactFax?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortLinked
     */
    ContactEmail?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortLinked
     */
    ContactAddressLine1?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortLinked
     */
    ContactAddressLine2?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortLinked
     */
    ContactAddressLine3?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortLinked
     */
    ContactPostalCode?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortLinked
     */
    ContactCity?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortLinked
     */
    ContactCountry?: string | null;
    /**
     * 
     * @type {Array<RoomBooked>}
     * @memberof EventShortLinked
     */
    RoomBooked?: Array<RoomBooked> | null;
    /**
     * 
     * @type {Array<ImageGallery>}
     * @memberof EventShortLinked
     */
    ImageGallery?: Array<ImageGallery> | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortLinked
     */
    VideoUrl?: string | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof EventShortLinked
     */
    TechnologyFields?: Array<string> | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof EventShortLinked
     */
    CustomTagging?: Array<string> | null;
    /**
     * 
     * @type {Array<DocumentPDF>}
     * @memberof EventShortLinked
     */
    EventDocument?: Array<DocumentPDF> | null;
    /**
     * 
     * @type {{ [key: string]: Array<Document>; }}
     * @memberof EventShortLinked
     */
    Documents?: { [key: string]: Array<Document>; } | null;
    /**
     * 
     * @type {boolean}
     * @memberof EventShortLinked
     */
    ExternalOrganizer?: boolean | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortLinked
     */
    Shortname?: string | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof EventShortLinked
     */
    PublishedOn?: Array<string> | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortLinked
     */
    AnchorVenueRoomMapping?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof EventShortLinked
     */
    FirstImport?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof EventShortLinked
     */
    LastChange?: Date | null;
    /**
     * 
     * @type {boolean}
     * @memberof EventShortLinked
     */
    SoldOut?: boolean | null;
    /**
     *  ActiveToday Indicates if Event is shown on the today NOI Website
     * @type {boolean}
     * @memberof EventShortLinked
     */
    ActiveToday?: boolean | null;
    /**
     *  ActiveWeb Indicates if Event is shown on the Noi Website Section Events at NOI
     * @type {boolean}
     * @memberof EventShortLinked
     */
    ActiveWeb?: boolean | null;
    /**
     * ActiveCommunityApp Indicates if Event is shown on the Noi Community App
     * @type {boolean}
     * @memberof EventShortLinked
     */
    ActiveCommunityApp?: boolean | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof EventShortLinked
     */
    HasLanguage?: Array<string> | null;
    /**
     * 
     * @type {{ [key: string]: { [key: string]: string; }; }}
     * @memberof EventShortLinked
     */
    Mapping?: { [key: string]: { [key: string]: string; }; } | null;
    /**
     * 
     * @type {Array<GpsInfo>}
     * @memberof EventShortLinked
     */
    GpsInfo?: Array<GpsInfo> | null;
    /**
     * generated field
     * @type {{ [key: string]: GpsInfo; }}
     * @memberof EventShortLinked
     */
    GpsPoints?: { [key: string]: GpsInfo; } | null;
    /**
     * 
     * @type {AgeRange}
     * @memberof EventShortLinked
     */
    TypicalAgeRange?: AgeRange;
}

/**
    * @export
    * @enum {string}
    */
export enum EventShortLinkedEventLocationEnum {
    NOI = 'NOI',
    EC = 'EC'
}
/**
    * @export
    * @enum {string}
    */
export enum EventShortLinkedDisplay1Enum {
    Y = 'Y',
    N = 'N'
}
/**
    * @export
    * @enum {string}
    */
export enum EventShortLinkedDisplay2Enum {
    Y = 'Y',
    N = 'N'
}
/**
    * @export
    * @enum {string}
    */
export enum EventShortLinkedDisplay3Enum {
    Y = 'Y',
    N = 'N'
}
/**
    * @export
    * @enum {string}
    */
export enum EventShortLinkedDisplay4Enum {
    Y = 'Y',
    N = 'N'
}
/**
    * @export
    * @enum {string}
    */
export enum EventShortLinkedDisplay5Enum {
    Y = 'Y',
    N = 'N'
}
/**
    * @export
    * @enum {string}
    */
export enum EventShortLinkedDisplay6Enum {
    Y = 'Y',
    N = 'N'
}
/**
    * @export
    * @enum {string}
    */
export enum EventShortLinkedDisplay7Enum {
    Y = 'Y',
    N = 'N'
}
/**
    * @export
    * @enum {string}
    */
export enum EventShortLinkedDisplay8Enum {
    Y = 'Y',
    N = 'N'
}
/**
    * @export
    * @enum {string}
    */
export enum EventShortLinkedDisplay9Enum {
    Y = 'Y',
    N = 'N'
}


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
import { ImageGallery } from './image-gallery';
/**
 * 
 * @export
 * @interface EventShortByRoom
 */
export interface EventShortByRoom {
    /**
     * 
     * @type {Array<string>}
     * @memberof EventShortByRoom
     */
    SpaceDescList?: Array<string> | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortByRoom
     */
    SpaceDesc?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortByRoom
     */
    SpaceType?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortByRoom
     */
    Subtitle?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof EventShortByRoom
     */
    RoomStartDate?: Date;
    /**
     * 
     * @type {Date}
     * @memberof EventShortByRoom
     */
    RoomEndDate?: Date;
    /**
     * 
     * @type {number}
     * @memberof EventShortByRoom
     */
    RoomStartDateUTC?: number;
    /**
     * 
     * @type {number}
     * @memberof EventShortByRoom
     */
    RoomEndDateUTC?: number;
    /**
     * 
     * @type {number}
     * @memberof EventShortByRoom
     */
    EventId?: number;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof EventShortByRoom
     */
    EventTitle?: { [key: string]: string; } | null;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof EventShortByRoom
     */
    EventText?: { [key: string]: string; } | null;
    /**
     * Deprecated, use EventTitle
     * @type {{ [key: string]: string; }}
     * @memberof EventShortByRoom
     */
    EventDescription?: { [key: string]: string; } | null;
    /**
     * Deprecated, use EventTitle
     * @type {string}
     * @memberof EventShortByRoom
     */
    EventDescriptionDE?: string | null;
    /**
     * Deprecated, use EventTitle
     * @type {string}
     * @memberof EventShortByRoom
     */
    EventDescriptionIT?: string | null;
    /**
     * Deprecated, use EventTitle
     * @type {string}
     * @memberof EventShortByRoom
     */
    EventDescriptionEN?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortByRoom
     */
    EventAnchorVenue?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortByRoom
     */
    EventAnchorVenueShort?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof EventShortByRoom
     */
    EventStartDate?: Date;
    /**
     * 
     * @type {Date}
     * @memberof EventShortByRoom
     */
    EventEndDate?: Date;
    /**
     * 
     * @type {number}
     * @memberof EventShortByRoom
     */
    EventStartDateUTC?: number;
    /**
     * 
     * @type {number}
     * @memberof EventShortByRoom
     */
    EventEndDateUTC?: number;
    /**
     * 
     * @type {string}
     * @memberof EventShortByRoom
     */
    EventWebAddress?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortByRoom
     */
    Id?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortByRoom
     */
    EventSource?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortByRoom
     */
    EventLocation?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortByRoom
     */
    CompanyName?: string | null;
    /**
     * 
     * @type {Array<ImageGallery>}
     * @memberof EventShortByRoom
     */
    ImageGallery?: Array<ImageGallery> | null;
    /**
     * 
     * @type {string}
     * @memberof EventShortByRoom
     */
    VideoUrl?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof EventShortByRoom
     */
    ActiveWeb?: boolean | null;
    /**
     * Deprecated, use EventText
     * @type {string}
     * @memberof EventShortByRoom
     */
    EventTextDE?: string | null;
    /**
     * Deprecated, use EventText
     * @type {string}
     * @memberof EventShortByRoom
     */
    EventTextIT?: string | null;
    /**
     * Deprecated, use EventText
     * @type {string}
     * @memberof EventShortByRoom
     */
    EventTextEN?: string | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof EventShortByRoom
     */
    TechnologyFields?: Array<string> | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof EventShortByRoom
     */
    CustomTagging?: Array<string> | null;
    /**
     * 
     * @type {boolean}
     * @memberof EventShortByRoom
     */
    SoldOut?: boolean | null;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof EventShortByRoom
     */
    EventDocument?: { [key: string]: string; } | null;
    /**
     * 
     * @type {boolean}
     * @memberof EventShortByRoom
     */
    ExternalOrganizer?: boolean | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof EventShortByRoom
     */
    PublishedOn?: Array<string> | null;
}

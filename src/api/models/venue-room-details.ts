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
import { Detail } from './detail';
import { ImageGallery } from './image-gallery';
import { VenueSetup } from './venue-setup';
import { VenueType } from './venue-type';
/**
 * 
 * @export
 * @interface VenueRoomDetails
 */
export interface VenueRoomDetails {
    /**
     * 
     * @type {string}
     * @memberof VenueRoomDetails
     */
    Id?: string | null;
    /**
     * 
     * @type {string}
     * @memberof VenueRoomDetails
     */
    Shortname?: string | null;
    /**
     * 
     * @type {number}
     * @memberof VenueRoomDetails
     */
    SquareMeters?: number | null;
    /**
     * 
     * @type {boolean}
     * @memberof VenueRoomDetails
     */
    Indoor?: boolean | null;
    /**
     * 
     * @type {Array<VenueType>}
     * @memberof VenueRoomDetails
     */
    VenueFeatures?: Array<VenueType> | null;
    /**
     * 
     * @type {Array<VenueSetup>}
     * @memberof VenueRoomDetails
     */
    VenueSetup?: Array<VenueSetup> | null;
    /**
     * 
     * @type {{ [key: string]: Detail; }}
     * @memberof VenueRoomDetails
     */
    Detail?: { [key: string]: Detail; } | null;
    /**
     * 
     * @type {Array<ImageGallery>}
     * @memberof VenueRoomDetails
     */
    ImageGallery?: Array<ImageGallery> | null;
}
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
import { CancelPolicy } from './cancel-policy';
import { PaymentTerm } from './payment-term';
import { RoomPictures } from './room-pictures';
/**
 * 
 * @export
 * @interface RoomDetails
 */
export interface RoomDetails {
    /**
     * 
     * @type {string}
     * @memberof RoomDetails
     */
    RoomId?: string | null;
    /**
     * 
     * @type {number}
     * @memberof RoomDetails
     */
    RoomSeq?: number | null;
    /**
     * 
     * @type {number}
     * @memberof RoomDetails
     */
    TotalPrice?: number;
    /**
     * 
     * @type {string}
     * @memberof RoomDetails
     */
    OfferId?: string | null;
    /**
     * 
     * @type {number}
     * @memberof RoomDetails
     */
    PriceWs?: number | null;
    /**
     * 
     * @type {number}
     * @memberof RoomDetails
     */
    PriceBb?: number | null;
    /**
     * 
     * @type {number}
     * @memberof RoomDetails
     */
    PriceHb?: number | null;
    /**
     * 
     * @type {number}
     * @memberof RoomDetails
     */
    PriceFb?: number | null;
    /**
     * 
     * @type {number}
     * @memberof RoomDetails
     */
    PriceAi?: number | null;
    /**
     * 
     * @type {number}
     * @memberof RoomDetails
     */
    Roomtype?: number | null;
    /**
     * 
     * @type {number}
     * @memberof RoomDetails
     */
    Roomfree?: number | null;
    /**
     * 
     * @type {number}
     * @memberof RoomDetails
     */
    Roommax?: number | null;
    /**
     * 
     * @type {number}
     * @memberof RoomDetails
     */
    Roommin?: number | null;
    /**
     * 
     * @type {number}
     * @memberof RoomDetails
     */
    Roomstd?: number | null;
    /**
     * 
     * @type {string}
     * @memberof RoomDetails
     */
    Roomtitle?: string | null;
    /**
     * 
     * @type {string}
     * @memberof RoomDetails
     */
    Roomdesc?: string | null;
    /**
     * 
     * @type {string}
     * @memberof RoomDetails
     */
    RoomChannelLink?: string | null;
    /**
     * 
     * @type {string}
     * @memberof RoomDetails
     */
    TotalPriceString?: string | null;
    /**
     * 
     * @type {Array<RoomPictures>}
     * @memberof RoomDetails
     */
    RoomPictures?: Array<RoomPictures> | null;
    /**
     * 
     * @type {PaymentTerm}
     * @memberof RoomDetails
     */
    PaymentTerm?: PaymentTerm;
    /**
     * 
     * @type {CancelPolicy}
     * @memberof RoomDetails
     */
    CancelPolicy?: CancelPolicy;
}

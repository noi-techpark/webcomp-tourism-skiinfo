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
import { CheapestRoomCombination } from './cheapest-room-combination';
import { RoomDetails } from './room-details';
/**
 * 
 * @export
 * @interface MssResponseShort
 */
export interface MssResponseShort {
    /**
     * 
     * @type {number}
     * @memberof MssResponseShort
     */
    HotelId?: number;
    /**
     * 
     * @type {string}
     * @memberof MssResponseShort
     */
    A0RID?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof MssResponseShort
     */
    Bookable?: boolean;
    /**
     * 
     * @type {string}
     * @memberof MssResponseShort
     */
    ChannelID?: string | null;
    /**
     * 
     * @type {string}
     * @memberof MssResponseShort
     */
    Channellink?: string | null;
    /**
     * 
     * @type {string}
     * @memberof MssResponseShort
     */
    OfferId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof MssResponseShort
     */
    OfferGid?: string | null;
    /**
     * 
     * @type {number}
     * @memberof MssResponseShort
     */
    OfferTyp?: number | null;
    /**
     * 
     * @type {number}
     * @memberof MssResponseShort
     */
    OfferShow?: number | null;
    /**
     * 
     * @type {number}
     * @memberof MssResponseShort
     */
    CheapestOffer?: number;
    /**
     * 
     * @type {string}
     * @memberof MssResponseShort
     */
    CheapestOfferString?: string | null;
    /**
     * 
     * @type {string}
     * @memberof MssResponseShort
     */
    OnlinepaymentMethods?: string | null;
    /**
     * 
     * @type {string}
     * @memberof MssResponseShort
     */
    OnlinepaymentPrepayment?: string | null;
    /**
     * 
     * @type {string}
     * @memberof MssResponseShort
     */
    OnlinepaymentCCards?: string | null;
    /**
     * 
     * @type {number}
     * @memberof MssResponseShort
     */
    CheapestOfferWs?: number | null;
    /**
     * 
     * @type {number}
     * @memberof MssResponseShort
     */
    CheapestOfferBb?: number | null;
    /**
     * 
     * @type {number}
     * @memberof MssResponseShort
     */
    CheapestOfferHb?: number | null;
    /**
     * 
     * @type {number}
     * @memberof MssResponseShort
     */
    CheapestOfferFb?: number | null;
    /**
     * 
     * @type {number}
     * @memberof MssResponseShort
     */
    CheapestOfferAi?: number | null;
    /**
     * 
     * @type {Array<RoomDetails>}
     * @memberof MssResponseShort
     */
    RoomDetails?: Array<RoomDetails> | null;
    /**
     * 
     * @type {Array<CheapestRoomCombination>}
     * @memberof MssResponseShort
     */
    CheapestOfferDetail?: Array<CheapestRoomCombination> | null;
}

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
/**
 * 
 * @export
 * @interface RoomBooked
 */
export interface RoomBooked {
    /**
     * 
     * @type {string}
     * @memberof RoomBooked
     */
    Space?: string | null;
    /**
     * 
     * @type {string}
     * @memberof RoomBooked
     */
    SpaceDesc?: string | null;
    /**
     * 
     * @type {string}
     * @memberof RoomBooked
     */
    SpaceAbbrev?: string | null;
    /**
     * 
     * @type {string}
     * @memberof RoomBooked
     */
    SpaceType?: string | null;
    /**
     * 
     * @type {string}
     * @memberof RoomBooked
     */
    Subtitle?: string | null;
    /**
     * 
     * @type {string}
     * @memberof RoomBooked
     */
    Comment?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof RoomBooked
     */
    StartDate?: Date;
    /**
     * 
     * @type {Date}
     * @memberof RoomBooked
     */
    EndDate?: Date;
    /**
     * 
     * @type {number}
     * @memberof RoomBooked
     */
    StartDateUTC?: number;
    /**
     * 
     * @type {number}
     * @memberof RoomBooked
     */
    EndDateUTC?: number;
    /**
     * 
     * @type {string}
     * @memberof RoomBooked
     */
    SpaceDescRoomMapping?: string | null;
}

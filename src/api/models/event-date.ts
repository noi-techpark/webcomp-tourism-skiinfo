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
import { EventDateAdditionalInfo } from './event-date-additional-info';
import { EventDateAdditionalTime } from './event-date-additional-time';
import { EventDateCalculatedDay } from './event-date-calculated-day';
/**
 * 
 * @export
 * @interface EventDate
 */
export interface EventDate {
    /**
     * 
     * @type {Date}
     * @memberof EventDate
     */
    From?: Date;
    /**
     * 
     * @type {Date}
     * @memberof EventDate
     */
    To?: Date;
    /**
     * 
     * @type {boolean}
     * @memberof EventDate
     */
    SingleDays?: boolean | null;
    /**
     * 
     * @type {number}
     * @memberof EventDate
     */
    MinPersons?: number | null;
    /**
     * 
     * @type {number}
     * @memberof EventDate
     */
    MaxPersons?: number | null;
    /**
     * 
     * @type {boolean}
     * @memberof EventDate
     */
    Ticket?: boolean | null;
    /**
     * 
     * @type {number}
     * @memberof EventDate
     */
    GpsNorth?: number | null;
    /**
     * 
     * @type {number}
     * @memberof EventDate
     */
    GpsEast?: number | null;
    /**
     * 
     * @type {string}
     * @memberof EventDate
     */
    Begin?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventDate
     */
    End?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventDate
     */
    Entrance?: string | null;
    /**
     * 
     * @type {number}
     * @memberof EventDate
     */
    InscriptionTill?: number | null;
    /**
     * 
     * @type {boolean}
     * @memberof EventDate
     */
    Active?: boolean | null;
    /**
     * 
     * @type {string}
     * @memberof EventDate
     */
    DayRID?: string | null;
    /**
     * 
     * @type {{ [key: string]: EventDateAdditionalInfo; }}
     * @memberof EventDate
     */
    EventDateAdditionalInfo?: { [key: string]: EventDateAdditionalInfo; } | null;
    /**
     * 
     * @type {Array<EventDateAdditionalTime>}
     * @memberof EventDate
     */
    EventDateAdditionalTime?: Array<EventDateAdditionalTime> | null;
    /**
     * 
     * @type {EventDateCalculatedDay}
     * @memberof EventDate
     */
    EventCalculatedDay?: EventDateCalculatedDay;
    /**
     * 
     * @type {string}
     * @memberof EventDate
     */
    PriceFrom?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EventDate
     */
    Cancelled?: string | null;
}
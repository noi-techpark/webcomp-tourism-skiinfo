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
 * @interface OperationScheduleTime
 */
export interface OperationScheduleTime {
    /**
     * 
     * @type {string}
     * @memberof OperationScheduleTime
     */
    Start?: string;
    /**
     * 
     * @type {string}
     * @memberof OperationScheduleTime
     */
    End?: string;
    /**
     * 
     * @type {boolean}
     * @memberof OperationScheduleTime
     */
    Monday?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof OperationScheduleTime
     */
    Tuesday?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof OperationScheduleTime
     */
    Wednesday?: boolean;
    /**
     * Will be removed within 2023-12-31
     * @type {boolean}
     * @memberof OperationScheduleTime
     */
    Thuresday?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof OperationScheduleTime
     */
    Thursday?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof OperationScheduleTime
     */
    Friday?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof OperationScheduleTime
     */
    Saturday?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof OperationScheduleTime
     */
    Sunday?: boolean;
    /**
     * 
     * @type {number}
     * @memberof OperationScheduleTime
     */
    State?: number;
    /**
     * 
     * @type {number}
     * @memberof OperationScheduleTime
     */
    Timecode?: number;
}

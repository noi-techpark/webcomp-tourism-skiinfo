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
 * @interface Mountain
 */
export interface Mountain {
    /**
     * 
     * @type {Date}
     * @memberof Mountain
     */
    date?: Date;
    /**
     * 
     * @type {string}
     * @memberof Mountain
     */
    title?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Mountain
     */
    conditions?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Mountain
     */
    weatherdesc?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Mountain
     */
    zerolimit?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Mountain
     */
    mountainImgurl?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Mountain
     */
    reliability?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Mountain
     */
    sunrise?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Mountain
     */
    sunset?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Mountain
     */
    moonrise?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Mountain
     */
    moonset?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Mountain
     */
    northcode?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Mountain
     */
    northdesc?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Mountain
     */
    northimgurl?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Mountain
     */
    southcode?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Mountain
     */
    southdesc?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Mountain
     */
    southimgurl?: string | null;
    /**
     * 
     * @type {number}
     * @memberof Mountain
     */
    temp1000?: number;
    /**
     * 
     * @type {number}
     * @memberof Mountain
     */
    temp2000?: number;
    /**
     * 
     * @type {number}
     * @memberof Mountain
     */
    temp3000?: number;
    /**
     * 
     * @type {number}
     * @memberof Mountain
     */
    temp4000?: number;
    /**
     * 
     * @type {string}
     * @memberof Mountain
     */
    windcode?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Mountain
     */
    winddesc?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Mountain
     */
    windImgurl?: string | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof Mountain
     */
    snowlimit?: Array<string> | null;
}

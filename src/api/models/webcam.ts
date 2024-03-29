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
import { GpsInfo } from './gps-info';
/**
 * 
 * @export
 * @interface Webcam
 */
export interface Webcam {
    /**
     * 
     * @type {string}
     * @memberof Webcam
     */
    WebcamId?: string | null;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof Webcam
     */
    Webcamname?: { [key: string]: string; } | null;
    /**
     * 
     * @type {string}
     * @memberof Webcam
     */
    Webcamurl?: string | null;
    /**
     * 
     * @type {GpsInfo}
     * @memberof Webcam
     */
    GpsInfo?: GpsInfo;
    /**
     * 
     * @type {number}
     * @memberof Webcam
     */
    ListPosition?: number | null;
    /**
     * 
     * @type {string}
     * @memberof Webcam
     */
    Streamurl?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Webcam
     */
    Previewurl?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Webcam
     */
    Source?: string | null;
}

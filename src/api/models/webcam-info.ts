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
import { LicenseInfo } from './license-info';
import { PublishedonObject } from './publishedon-object';
/**
 * 
 * @export
 * @interface WebcamInfo
 */
export interface WebcamInfo {
    /**
     * 
     * @type {LicenseInfo}
     * @memberof WebcamInfo
     */
    licenseInfo?: LicenseInfo;
    /**
     * 
     * @type {string}
     * @memberof WebcamInfo
     */
    id?: string | null;
    /**
     * 
     * @type {string}
     * @memberof WebcamInfo
     */
    streamurl?: string | null;
    /**
     * 
     * @type {string}
     * @memberof WebcamInfo
     */
    previewurl?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof WebcamInfo
     */
    lastChange?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof WebcamInfo
     */
    firstImport?: Date | null;
    /**
     * 
     * @type {string}
     * @memberof WebcamInfo
     */
    shortname?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof WebcamInfo
     */
    active?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof WebcamInfo
     */
    smgActive?: boolean;
    /**
     * 
     * @type {string}
     * @memberof WebcamInfo
     */
    source?: string | null;
    /**
     * 
     * @type {Array<PublishedonObject>}
     * @memberof WebcamInfo
     */
    webcamAssignedOn?: Array<PublishedonObject> | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof WebcamInfo
     */
    areaIds?: Array<string> | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof WebcamInfo
     */
    smgTags?: Array<string> | null;
    /**
     * generated field
     * @type {{ [key: string]: GpsInfo; }}
     * @memberof WebcamInfo
     */
    gpsPoints?: { [key: string]: GpsInfo; } | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof WebcamInfo
     */
    publishedOn?: Array<string> | null;
    /**
     * 
     * @type {{ [key: string]: { [key: string]: string; }; }}
     * @memberof WebcamInfo
     */
    mapping?: { [key: string]: { [key: string]: string; }; } | null;
    /**
     * 
     * @type {Array<GpsInfo>}
     * @memberof WebcamInfo
     */
    gpsInfos?: Array<GpsInfo> | null;
    /**
     * 
     * @type {string}
     * @memberof WebcamInfo
     */
    webcamId?: string | null;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof WebcamInfo
     */
    webcamname?: { [key: string]: string; } | null;
    /**
     * 
     * @type {string}
     * @memberof WebcamInfo
     */
    webcamurl?: string | null;
    /**
     * 
     * @type {GpsInfo}
     * @memberof WebcamInfo
     */
    gpsInfo?: GpsInfo;
    /**
     * 
     * @type {number}
     * @memberof WebcamInfo
     */
    listPosition?: number | null;
}

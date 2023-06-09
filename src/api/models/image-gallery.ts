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
 * @interface ImageGallery
 */
export interface ImageGallery {
    /**
     * 
     * @type {string}
     * @memberof ImageGallery
     */
    imageName?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ImageGallery
     */
    imageUrl?: string | null;
    /**
     * 
     * @type {number}
     * @memberof ImageGallery
     */
    width?: number | null;
    /**
     * 
     * @type {number}
     * @memberof ImageGallery
     */
    height?: number | null;
    /**
     * 
     * @type {string}
     * @memberof ImageGallery
     */
    imageSource?: string | null;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof ImageGallery
     */
    imageTitle?: { [key: string]: string; } | null;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof ImageGallery
     */
    imageDesc?: { [key: string]: string; } | null;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof ImageGallery
     */
    imageAltText?: { [key: string]: string; } | null;
    /**
     * 
     * @type {boolean}
     * @memberof ImageGallery
     */
    isInGallery?: boolean | null;
    /**
     * 
     * @type {number}
     * @memberof ImageGallery
     */
    listPosition?: number | null;
    /**
     * 
     * @type {Date}
     * @memberof ImageGallery
     */
    validFrom?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof ImageGallery
     */
    validTo?: Date | null;
    /**
     * 
     * @type {string}
     * @memberof ImageGallery
     */
    copyRight?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ImageGallery
     */
    license?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ImageGallery
     */
    licenseHolder?: string | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof ImageGallery
     */
    imageTags?: Array<string> | null;
}

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
import { IndependentDescription } from './independent-description';
/**
 * 
 * @export
 * @interface IndependentData
 */
export interface IndependentData {
    /**
     * 
     * @type {{ [key: string]: IndependentDescription; }}
     * @memberof IndependentData
     */
    IndependentDescription?: { [key: string]: IndependentDescription; } | null;
    /**
     * 
     * @type {number}
     * @memberof IndependentData
     */
    IndependentRating?: number | null;
    /**
     * 
     * @type {boolean}
     * @memberof IndependentData
     */
    Enabled?: boolean | null;
}

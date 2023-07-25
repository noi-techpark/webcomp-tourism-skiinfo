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
import globalAxios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { ODHTagLinked } from '../models';
/**
 * ODHTagApi - axios parameter creator
 * @export
 */
export const ODHTagApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary GET ODHTag Single
         * @param {string} id ID of the Odhtags
         * @param {string} [language] Language field selector, displays data and fields available in the selected language (default:&#x27;null&#x27; all languages are displayed)
         * @param {Array<string>} [fields] Select fields to display, More fields are indicated by separator &#x27;,&#x27; example fields&#x3D;Id,Active,Shortname (default:&#x27;null&#x27; all fields are displayed). &lt;a href&#x3D;\&quot;https://github.com/noi-techpark/odh-docs/wiki/Common-parameters%2C-fields%2C-language%2C-searchfilter%2C-removenullvalues%2C-updatefrom#fields\&quot; target&#x3D;\&quot;_blank\&quot;&gt;Wiki fields&lt;/a&gt;
         * @param {string} [localizationlanguage] 
         * @param {boolean} [removenullvalues] Remove all Null values from json output. Useful for reducing json size. By default set to false. Documentation on &lt;a href&#x3D;\&quot;https://github.com/noi-techpark/odh-docs/wiki/Common-parameters,-fields,-language,-searchfilter,-removenullvalues,-updatefrom#removenullvalues\&quot; target&#x3D;\&quot;_blank\&quot;&gt;Opendatahub Wiki&lt;/a&gt;
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        singleODHTag: async (id: string, language?: string, fields?: Array<string>, localizationlanguage?: string, removenullvalues?: boolean, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling singleODHTag.');
            }
            const localVarPath = `/v1/ODHTag/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication oauth2 required
            // oauth required
            if (configuration && configuration.accessToken) {
                const localVarAccessTokenValue = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken("oauth2", [])
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + localVarAccessTokenValue;
            }

            if (language !== undefined) {
                localVarQueryParameter['language'] = language;
            }

            if (fields) {
                localVarQueryParameter['fields'] = fields;
            }

            if (localizationlanguage !== undefined) {
                localVarQueryParameter['localizationlanguage'] = localizationlanguage;
            }

            if (removenullvalues !== undefined) {
                localVarQueryParameter['removenullvalues'] = removenullvalues;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary GET ODHTag List
         * @param {number} [pagenumber] 
         * @param {number} [pagesize] 
         * @param {string} [language] Language field selector, displays data and fields available in the selected language (default:&#x27;null&#x27; all languages are displayed)
         * @param {string} [validforentity] Filter on Tags valid on Entities (accommodation, activity, poi, odhactivitypoi, package, gastronomy, event, article, common .. etc..)
         * @param {string} [mainentity] Filter on Tags with MainEntity set to (accommodation, activity, poi, odhactivitypoi, package, gastronomy, event, article, common .. etc..)
         * @param {boolean} [displayascategory] true &#x3D; returns only Tags which are marked as DisplayAsCategory true
         * @param {string} [source] Source Filter (possible Values: &#x27;lts&#x27;,&#x27;idm&#x27;), (default:&#x27;null&#x27;)
         * @param {string} [publishedon] Published On Filter (Separator &#x27;,&#x27; List of publisher IDs), (default:&#x27;null&#x27;)
         * @param {Array<string>} [fields] Select fields to display, More fields are indicated by separator &#x27;,&#x27; example fields&#x3D;Id,Active,Shortname (default:&#x27;null&#x27; all fields are displayed). &lt;a href&#x3D;\&quot;https://github.com/noi-techpark/odh-docs/wiki/Common-parameters%2C-fields%2C-language%2C-searchfilter%2C-removenullvalues%2C-updatefrom#fields\&quot; target&#x3D;\&quot;_blank\&quot;&gt;Wiki fields&lt;/a&gt;
         * @param {string} [searchfilter] String to search for, Title in all languages are searched, (default: null) &lt;a href&#x3D;\&quot;https://github.com/noi-techpark/odh-docs/wiki/Common-parameters%2C-fields%2C-language%2C-searchfilter%2C-removenullvalues%2C-updatefrom#searchfilter\&quot; target&#x3D;\&quot;_blank\&quot;&gt;Wiki searchfilter&lt;/a&gt;
         * @param {string} [rawfilter] &lt;a href&#x3D;\&quot;https://github.com/noi-techpark/odh-docs/wiki/Using-rawfilter-and-rawsort-on-the-Tourism-Api#rawfilter\&quot; target&#x3D;\&quot;_blank\&quot;&gt;Wiki rawfilter&lt;/a&gt;
         * @param {string} [rawsort] &lt;a href&#x3D;\&quot;https://github.com/noi-techpark/odh-docs/wiki/Using-rawfilter-and-rawsort-on-the-Tourism-Api#rawsort\&quot; target&#x3D;\&quot;_blank\&quot;&gt;Wiki rawsort&lt;/a&gt;
         * @param {string} [localizationlanguage] here for Compatibility Reasons, replaced by language parameter
         * @param {boolean} [removenullvalues] Remove all Null values from json output. Useful for reducing json size. By default set to false. Documentation on &lt;a href&#x3D;\&quot;https://github.com/noi-techpark/odh-docs/wiki/Common-parameters,-fields,-language,-searchfilter,-removenullvalues,-updatefrom#removenullvalues\&quot; target&#x3D;\&quot;_blank\&quot;&gt;Opendatahub Wiki&lt;/a&gt;
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        v1ODHTagGet: async (pagenumber?: number, pagesize?: number, language?: string, validforentity?: string, mainentity?: string, displayascategory?: boolean, source?: string, publishedon?: string, fields?: Array<string>, searchfilter?: string, rawfilter?: string, rawsort?: string, localizationlanguage?: string, removenullvalues?: boolean, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/v1/ODHTag`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication oauth2 required
            // oauth required
            if (configuration && configuration.accessToken) {
                const localVarAccessTokenValue = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken("oauth2", [])
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + localVarAccessTokenValue;
            }

            if (pagenumber !== undefined) {
                localVarQueryParameter['pagenumber'] = pagenumber;
            }

            if (pagesize !== undefined) {
                localVarQueryParameter['pagesize'] = pagesize;
            }

            if (language !== undefined) {
                localVarQueryParameter['language'] = language;
            }

            if (validforentity !== undefined) {
                localVarQueryParameter['validforentity'] = validforentity;
            }

            if (mainentity !== undefined) {
                localVarQueryParameter['mainentity'] = mainentity;
            }

            if (displayascategory !== undefined) {
                localVarQueryParameter['displayascategory'] = displayascategory;
            }

            if (source !== undefined) {
                localVarQueryParameter['source'] = source;
            }

            if (publishedon !== undefined) {
                localVarQueryParameter['publishedon'] = publishedon;
            }

            if (fields) {
                localVarQueryParameter['fields'] = fields;
            }

            if (searchfilter !== undefined) {
                localVarQueryParameter['searchfilter'] = searchfilter;
            }

            if (rawfilter !== undefined) {
                localVarQueryParameter['rawfilter'] = rawfilter;
            }

            if (rawsort !== undefined) {
                localVarQueryParameter['rawsort'] = rawsort;
            }

            if (localizationlanguage !== undefined) {
                localVarQueryParameter['localizationlanguage'] = localizationlanguage;
            }

            if (removenullvalues !== undefined) {
                localVarQueryParameter['removenullvalues'] = removenullvalues;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ODHTagApi - functional programming interface
 * @export
 */
export const ODHTagApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary GET ODHTag Single
         * @param {string} id ID of the Odhtags
         * @param {string} [language] Language field selector, displays data and fields available in the selected language (default:&#x27;null&#x27; all languages are displayed)
         * @param {Array<string>} [fields] Select fields to display, More fields are indicated by separator &#x27;,&#x27; example fields&#x3D;Id,Active,Shortname (default:&#x27;null&#x27; all fields are displayed). &lt;a href&#x3D;\&quot;https://github.com/noi-techpark/odh-docs/wiki/Common-parameters%2C-fields%2C-language%2C-searchfilter%2C-removenullvalues%2C-updatefrom#fields\&quot; target&#x3D;\&quot;_blank\&quot;&gt;Wiki fields&lt;/a&gt;
         * @param {string} [localizationlanguage] 
         * @param {boolean} [removenullvalues] Remove all Null values from json output. Useful for reducing json size. By default set to false. Documentation on &lt;a href&#x3D;\&quot;https://github.com/noi-techpark/odh-docs/wiki/Common-parameters,-fields,-language,-searchfilter,-removenullvalues,-updatefrom#removenullvalues\&quot; target&#x3D;\&quot;_blank\&quot;&gt;Opendatahub Wiki&lt;/a&gt;
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async singleODHTag(id: string, language?: string, fields?: Array<string>, localizationlanguage?: string, removenullvalues?: boolean, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<ODHTagLinked>>> {
            const localVarAxiosArgs = await ODHTagApiAxiosParamCreator(configuration).singleODHTag(id, language, fields, localizationlanguage, removenullvalues, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary GET ODHTag List
         * @param {number} [pagenumber] 
         * @param {number} [pagesize] 
         * @param {string} [language] Language field selector, displays data and fields available in the selected language (default:&#x27;null&#x27; all languages are displayed)
         * @param {string} [validforentity] Filter on Tags valid on Entities (accommodation, activity, poi, odhactivitypoi, package, gastronomy, event, article, common .. etc..)
         * @param {string} [mainentity] Filter on Tags with MainEntity set to (accommodation, activity, poi, odhactivitypoi, package, gastronomy, event, article, common .. etc..)
         * @param {boolean} [displayascategory] true &#x3D; returns only Tags which are marked as DisplayAsCategory true
         * @param {string} [source] Source Filter (possible Values: &#x27;lts&#x27;,&#x27;idm&#x27;), (default:&#x27;null&#x27;)
         * @param {string} [publishedon] Published On Filter (Separator &#x27;,&#x27; List of publisher IDs), (default:&#x27;null&#x27;)
         * @param {Array<string>} [fields] Select fields to display, More fields are indicated by separator &#x27;,&#x27; example fields&#x3D;Id,Active,Shortname (default:&#x27;null&#x27; all fields are displayed). &lt;a href&#x3D;\&quot;https://github.com/noi-techpark/odh-docs/wiki/Common-parameters%2C-fields%2C-language%2C-searchfilter%2C-removenullvalues%2C-updatefrom#fields\&quot; target&#x3D;\&quot;_blank\&quot;&gt;Wiki fields&lt;/a&gt;
         * @param {string} [searchfilter] String to search for, Title in all languages are searched, (default: null) &lt;a href&#x3D;\&quot;https://github.com/noi-techpark/odh-docs/wiki/Common-parameters%2C-fields%2C-language%2C-searchfilter%2C-removenullvalues%2C-updatefrom#searchfilter\&quot; target&#x3D;\&quot;_blank\&quot;&gt;Wiki searchfilter&lt;/a&gt;
         * @param {string} [rawfilter] &lt;a href&#x3D;\&quot;https://github.com/noi-techpark/odh-docs/wiki/Using-rawfilter-and-rawsort-on-the-Tourism-Api#rawfilter\&quot; target&#x3D;\&quot;_blank\&quot;&gt;Wiki rawfilter&lt;/a&gt;
         * @param {string} [rawsort] &lt;a href&#x3D;\&quot;https://github.com/noi-techpark/odh-docs/wiki/Using-rawfilter-and-rawsort-on-the-Tourism-Api#rawsort\&quot; target&#x3D;\&quot;_blank\&quot;&gt;Wiki rawsort&lt;/a&gt;
         * @param {string} [localizationlanguage] here for Compatibility Reasons, replaced by language parameter
         * @param {boolean} [removenullvalues] Remove all Null values from json output. Useful for reducing json size. By default set to false. Documentation on &lt;a href&#x3D;\&quot;https://github.com/noi-techpark/odh-docs/wiki/Common-parameters,-fields,-language,-searchfilter,-removenullvalues,-updatefrom#removenullvalues\&quot; target&#x3D;\&quot;_blank\&quot;&gt;Opendatahub Wiki&lt;/a&gt;
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async v1ODHTagGet(pagenumber?: number, pagesize?: number, language?: string, validforentity?: string, mainentity?: string, displayascategory?: boolean, source?: string, publishedon?: string, fields?: Array<string>, searchfilter?: string, rawfilter?: string, rawsort?: string, localizationlanguage?: string, removenullvalues?: boolean, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<Array<ODHTagLinked>>>> {
            const localVarAxiosArgs = await ODHTagApiAxiosParamCreator(configuration).v1ODHTagGet(pagenumber, pagesize, language, validforentity, mainentity, displayascategory, source, publishedon, fields, searchfilter, rawfilter, rawsort, localizationlanguage, removenullvalues, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * ODHTagApi - factory interface
 * @export
 */
export const ODHTagApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary GET ODHTag Single
         * @param {string} id ID of the Odhtags
         * @param {string} [language] Language field selector, displays data and fields available in the selected language (default:&#x27;null&#x27; all languages are displayed)
         * @param {Array<string>} [fields] Select fields to display, More fields are indicated by separator &#x27;,&#x27; example fields&#x3D;Id,Active,Shortname (default:&#x27;null&#x27; all fields are displayed). &lt;a href&#x3D;\&quot;https://github.com/noi-techpark/odh-docs/wiki/Common-parameters%2C-fields%2C-language%2C-searchfilter%2C-removenullvalues%2C-updatefrom#fields\&quot; target&#x3D;\&quot;_blank\&quot;&gt;Wiki fields&lt;/a&gt;
         * @param {string} [localizationlanguage] 
         * @param {boolean} [removenullvalues] Remove all Null values from json output. Useful for reducing json size. By default set to false. Documentation on &lt;a href&#x3D;\&quot;https://github.com/noi-techpark/odh-docs/wiki/Common-parameters,-fields,-language,-searchfilter,-removenullvalues,-updatefrom#removenullvalues\&quot; target&#x3D;\&quot;_blank\&quot;&gt;Opendatahub Wiki&lt;/a&gt;
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async singleODHTag(id: string, language?: string, fields?: Array<string>, localizationlanguage?: string, removenullvalues?: boolean, options?: AxiosRequestConfig): Promise<AxiosResponse<ODHTagLinked>> {
            return ODHTagApiFp(configuration).singleODHTag(id, language, fields, localizationlanguage, removenullvalues, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary GET ODHTag List
         * @param {number} [pagenumber] 
         * @param {number} [pagesize] 
         * @param {string} [language] Language field selector, displays data and fields available in the selected language (default:&#x27;null&#x27; all languages are displayed)
         * @param {string} [validforentity] Filter on Tags valid on Entities (accommodation, activity, poi, odhactivitypoi, package, gastronomy, event, article, common .. etc..)
         * @param {string} [mainentity] Filter on Tags with MainEntity set to (accommodation, activity, poi, odhactivitypoi, package, gastronomy, event, article, common .. etc..)
         * @param {boolean} [displayascategory] true &#x3D; returns only Tags which are marked as DisplayAsCategory true
         * @param {string} [source] Source Filter (possible Values: &#x27;lts&#x27;,&#x27;idm&#x27;), (default:&#x27;null&#x27;)
         * @param {string} [publishedon] Published On Filter (Separator &#x27;,&#x27; List of publisher IDs), (default:&#x27;null&#x27;)
         * @param {Array<string>} [fields] Select fields to display, More fields are indicated by separator &#x27;,&#x27; example fields&#x3D;Id,Active,Shortname (default:&#x27;null&#x27; all fields are displayed). &lt;a href&#x3D;\&quot;https://github.com/noi-techpark/odh-docs/wiki/Common-parameters%2C-fields%2C-language%2C-searchfilter%2C-removenullvalues%2C-updatefrom#fields\&quot; target&#x3D;\&quot;_blank\&quot;&gt;Wiki fields&lt;/a&gt;
         * @param {string} [searchfilter] String to search for, Title in all languages are searched, (default: null) &lt;a href&#x3D;\&quot;https://github.com/noi-techpark/odh-docs/wiki/Common-parameters%2C-fields%2C-language%2C-searchfilter%2C-removenullvalues%2C-updatefrom#searchfilter\&quot; target&#x3D;\&quot;_blank\&quot;&gt;Wiki searchfilter&lt;/a&gt;
         * @param {string} [rawfilter] &lt;a href&#x3D;\&quot;https://github.com/noi-techpark/odh-docs/wiki/Using-rawfilter-and-rawsort-on-the-Tourism-Api#rawfilter\&quot; target&#x3D;\&quot;_blank\&quot;&gt;Wiki rawfilter&lt;/a&gt;
         * @param {string} [rawsort] &lt;a href&#x3D;\&quot;https://github.com/noi-techpark/odh-docs/wiki/Using-rawfilter-and-rawsort-on-the-Tourism-Api#rawsort\&quot; target&#x3D;\&quot;_blank\&quot;&gt;Wiki rawsort&lt;/a&gt;
         * @param {string} [localizationlanguage] here for Compatibility Reasons, replaced by language parameter
         * @param {boolean} [removenullvalues] Remove all Null values from json output. Useful for reducing json size. By default set to false. Documentation on &lt;a href&#x3D;\&quot;https://github.com/noi-techpark/odh-docs/wiki/Common-parameters,-fields,-language,-searchfilter,-removenullvalues,-updatefrom#removenullvalues\&quot; target&#x3D;\&quot;_blank\&quot;&gt;Opendatahub Wiki&lt;/a&gt;
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async v1ODHTagGet(pagenumber?: number, pagesize?: number, language?: string, validforentity?: string, mainentity?: string, displayascategory?: boolean, source?: string, publishedon?: string, fields?: Array<string>, searchfilter?: string, rawfilter?: string, rawsort?: string, localizationlanguage?: string, removenullvalues?: boolean, options?: AxiosRequestConfig): Promise<AxiosResponse<Array<ODHTagLinked>>> {
            return ODHTagApiFp(configuration).v1ODHTagGet(pagenumber, pagesize, language, validforentity, mainentity, displayascategory, source, publishedon, fields, searchfilter, rawfilter, rawsort, localizationlanguage, removenullvalues, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ODHTagApi - object-oriented interface
 * @export
 * @class ODHTagApi
 * @extends {BaseAPI}
 */
export class ODHTagApi extends BaseAPI {
    /**
     * 
     * @summary GET ODHTag Single
     * @param {string} id ID of the Odhtags
     * @param {string} [language] Language field selector, displays data and fields available in the selected language (default:&#x27;null&#x27; all languages are displayed)
     * @param {Array<string>} [fields] Select fields to display, More fields are indicated by separator &#x27;,&#x27; example fields&#x3D;Id,Active,Shortname (default:&#x27;null&#x27; all fields are displayed). &lt;a href&#x3D;\&quot;https://github.com/noi-techpark/odh-docs/wiki/Common-parameters%2C-fields%2C-language%2C-searchfilter%2C-removenullvalues%2C-updatefrom#fields\&quot; target&#x3D;\&quot;_blank\&quot;&gt;Wiki fields&lt;/a&gt;
     * @param {string} [localizationlanguage] 
     * @param {boolean} [removenullvalues] Remove all Null values from json output. Useful for reducing json size. By default set to false. Documentation on &lt;a href&#x3D;\&quot;https://github.com/noi-techpark/odh-docs/wiki/Common-parameters,-fields,-language,-searchfilter,-removenullvalues,-updatefrom#removenullvalues\&quot; target&#x3D;\&quot;_blank\&quot;&gt;Opendatahub Wiki&lt;/a&gt;
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ODHTagApi
     */
    public async singleODHTag(id: string, language?: string, fields?: Array<string>, localizationlanguage?: string, removenullvalues?: boolean, options?: AxiosRequestConfig) : Promise<AxiosResponse<ODHTagLinked>> {
        return ODHTagApiFp(this.configuration).singleODHTag(id, language, fields, localizationlanguage, removenullvalues, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary GET ODHTag List
     * @param {number} [pagenumber] 
     * @param {number} [pagesize] 
     * @param {string} [language] Language field selector, displays data and fields available in the selected language (default:&#x27;null&#x27; all languages are displayed)
     * @param {string} [validforentity] Filter on Tags valid on Entities (accommodation, activity, poi, odhactivitypoi, package, gastronomy, event, article, common .. etc..)
     * @param {string} [mainentity] Filter on Tags with MainEntity set to (accommodation, activity, poi, odhactivitypoi, package, gastronomy, event, article, common .. etc..)
     * @param {boolean} [displayascategory] true &#x3D; returns only Tags which are marked as DisplayAsCategory true
     * @param {string} [source] Source Filter (possible Values: &#x27;lts&#x27;,&#x27;idm&#x27;), (default:&#x27;null&#x27;)
     * @param {string} [publishedon] Published On Filter (Separator &#x27;,&#x27; List of publisher IDs), (default:&#x27;null&#x27;)
     * @param {Array<string>} [fields] Select fields to display, More fields are indicated by separator &#x27;,&#x27; example fields&#x3D;Id,Active,Shortname (default:&#x27;null&#x27; all fields are displayed). &lt;a href&#x3D;\&quot;https://github.com/noi-techpark/odh-docs/wiki/Common-parameters%2C-fields%2C-language%2C-searchfilter%2C-removenullvalues%2C-updatefrom#fields\&quot; target&#x3D;\&quot;_blank\&quot;&gt;Wiki fields&lt;/a&gt;
     * @param {string} [searchfilter] String to search for, Title in all languages are searched, (default: null) &lt;a href&#x3D;\&quot;https://github.com/noi-techpark/odh-docs/wiki/Common-parameters%2C-fields%2C-language%2C-searchfilter%2C-removenullvalues%2C-updatefrom#searchfilter\&quot; target&#x3D;\&quot;_blank\&quot;&gt;Wiki searchfilter&lt;/a&gt;
     * @param {string} [rawfilter] &lt;a href&#x3D;\&quot;https://github.com/noi-techpark/odh-docs/wiki/Using-rawfilter-and-rawsort-on-the-Tourism-Api#rawfilter\&quot; target&#x3D;\&quot;_blank\&quot;&gt;Wiki rawfilter&lt;/a&gt;
     * @param {string} [rawsort] &lt;a href&#x3D;\&quot;https://github.com/noi-techpark/odh-docs/wiki/Using-rawfilter-and-rawsort-on-the-Tourism-Api#rawsort\&quot; target&#x3D;\&quot;_blank\&quot;&gt;Wiki rawsort&lt;/a&gt;
     * @param {string} [localizationlanguage] here for Compatibility Reasons, replaced by language parameter
     * @param {boolean} [removenullvalues] Remove all Null values from json output. Useful for reducing json size. By default set to false. Documentation on &lt;a href&#x3D;\&quot;https://github.com/noi-techpark/odh-docs/wiki/Common-parameters,-fields,-language,-searchfilter,-removenullvalues,-updatefrom#removenullvalues\&quot; target&#x3D;\&quot;_blank\&quot;&gt;Opendatahub Wiki&lt;/a&gt;
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ODHTagApi
     */
    public async v1ODHTagGet(pagenumber?: number, pagesize?: number, language?: string, validforentity?: string, mainentity?: string, displayascategory?: boolean, source?: string, publishedon?: string, fields?: Array<string>, searchfilter?: string, rawfilter?: string, rawsort?: string, localizationlanguage?: string, removenullvalues?: boolean, options?: AxiosRequestConfig) : Promise<AxiosResponse<Array<ODHTagLinked>>> {
        return ODHTagApiFp(this.configuration).v1ODHTagGet(pagenumber, pagesize, language, validforentity, mainentity, displayascategory, source, publishedon, fields, searchfilter, rawfilter, rawsort, localizationlanguage, removenullvalues, options).then((request) => request(this.axios, this.basePath));
    }
}
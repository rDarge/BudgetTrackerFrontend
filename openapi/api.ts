/* tslint:disable */
/* eslint-disable */
/**
 * FastAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError, operationServerMap } from './base';

/**
 * 
 * @export
 * @interface AccountData
 */
export interface AccountData {
    /**
     * 
     * @type {number}
     * @memberof AccountData
     */
    'id': number;
    /**
     * 
     * @type {string}
     * @memberof AccountData
     */
    'name': string;
}
/**
 * 
 * @export
 * @interface GetTransactionsResponse
 */
export interface GetTransactionsResponse {
    /**
     * 
     * @type {Array<TransactionData>}
     * @memberof GetTransactionsResponse
     */
    'transactions': Array<TransactionData>;
    /**
     * 
     * @type {number}
     * @memberof GetTransactionsResponse
     */
    'page': number;
    /**
     * 
     * @type {number}
     * @memberof GetTransactionsResponse
     */
    'per_page': number;
}
/**
 * 
 * @export
 * @interface HTTPValidationError
 */
export interface HTTPValidationError {
    /**
     * 
     * @type {Array<ValidationError>}
     * @memberof HTTPValidationError
     */
    'detail'?: Array<ValidationError>;
}
/**
 * 
 * @export
 * @interface PostAccountRequest
 */
export interface PostAccountRequest {
    /**
     * 
     * @type {string}
     * @memberof PostAccountRequest
     */
    'name': string;
}
/**
 * 
 * @export
 * @interface TransactionData
 */
export interface TransactionData {
    /**
     * 
     * @type {number}
     * @memberof TransactionData
     */
    'id': number;
    /**
     * 
     * @type {string}
     * @memberof TransactionData
     */
    'init_date': string | null;
    /**
     * 
     * @type {string}
     * @memberof TransactionData
     */
    'post_date': string;
    /**
     * 
     * @type {string}
     * @memberof TransactionData
     */
    'description': string;
    /**
     * 
     * @type {number}
     * @memberof TransactionData
     */
    'amount': number;
    /**
     * 
     * @type {number}
     * @memberof TransactionData
     */
    'account_id': number;
    /**
     * 
     * @type {number}
     * @memberof TransactionData
     */
    'category_id': number;
}
/**
 * 
 * @export
 * @interface ValidationError
 */
export interface ValidationError {
    /**
     * 
     * @type {Array<ValidationErrorLocInner>}
     * @memberof ValidationError
     */
    'loc': Array<ValidationErrorLocInner>;
    /**
     * 
     * @type {string}
     * @memberof ValidationError
     */
    'msg': string;
    /**
     * 
     * @type {string}
     * @memberof ValidationError
     */
    'type': string;
}
/**
 * 
 * @export
 * @interface ValidationErrorLocInner
 */
export interface ValidationErrorLocInner {
}

/**
 * DefaultApi - axios parameter creator
 * @export
 */
export const DefaultApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Testing: curl localhost:8000/accounts
         * @summary Get Accounts
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAccountsAccountsGet: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/accounts`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Get Transactions
         * @param {number} accountId 
         * @param {number} [page] 
         * @param {number} [perPage] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTransactionsAccountAccountIdTransactionsGet: async (accountId: number, page?: number, perPage?: number, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'accountId' is not null or undefined
            assertParamExists('getTransactionsAccountAccountIdTransactionsGet', 'accountId', accountId)
            const localVarPath = `/account/{account_id}/transactions`
                .replace(`{${"account_id"}}`, encodeURIComponent(String(accountId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }

            if (perPage !== undefined) {
                localVarQueryParameter['per_page'] = perPage;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Testing: curl -L -F \"uploadFile=@test_data/sensitive/sample_transactions_checking.CSV\" http://localhost:8000/account/1/import
         * @summary Import Csv
         * @param {number} accountId 
         * @param {File} uploadFile 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        importCsvAccountAccountIdImportPost: async (accountId: number, uploadFile: File, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'accountId' is not null or undefined
            assertParamExists('importCsvAccountAccountIdImportPost', 'accountId', accountId)
            // verify required parameter 'uploadFile' is not null or undefined
            assertParamExists('importCsvAccountAccountIdImportPost', 'uploadFile', uploadFile)
            const localVarPath = `/account/{account_id}/import`
                .replace(`{${"account_id"}}`, encodeURIComponent(String(accountId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;
            const localVarFormParams = new ((configuration && configuration.formDataCtor) || FormData)();


            if (uploadFile !== undefined) { 
                localVarFormParams.append('uploadFile', uploadFile as any);
            }
    
    
            localVarHeaderParameter['Content-Type'] = 'multipart/form-data';
    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = localVarFormParams;

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Testing: curl -H \"Content-Type: application/json\" -d \"{\"name\":\"test\"}\" http://localhost:8000/account
         * @summary Post Account
         * @param {PostAccountRequest} postAccountRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        postAccountAccountPost: async (postAccountRequest: PostAccountRequest, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'postAccountRequest' is not null or undefined
            assertParamExists('postAccountAccountPost', 'postAccountRequest', postAccountRequest)
            const localVarPath = `/account`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(postAccountRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Root
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        rootGet: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DefaultApi - functional programming interface
 * @export
 */
export const DefaultApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = DefaultApiAxiosParamCreator(configuration)
    return {
        /**
         * Testing: curl localhost:8000/accounts
         * @summary Get Accounts
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAccountsAccountsGet(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<AccountData>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAccountsAccountsGet(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['DefaultApi.getAccountsAccountsGet']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @summary Get Transactions
         * @param {number} accountId 
         * @param {number} [page] 
         * @param {number} [perPage] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getTransactionsAccountAccountIdTransactionsGet(accountId: number, page?: number, perPage?: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetTransactionsResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getTransactionsAccountAccountIdTransactionsGet(accountId, page, perPage, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['DefaultApi.getTransactionsAccountAccountIdTransactionsGet']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * Testing: curl -L -F \"uploadFile=@test_data/sensitive/sample_transactions_checking.CSV\" http://localhost:8000/account/1/import
         * @summary Import Csv
         * @param {number} accountId 
         * @param {File} uploadFile 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async importCsvAccountAccountIdImportPost(accountId: number, uploadFile: File, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<any>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.importCsvAccountAccountIdImportPost(accountId, uploadFile, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['DefaultApi.importCsvAccountAccountIdImportPost']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * Testing: curl -H \"Content-Type: application/json\" -d \"{\"name\":\"test\"}\" http://localhost:8000/account
         * @summary Post Account
         * @param {PostAccountRequest} postAccountRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async postAccountAccountPost(postAccountRequest: PostAccountRequest, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AccountData>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.postAccountAccountPost(postAccountRequest, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['DefaultApi.postAccountAccountPost']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @summary Root
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async rootGet(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<any>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.rootGet(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['DefaultApi.rootGet']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * DefaultApi - factory interface
 * @export
 */
export const DefaultApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = DefaultApiFp(configuration)
    return {
        /**
         * Testing: curl localhost:8000/accounts
         * @summary Get Accounts
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAccountsAccountsGet(options?: any): AxiosPromise<Array<AccountData>> {
            return localVarFp.getAccountsAccountsGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get Transactions
         * @param {number} accountId 
         * @param {number} [page] 
         * @param {number} [perPage] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTransactionsAccountAccountIdTransactionsGet(accountId: number, page?: number, perPage?: number, options?: any): AxiosPromise<GetTransactionsResponse> {
            return localVarFp.getTransactionsAccountAccountIdTransactionsGet(accountId, page, perPage, options).then((request) => request(axios, basePath));
        },
        /**
         * Testing: curl -L -F \"uploadFile=@test_data/sensitive/sample_transactions_checking.CSV\" http://localhost:8000/account/1/import
         * @summary Import Csv
         * @param {number} accountId 
         * @param {File} uploadFile 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        importCsvAccountAccountIdImportPost(accountId: number, uploadFile: File, options?: any): AxiosPromise<any> {
            return localVarFp.importCsvAccountAccountIdImportPost(accountId, uploadFile, options).then((request) => request(axios, basePath));
        },
        /**
         * Testing: curl -H \"Content-Type: application/json\" -d \"{\"name\":\"test\"}\" http://localhost:8000/account
         * @summary Post Account
         * @param {PostAccountRequest} postAccountRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        postAccountAccountPost(postAccountRequest: PostAccountRequest, options?: any): AxiosPromise<AccountData> {
            return localVarFp.postAccountAccountPost(postAccountRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Root
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        rootGet(options?: any): AxiosPromise<any> {
            return localVarFp.rootGet(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {BaseAPI}
 */
export class DefaultApi extends BaseAPI {
    /**
     * Testing: curl localhost:8000/accounts
     * @summary Get Accounts
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public getAccountsAccountsGet(options?: RawAxiosRequestConfig) {
        return DefaultApiFp(this.configuration).getAccountsAccountsGet(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get Transactions
     * @param {number} accountId 
     * @param {number} [page] 
     * @param {number} [perPage] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public getTransactionsAccountAccountIdTransactionsGet(accountId: number, page?: number, perPage?: number, options?: RawAxiosRequestConfig) {
        return DefaultApiFp(this.configuration).getTransactionsAccountAccountIdTransactionsGet(accountId, page, perPage, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Testing: curl -L -F \"uploadFile=@test_data/sensitive/sample_transactions_checking.CSV\" http://localhost:8000/account/1/import
     * @summary Import Csv
     * @param {number} accountId 
     * @param {File} uploadFile 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public importCsvAccountAccountIdImportPost(accountId: number, uploadFile: File, options?: RawAxiosRequestConfig) {
        return DefaultApiFp(this.configuration).importCsvAccountAccountIdImportPost(accountId, uploadFile, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Testing: curl -H \"Content-Type: application/json\" -d \"{\"name\":\"test\"}\" http://localhost:8000/account
     * @summary Post Account
     * @param {PostAccountRequest} postAccountRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public postAccountAccountPost(postAccountRequest: PostAccountRequest, options?: RawAxiosRequestConfig) {
        return DefaultApiFp(this.configuration).postAccountAccountPost(postAccountRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Root
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public rootGet(options?: RawAxiosRequestConfig) {
        return DefaultApiFp(this.configuration).rootGet(options).then((request) => request(this.axios, this.basePath));
    }
}




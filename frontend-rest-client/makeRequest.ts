import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

type ApiResponse<T = unknown> = T;

/**
 *This function handles all api calls.
 *@function makeRequest
 *@param {AxiosRequestConfig} object - API request configuration
 *@returns {AxiosPromise} - axios promise
 */
export const makeRequest = <T = unknown>({
  url = '/',
  method = 'GET',
  params = {},
  data = {},
  headers = {},
}: AxiosRequestConfig): AxiosPromise<ApiResponse<T>> => {
  return axios({ url, method, params, data, headers });
};

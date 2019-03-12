import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { buildQueryParams } from './common';

export default class Network {
  public readonly baseUrl: string;
  public readonly baseHeaders: Array<string>;
  private readonly axios: AxiosInstance;

  constructor () {
    const schema = window.location.protocol === 'https' ? 'https' : 'http';
    const baseUrl = '127.0.0.1:8080';
    this.baseUrl = `${schema}://${baseUrl.trim()}/`;
    const headers = [];
    this.baseHeaders = headers;
    this.axios = axios.create({
      headers: headers
    });
  }

  public get (url: string, param?: object, config?: AxiosRequestConfig): Promise<any> {
    return this.axios.get(this.buildUrl(url, param), config);
  }

  public post (url: string, param?: object, data?: object, config?: AxiosRequestConfig): Promise<any> {
    url = this.buildUrl(url, param);
    return this.axios.post(url, data, config);
  }

  public delete (url: string, param?: object, config?: AxiosRequestConfig): Promise<any> {
    url = this.buildUrl(url, param);
    return this.axios.delete(url, config);
  }

  public put (url: string, param?: object, data?: object, config?: AxiosRequestConfig): Promise<any> {
    url = this.buildUrl(url, param);
    return this.axios.put(url, data, config);
  }

  public patch (url: string, param?: object, data?: object, config?: AxiosRequestConfig): Promise<any> {
    url = this.buildUrl(url, param);
    return this.axios.patch(url, data, config);
  }

  private buildUrl (url: string, param?: object) {
    const paramStr: string = buildQueryParams(param);
    url = url + (url.indexOf('?') >= 0 ? '&' : '?') + paramStr;
    url = url.indexOf('://') === -1 ? this.baseUrl + url : url;
    return url;
  }
}

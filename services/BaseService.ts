import { AxiosInstance } from '~/node_modules/axios';

export default class BaseService {
  axios: AxiosInstance;

  constructor ($axios: AxiosInstance) {
    this.axios = $axios;
  }
}

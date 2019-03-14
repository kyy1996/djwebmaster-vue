import BaseService from '~/services/BaseService';
import { AxiosInstance } from '~/node_modules/axios';

interface UserCredential {
  username: string;
  password: string;
}

export default class CommonUserAuthService extends BaseService {

  constructor ($axios: AxiosInstance) {
    super($axios);
  }

  public login (user: UserCredential) {
    return this.axios.post('/ajax/common/auth/login', user);
  }
}

import BaseService from '~/services/BaseService';

interface UserCredential {
  username: string;
  password: string;
}

export default class CommonUserAuthService extends BaseService {
  public login (user: UserCredential) {
    return this.axios.post('/ajax/common/auth/login', user);
  }
}

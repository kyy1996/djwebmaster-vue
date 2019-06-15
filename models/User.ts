import Timestamp from '~/models/Timestamp';

export default interface User extends Partial<Readonly<Timestamp>> {
  readonly uid: number;
  avatar?: string;
  mobile: string;
  password?: string;
  email: string;
  admin?: boolean;
  status?: number;
  readonly email_verified_at?: string;
  readonly mobile_verified_at?: string;
  readonly remember_token?: string;
  readonly create_ip?: string;
  readonly update_ip?: string;
  readonly last_login_at?: string;
  readonly last_login_ip?: string;
}

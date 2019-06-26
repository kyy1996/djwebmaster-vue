import User from '~/models/User';
import ResponseMenu from '~/models/ResponseMenu';

export default interface Response<T> {
  data: T;
  msg: string;
  code: number;
  menu?: {
    [groupName: string]: ResponseMenu
  };
  user?: User;
}

import Timestamp from '~/models/Timestamp';

export default interface UserLog extends Partial<Readonly<Timestamp>> {
  readonly id?: number;
  readonly uid?: number;
  readonly title?: string;
  readonly description?: string;
  readonly loggable_type?: string;
  readonly loggable_id?: number;
  readonly result?: boolean;
  extra?: any;
  readonly ip?: string;
  readonly oa?: string;
}

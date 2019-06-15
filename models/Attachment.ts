import Timestamp from '~/models/Timestamp';

export default interface Attachment extends Partial<Readonly<Timestamp>> {
  id?: number;
  readonly uid?: number;
  readonly filename?: string;
  readonly storage?: string;
  readonly path?: string;
  url?: string;
  readonly size?: number;
  readonly md5?: string;
  readonly mime?: string;
  readonly extension?: string;
  extra?: null | object;
  valid?: boolean;
  readonly count?: number;
}

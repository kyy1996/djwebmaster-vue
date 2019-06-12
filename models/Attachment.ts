export default interface Attachment {
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
  readonly created_at?: string;
  readonly updated_at?: null | string;
  readonly deleted_at?: null | string;
}

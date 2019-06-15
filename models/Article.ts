import Timestamp from '~/models/Timestamp';

export default interface Article extends Partial<Readonly<Timestamp>> {
  readonly id: number;
  title: string;
  content: string;
  tags: string[];
  hide?: boolean;
  cover_img?: string;
  extra?: object | any[];
  readonly uid?: number;
  readonly read_count?: number;
  readonly comment_count?: number;
  readonly ip?: string;
}

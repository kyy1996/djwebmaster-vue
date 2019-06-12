export default interface Article {
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
  readonly deleted_at?: string;
  readonly created_at?: string;
  readonly updated_at?: string;
}

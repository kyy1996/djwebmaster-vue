export default interface VuetifyTableHeader {
  text?: string;
  value?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  class?: string[] | string;
  width?: string;
}

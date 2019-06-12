export default interface Pagination<T> {
  items: T[];
  page_info: {
    page_index: number,
    total: number,
    last_page: number,
    page_size: number
  };
}

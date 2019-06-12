export default interface Response<T> {
  data: T;
  msg: string;
  code: number;
}

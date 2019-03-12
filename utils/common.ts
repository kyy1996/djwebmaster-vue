export function buildQueryParams (param?: object): string {
  let paramStr: string = '';
  if (param) {
    for (const paramKey in param) {
      if (param.hasOwnProperty(paramKey)) {
        paramStr += `${paramKey}=${param[paramKey]}`;
      }
    }
  }
  return paramStr;
}

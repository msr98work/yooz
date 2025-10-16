import { QueryParams } from '@model/query-params.model';

export const convertParamsToString = <T extends QueryParams>(
  params: T
): string =>
  Object.entries(params)
    .map((param) => param.join('='))
    .join('&');

import type { Translation } from './locale.option';

export interface Option<V = string, M = Record<string, string>> {
  value: V;
  label: Translation;
  meta?: M;
}

export const getOption = <T extends Record<string, any>>(
  obj: T,
  key?: keyof T | null
) => {
  return key ? obj[key] : undefined;
};

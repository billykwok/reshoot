import { Stringifiable, Field } from '../type';

export function createStringifiable<T>(
  value: T,
  stringify: () => string
): Stringifiable<T> {
  return Object.assign(value, { stringify });
}

function isStringifiable(field: any): field is Stringifiable<unknown> {
  return (
    'stringify' in field &&
    (field as { stringify: unknown }).stringify instanceof Function
  );
}

export function stringify(field: Field): string {
  if (field) {
    if (typeof field === 'object') {
      if (isStringifiable(field)) {
        return field.stringify();
      }
      if (Array.isArray(field)) {
        return `[${field
          .map((el) => stringify(el))
          .filter((el) => typeof el !== 'undefined')
          .join()}]`;
      }
      return `{${Object.entries(field)
        .map(([k, v]) => [k, stringify(v)])
        .filter(([, v]) => typeof v !== 'undefined')
        .map(([k, v]) => `${JSON.stringify(k)}:${v}`)
        .join()}}`;
    }
  }
  return JSON.stringify(field);
}

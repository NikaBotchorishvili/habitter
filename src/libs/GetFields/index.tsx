export function getFields<T>(keys: { [K in keyof T]: K }): (keyof T)[] {
    return Object.keys(keys) as (keyof T)[];
  }
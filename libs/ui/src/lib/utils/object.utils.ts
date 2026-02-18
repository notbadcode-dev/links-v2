

export function createSchema<TValue extends Record<string, unknown>>(
  schema: TValue,
): { keys: (keyof TValue)[]; schema: TValue } {
  return {
    keys: Object.keys(schema) as (keyof TValue)[],
    schema,
  };
}

export function createKeys<TValue extends Record<string, unknown>>(
  schema: TValue,
): Record<keyof TValue, keyof TValue> {
  const keys = Object.keys(schema) as (keyof TValue)[];
  const result = {} as Record<keyof TValue, keyof TValue>;
  keys.forEach((key) => {
    result[key] = key;
  });

  return result;
}

/**
 * Object utilities
 */

/**
 * Creates a form schema with automatic key extraction
 * @param schema The form schema definition
 * @returns Object with keys array and type inference
 */
export function createSchema<TValue extends Record<string, unknown>>(
  schema: TValue,
): { keys: (keyof TValue)[]; schema: TValue } {
  return {
    keys: Object.keys(schema) as (keyof TValue)[],
    schema,
  };
}

/**
 * Creates an object with keys as properties for easy access
 * @param schema The form schema definition
 * @returns Object where each key becomes a property with its own name as value
 */
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

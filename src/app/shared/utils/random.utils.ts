export function pickRandomItem<TItem>(
  items: readonly TItem[],
  randomFn: () => number = Math.random,
): TItem | undefined {
  if (items.length === 0) {
    return undefined;
  }

  const randomValue = randomFn();
  const normalizedRandom = Math.min(Math.max(randomValue, 0), 0.9999999999999999);
  const index = Math.floor(normalizedRandom * items.length);

  return items[index];
}

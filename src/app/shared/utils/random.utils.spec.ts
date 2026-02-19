import { pickRandomItem } from './random.utils';

describe('pickRandomItem', () => {
  it('returns undefined when list is empty', () => {
    expect(pickRandomItem([])).toBeUndefined();
  });

  it('returns first item when random value is 0', () => {
    expect(pickRandomItem(['a', 'b', 'c'], () => 0)).toBe('a');
  });

  it('returns last item when random value is close to 1', () => {
    expect(pickRandomItem(['a', 'b', 'c'], () => 0.999999)).toBe('c');
  });

  it('clamps random values out of bounds', () => {
    expect(pickRandomItem([1, 2, 3], () => -10)).toBe(1);
    expect(pickRandomItem([1, 2, 3], () => 10)).toBe(3);
  });
});

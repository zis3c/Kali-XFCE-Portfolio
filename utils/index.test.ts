import { random, range } from './index';

describe('random', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns the lower bound when Math.random is 0', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);
    expect(random(3, 9)).toBe(3);
  });

  it('stays below the upper bound when Math.random is close to 1', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.999999);
    expect(random(3, 9)).toBeLessThan(9);
  });

  it('always returns a number inside the range', () => {
    for (let i = 0; i < 50; i += 1) {
      const value = random(0, 5);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(5);
    }
  });
});

describe('range', () => {
  it('builds an exclusive range with a default step', () => {
    expect(range(0, 5)).toEqual([0, 1, 2, 3, 4]);
  });

  it('builds a range with a custom step', () => {
    expect(range(0, 10, 3)).toEqual([0, 3, 6, 9]);
  });

  it('treats a single argument as the end from zero', () => {
    expect(range(4)).toEqual([0, 1, 2, 3]);
  });

  it('returns an empty array when start equals end', () => {
    expect(range(2, 2)).toEqual([]);
  });
});

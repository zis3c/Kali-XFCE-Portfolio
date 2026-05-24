import { withRetry } from './retry';

describe('withRetry', () => {
  it('returns the result on first success', async () => {
    const fn = jest.fn().mockResolvedValue('success');
    const result = await withRetry(fn, { baseDelayMs: 10 });
    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('retries on failure and eventually succeeds', async () => {
    const fn = jest
      .fn()
      .mockRejectedValueOnce(new Error('fail 1'))
      .mockRejectedValueOnce(new Error('fail 2'))
      .mockResolvedValue('finally');

    const result = await withRetry(fn, { baseDelayMs: 10, maxDelayMs: 0 });

    expect(result).toBe('finally');
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('throws after exhausting retries', async () => {
    const fn = jest.fn().mockRejectedValue(new Error('always fail'));

    await expect(
      withRetry(fn, {
        maxRetries: 2,
        baseDelayMs: 10,
        maxDelayMs: 0,
      })
    ).rejects.toThrow('always fail');

    // 1 initial + 2 retries = 3 total attempts
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('calls onRetry callback on each retry', async () => {
    const onRetry = jest.fn();
    const fn = jest
      .fn()
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValue('ok');

    await withRetry(fn, {
      maxRetries: 3,
      baseDelayMs: 10,
      maxDelayMs: 0,
      onRetry,
    });

    expect(onRetry).toHaveBeenCalledTimes(1);
    expect(onRetry).toHaveBeenCalledWith(1, expect.any(Error));
  });

  it('caps delay at maxDelayMs', async () => {
    const fn = jest.fn().mockRejectedValue(new Error('fail'));

    await expect(
      withRetry(fn, {
        maxRetries: 3,
        baseDelayMs: 10000,
        maxDelayMs: 0,
      })
    ).rejects.toThrow('fail');

    // Should have been called maxRetries+1 times
    expect(fn).toHaveBeenCalledTimes(4);
  });
});

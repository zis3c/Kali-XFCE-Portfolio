/**
 * Exponential backoff retry utility.
 * Retries an async operation with increasing delay between attempts.
 */

export interface RetryOptions {
  maxRetries?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
  onRetry?: (attempt: number, error: unknown) => void;
}

export const withRetry = async <T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> => {
  const {
    maxRetries = 3,
    baseDelayMs = 500,
    maxDelayMs = 10_000,
    onRetry,
  } = options;

  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt === maxRetries) break;

      const delay = Math.min(
        baseDelayMs * Math.pow(2, attempt) + Math.random() * 200,
        maxDelayMs
      );

      onRetry?.(attempt + 1, error);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
};

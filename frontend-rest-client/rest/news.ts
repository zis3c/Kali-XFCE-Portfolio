import { AxiosResponse } from 'axios';
import { makeRequest } from '../makeRequest';
import { INewsApiResponse } from '../../types/redux/news-reducer-types';
import { withRetry } from '../../utils/retry';
import { logger } from '../../utils/logger';

/**
 * @EXPORTS
 */
export { getLatestNews };

/**
 * Fetches latest news from NEWS_API with exponential backoff retry.
 * Retries up to 2 additional times (3 total attempts) on network failures.
 *
 * @api GET https://newsapi.org/v2/
 * @returns {object} - promise with news articles
 */
const getLatestNews = (): Promise<AxiosResponse<INewsApiResponse>> => {
  return withRetry(
    () =>
      makeRequest<INewsApiResponse>({
        url: `${process.env.NEWS_URL_QUERY}=${process.env.NEWS_API_KEY}`,
        method: 'GET',
      }),
    {
      maxRetries: 2,
      baseDelayMs: 500,
      onRetry: (attempt, error) => {
        logger.warn('NewsAPI retry', {
          attempt,
          error: error instanceof Error ? error.message : String(error),
        });
      },
    }
  );
};

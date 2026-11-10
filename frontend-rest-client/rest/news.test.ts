import { makeRequest } from '../makeRequest';
import { getLatestNews } from './news';

jest.mock('../makeRequest', () => ({
  makeRequest: jest.fn(),
}));

const makeRequestMock = makeRequest as jest.Mock;

describe('getLatestNews', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('rejects when the news API is not configured', async () => {
    delete process.env.NEWS_URL_QUERY;
    delete process.env.NEWS_API_KEY;

    await expect(getLatestNews()).rejects.toThrow(
      'News API is not configured for this environment'
    );
  });

  it('requests the configured news endpoint', async () => {
    process.env.NEWS_URL_QUERY = 'https://news.test/?apiKey';
    process.env.NEWS_API_KEY = 'secret';
    makeRequestMock.mockResolvedValue({ data: { articles: [] } });

    const response = await getLatestNews();

    expect(makeRequestMock).toHaveBeenCalledWith({
      url: 'https://news.test/?apiKey=secret',
      method: 'GET',
    });
    expect(response).toEqual({ data: { articles: [] } });
  });
});

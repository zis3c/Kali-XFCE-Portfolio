import { getLatestNews } from '../../../frontend-rest-client/rest/news';
import { NewsReducerActionTypes } from '../../../types/redux/news-reducer-types';
import { loadLatestNews } from '../news-action-creators';

jest.mock('../../../frontend-rest-client/rest/news', () => ({
  getLatestNews: jest.fn(),
}));

const getLatestNewsMock = getLatestNews as jest.Mock;

describe('loadLatestNews', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = {
      ...originalEnv,
      NEWS_URL_QUERY: 'https://news.test/?apiKey',
      NEWS_API_KEY: 'secret',
    };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('does nothing when the news API is not configured', async () => {
    delete process.env.NEWS_URL_QUERY;
    delete process.env.NEWS_API_KEY;
    const dispatch = jest.fn();

    await loadLatestNews()(dispatch);

    expect(dispatch).not.toHaveBeenCalled();
    expect(getLatestNewsMock).not.toHaveBeenCalled();
  });

  it('dispatches loading and loaded actions on success', async () => {
    getLatestNewsMock.mockResolvedValue({
      data: { articles: [{ title: 'News' }] },
    });
    const dispatch = jest.fn();

    await loadLatestNews()(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: NewsReducerActionTypes.LOAD_NEWS_ARTICLES,
    });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: NewsReducerActionTypes.NEWS_ARTICLES_DID_LOAD,
      payload: [{ title: 'News' }],
    });
  });

  it('dispatches an error action when the request fails', async () => {
    getLatestNewsMock.mockRejectedValue(new Error('network down'));
    const dispatch = jest.fn();

    await loadLatestNews()(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: NewsReducerActionTypes.LOAD_NEWS_ARTICLES,
    });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: NewsReducerActionTypes.NEWS_ARTICLES_LOAD_ERROR,
      payload: 'network down',
    });
  });
});

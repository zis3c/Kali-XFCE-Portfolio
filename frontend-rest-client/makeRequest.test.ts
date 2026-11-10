import axios from 'axios';
import { makeRequest } from './makeRequest';

jest.mock('axios', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const axiosMock = axios as unknown as jest.Mock;

describe('makeRequest', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    axiosMock.mockResolvedValue({ data: { ok: true } });
  });

  it('uses safe defaults', async () => {
    await makeRequest({});

    expect(axiosMock).toHaveBeenCalledWith({
      url: '/',
      method: 'GET',
      params: {},
      data: {},
      headers: {},
    });
  });

  it('forwards the request configuration', async () => {
    await makeRequest({
      url: '/api/contact',
      method: 'POST',
      data: { name: 'Radzi' },
      headers: { 'Content-Type': 'application/json' },
    });

    expect(axiosMock).toHaveBeenCalledWith({
      url: '/api/contact',
      method: 'POST',
      params: {},
      data: { name: 'Radzi' },
      headers: { 'Content-Type': 'application/json' },
    });
  });

  it('returns the axios response', async () => {
    const response = await makeRequest({ url: '/health' });
    expect(response).toEqual({ data: { ok: true } });
  });
});

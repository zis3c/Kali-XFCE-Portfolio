import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import healthHandler from '../../../pages/api/health';

interface MockResponse {
  statusCode: number;
  body: unknown;
  status: jest.Mock;
  json: jest.Mock;
}

const makeRes = (): MockResponse => {
  const res: MockResponse = {
    statusCode: 0,
    body: null,
    status: jest.fn(),
    json: jest.fn(),
  };
  res.status.mockImplementation((code: number) => {
    res.statusCode = code;
    return res;
  });
  res.json.mockImplementation((body: unknown) => {
    res.body = body;
    return res;
  });
  return res;
};

const setDbState = (state: number) => {
  (mongoose.connection as unknown as { readyState: number }).readyState = state;
};

describe('GET /api/health', () => {
  afterEach(() => {
    setDbState(0);
  });

  it('reports healthy when MongoDB is connected', async () => {
    setDbState(1);
    const res = makeRes();

    await healthHandler(
      {} as NextApiRequest,
      res as unknown as NextApiResponse
    );

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({
      status: 'healthy',
      checks: { server: 'ok', database: 'connected' },
    });
  });

  it('reports degraded while connecting', async () => {
    setDbState(2);
    const res = makeRes();

    await healthHandler(
      {} as NextApiRequest,
      res as unknown as NextApiResponse
    );

    expect(res.statusCode).toBe(503);
    expect(res.body).toMatchObject({
      status: 'degraded',
      checks: { database: 'connecting' },
    });
  });

  it('reports degraded when disconnected', async () => {
    setDbState(0);
    const res = makeRes();

    await healthHandler(
      {} as NextApiRequest,
      res as unknown as NextApiResponse
    );

    expect(res.statusCode).toBe(503);
    expect(res.body).toMatchObject({
      checks: { database: 'disconnected' },
    });
  });
});

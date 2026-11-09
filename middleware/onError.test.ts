import { NextApiRequest, NextApiResponse } from 'next';
import { onError } from './onError';

interface MockResponse {
  statusCode: number;
  body: unknown;
  redirectPath: string | null;
  status: jest.Mock;
  json: jest.Mock;
  redirect: jest.Mock;
}

const makeReq = (accept?: string): NextApiRequest =>
  ({
    headers: accept ? { accept } : {},
  } as NextApiRequest);

const makeRes = (): MockResponse => {
  const res: MockResponse = {
    statusCode: 0,
    body: null,
    redirectPath: null,
    status: jest.fn(),
    json: jest.fn(),
    redirect: jest.fn(),
  };

  res.status.mockImplementation((code: number) => {
    res.statusCode = code;
    return res;
  });
  res.json.mockImplementation((body: unknown) => {
    res.body = body;
    return res;
  });
  res.redirect.mockImplementation((path: string) => {
    res.redirectPath = path;
    return res;
  });

  return res;
};

describe('onError', () => {
  it('returns a 500 JSON response for generic errors', () => {
    const res = makeRes();

    onError(new Error('boom'), makeReq(), res as unknown as NextApiResponse);

    expect(res.statusCode).toBe(500);
    expect(res.body).toMatchObject({
      success: false,
      message: 'boom',
    });
  });

  it('maps mongoose CastError to a 400 response', () => {
    const res = makeRes();
    const error = new Error('cast failed');
    error.name = 'CastError';
    (error as Error & { path?: string }).path = 'id';

    onError(error, makeReq(), res as unknown as NextApiResponse);

    expect(res.statusCode).toBe(400);
    expect(res.body).toMatchObject({
      message: 'Resource not found. Invalid: id',
    });
  });

  it('maps mongoose ValidationError to a 400 response', () => {
    const res = makeRes();
    const error = new Error('validation failed');
    error.name = 'ValidationError';
    (error as Error & { errors?: Record<string, { message: string }> }).errors =
      {
        email: { message: 'Invalid email format' },
      };

    onError(error, makeReq(), res as unknown as NextApiResponse);

    expect(res.statusCode).toBe(400);
    expect(res.body).toMatchObject({ message: 'Invalid email format' });
  });

  it('redirects browser requests to /500', () => {
    const res = makeRes();

    onError(
      new Error('boom'),
      makeReq('text/html'),
      res as unknown as NextApiResponse
    );

    expect(res.redirectPath).toBe('/500');
  });
});

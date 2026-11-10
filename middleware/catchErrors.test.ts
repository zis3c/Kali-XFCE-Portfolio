import catchErrorsFrom from './catchErrors';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Socket } from 'net';

jest.mock('../utils/logger', () => ({
  logger: {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

import { logger } from '../utils/logger';

function mockReq(overrides: Partial<NextApiRequest> = {}): NextApiRequest {
  return {
    headers: {},
    socket: {} as Socket,
    ...overrides,
  } as NextApiRequest;
}

function mockRes(): NextApiResponse & {
  _getStatusCode(): number;
  _getJSONData(): unknown;
} {
  const res: Record<string, unknown> = {
    statusCode: 200,
    _statusCode: 200,
    _jsonData: null,
    status(code: number) {
      this._statusCode = code;
      return this;
    },
    json(data: unknown) {
      this._jsonData = data;
      return this;
    },
    _getStatusCode() {
      return this._statusCode;
    },
    _getJSONData() {
      return this._jsonData;
    },
    setHeader: jest.fn(),
    getHeader: jest.fn(),
  };
  return res as unknown as NextApiResponse & {
    _getStatusCode(): number;
    _getJSONData(): unknown;
  };
}

describe('catchErrorsFrom', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('passes through a successful controller response', async () => {
    const controller = jest.fn().mockResolvedValue(undefined);
    const req = mockReq();
    const res = mockRes();

    const wrapped = catchErrorsFrom(controller);
    await wrapped(req, res);

    expect(controller).toHaveBeenCalledWith(req, res);
  });

  it('catches errors and returns 500 with error message', async () => {
    const controller = jest
      .fn()
      .mockRejectedValue(new Error('DB connection failed'));
    const req = mockReq();
    const res = mockRes();

    const wrapped = catchErrorsFrom(controller);
    await wrapped(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(res._getJSONData()).toEqual({
      success: 'fail',
      error: 'DB connection failed',
    });
  });

  it('logs the error via structured logger', async () => {
    const controller = jest
      .fn()
      .mockRejectedValue(new Error('Something broke'));
    const req = mockReq();
    const res = mockRes();

    const wrapped = catchErrorsFrom(controller);
    await wrapped(req, res);

    expect(logger.error).toHaveBeenCalledWith('Unhandled controller error', {
      message: 'Something broke',
      stack: expect.any(String),
    });
  });

  it('handles non-Error thrown values', async () => {
    const controller = jest.fn().mockRejectedValue('plain string error');
    const req = mockReq();
    const res = mockRes();

    const wrapped = catchErrorsFrom(controller);
    await wrapped(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(res._getJSONData()).toEqual({
      success: 'fail',
      error: 'plain string error',
    });
  });
});

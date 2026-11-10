import { rateLimiter, validateContactBody } from './rateLimit';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Socket } from 'net';

function mockReq(overrides: Partial<NextApiRequest> = {}): NextApiRequest {
  return {
    headers: {},
    socket: {} as Socket,
    ...overrides,
  } as NextApiRequest;
}

function mockRes(): NextApiResponse {
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
  return res as unknown as NextApiResponse;
}

describe('validateContactBody', () => {
  it('returns null for valid body', () => {
    const result = validateContactBody({
      name: 'Radzi',
      email: 'test@example.com',
      message: 'Hello world',
    });
    expect(result).toBeNull();
  });

  it('rejects missing name', () => {
    expect(validateContactBody({ email: 'a@b.com', message: 'Hi' })).toBe(
      'Name is required.'
    );
  });

  it('rejects empty name', () => {
    expect(
      validateContactBody({ name: '   ', email: 'a@b.com', message: 'Hi' })
    ).toBe('Name is required.');
  });

  it('rejects name that is not a string', () => {
    expect(
      validateContactBody({ name: 123, email: 'a@b.com', message: 'Hi' })
    ).toBe('Name is required.');
  });

  it('rejects name over 100 characters', () => {
    expect(
      validateContactBody({
        name: 'a'.repeat(101),
        email: 'a@b.com',
        message: 'Hi',
      })
    ).toBe('Name must be 100 characters or fewer.');
  });

  it('rejects missing email', () => {
    expect(validateContactBody({ name: 'Radzi', message: 'Hi' })).toBe(
      'Email is required.'
    );
  });

  it('rejects invalid email format', () => {
    expect(
      validateContactBody({
        name: 'Radzi',
        email: 'not-an-email',
        message: 'Hi',
      })
    ).toBe('Invalid email format.');
  });

  it('rejects missing message', () => {
    expect(validateContactBody({ name: 'Radzi', email: 'a@b.com' })).toBe(
      'Message is required.'
    );
  });

  it('rejects message over 5000 characters', () => {
    expect(
      validateContactBody({
        name: 'Radzi',
        email: 'a@b.com',
        message: 'x'.repeat(5001),
      })
    ).toBe('Message must be 5000 characters or fewer.');
  });

  it('accepts email with subdomain and plus sign', () => {
    const result = validateContactBody({
      name: 'Radzi',
      email: 'user+tag@sub.example.co.uk',
      message: 'Hello',
    });
    expect(result).toBeNull();
  });
});

describe('rateLimiter', () => {
  it('allows the first request from an IP', () => {
    const req = mockReq({ headers: { 'x-forwarded-for': '192.168.1.1' } });
    const res = mockRes();

    const allowed = rateLimiter(req, res);
    expect(allowed).toBe(true);
  });

  it('blocks after exceeding maxRequests', () => {
    const res = mockRes();

    for (let i = 0; i < 5; i++) {
      const req = mockReq({ headers: { 'x-forwarded-for': '192.168.1.2' } });
      expect(rateLimiter(req, res)).toBe(true);
    }

    const req6 = mockReq({ headers: { 'x-forwarded-for': '192.168.1.2' } });
    const allowed = rateLimiter(req6, res);
    expect(allowed).toBe(false);
    expect((res as any)._getStatusCode()).toBe(429);
    expect((res as any)._getJSONData()).toEqual({
      success: false,
      message: expect.stringContaining('Too many requests'),
    });
  });

  it('falls back to socket remoteAddress when x-forwarded-for is missing', () => {
    const req = mockReq({
      headers: {},
      socket: { remoteAddress: '10.0.0.1' } as Socket,
    });
    const res = mockRes();

    const allowed = rateLimiter(req, res);
    expect(allowed).toBe(true);
  });

  it('uses "unknown" when no IP is detectable', () => {
    const req = mockReq();
    const res = mockRes();

    const allowed = rateLimiter(req, res);
    expect(allowed).toBe(true);
  });

  it('respects custom maxRequests and windowMs', () => {
    const res = mockRes();

    const req1 = mockReq({ headers: { 'x-forwarded-for': '10.10.10.10' } });
    expect(rateLimiter(req1, res, { maxRequests: 2, windowMs: 60000 })).toBe(
      true
    );

    const req2 = mockReq({ headers: { 'x-forwarded-for': '10.10.10.10' } });
    expect(rateLimiter(req2, res, { maxRequests: 2, windowMs: 60000 })).toBe(
      true
    );

    const req3 = mockReq({ headers: { 'x-forwarded-for': '10.10.10.10' } });
    expect(rateLimiter(req3, res, { maxRequests: 2, windowMs: 60000 })).toBe(
      false
    );
  });
});

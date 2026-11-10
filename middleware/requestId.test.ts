import { withCorrelationId } from './requestId';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Socket } from 'net';

function mockReq(overrides: Partial<NextApiRequest> = {}): NextApiRequest {
  return {
    headers: {},
    socket: {} as Socket,
    correlationId: undefined,
    ...overrides,
  } as NextApiRequest & { correlationId?: string };
}

function mockRes(): NextApiResponse {
  const headers: Record<string, string | number | string[]> = {};
  const res: Record<string, unknown> = {
    setHeader(name: string, value: string | number | string[]) {
      headers[name] = value;
    },
    getHeader(name: string) {
      return headers[name];
    },
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return res as unknown as NextApiResponse;
}

describe('withCorrelationId', () => {
  it('generates a UUID when no X-Request-Id header is present', () => {
    const req = mockReq();
    const res = mockRes();

    const id = withCorrelationId(req, res);

    // UUID v4 pattern
    expect(id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
    );
    expect((req as any).correlationId).toBe(id);
    expect(res.getHeader('X-Request-Id')).toBe(id);
  });

  it('uses existing X-Request-Id header when present', () => {
    const req = mockReq({ headers: { 'x-request-id': 'abc-123-custom' } });
    const res = mockRes();

    const id = withCorrelationId(req, res);

    expect(id).toBe('abc-123-custom');
    expect((req as any).correlationId).toBe('abc-123-custom');
    expect(res.getHeader('X-Request-Id')).toBe('abc-123-custom');
  });

  it('generates new UUID when X-Request-Id is an empty string', () => {
    const req = mockReq({ headers: { 'x-request-id': '' } });
    const res = mockRes();

    const id = withCorrelationId(req, res);

    expect(id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
    );
    expect((req as any).correlationId).toBe(id);
  });
});

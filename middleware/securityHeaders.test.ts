import { setSecurityHeaders } from './securityHeaders';
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

describe('setSecurityHeaders', () => {
  it('sets X-Frame-Options to DENY', () => {
    const req = mockReq();
    const res = mockRes();
    setSecurityHeaders(req, res);
    expect(res.getHeader('X-Frame-Options')).toBe('DENY');
  });

  it('sets X-Content-Type-Options to nosniff', () => {
    const req = mockReq();
    const res = mockRes();
    setSecurityHeaders(req, res);
    expect(res.getHeader('X-Content-Type-Options')).toBe('nosniff');
  });

  it('sets Referrer-Policy to strict-origin-when-cross-origin', () => {
    const req = mockReq();
    const res = mockRes();
    setSecurityHeaders(req, res);
    expect(res.getHeader('Referrer-Policy')).toBe(
      'strict-origin-when-cross-origin'
    );
  });

  it('sets Permissions-Policy to restrict camera, microphone, and geolocation', () => {
    const req = mockReq();
    const res = mockRes();
    setSecurityHeaders(req, res);
    const permissionsPolicy = res.getHeader('Permissions-Policy') as string;
    expect(permissionsPolicy).toContain('camera=()');
    expect(permissionsPolicy).toContain('microphone=()');
    expect(permissionsPolicy).toContain('geolocation=()');
  });

  it('sets HSTS header in production', () => {
    const req = mockReq();
    const res = mockRes();
    setSecurityHeaders(req, res, 'production');
    const hsts = res.getHeader('Strict-Transport-Security') as string;
    expect(hsts).toContain('max-age=63072000');
    expect(hsts).toContain('includeSubDomains');
    expect(hsts).toContain('preload');
  });

  it('does not set HSTS header in development', () => {
    const req = mockReq();
    const res = mockRes();
    setSecurityHeaders(req, res, 'development');
    expect(res.getHeader('Strict-Transport-Security')).toBeUndefined();
  });
});

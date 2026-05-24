import { NextApiRequest, NextApiResponse } from 'next';

const getRuntimeEnv = (): string | undefined => process.env.NODE_ENV;

/**
 * Sets security-related HTTP response headers.
 *
 * - X-Frame-Options: prevents clickjacking
 * - X-Content-Type-Options: prevents MIME sniffing
 * - Referrer-Policy: limits referrer information leakage
 * - Permissions-Policy: restricts browser features
 * - Strict-Transport-Security: enforces HTTPS (disabled in dev)
 */

export const setSecurityHeaders = (
  _req: NextApiRequest,
  res: NextApiResponse,
  runtimeEnv = getRuntimeEnv()
): void => {
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );

  if (runtimeEnv === 'production') {
    res.setHeader(
      'Strict-Transport-Security',
      'max-age=63072000; includeSubDomains; preload'
    );
  }
};

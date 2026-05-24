import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { sendEmail } from '../../../backend/controllers/contactsController';
import { onError } from '../../../middleware/onError';
import { rateLimiter, validateContactBody } from '../../../middleware/rateLimit';
import { withCorrelationId } from '../../../middleware/requestId';
import { setSecurityHeaders } from '../../../middleware/securityHeaders';
import { logger } from '../../../utils/logger';

const handler = nc<NextApiRequest, NextApiResponse>({ onError });

/**
 * Rate-limited and validated contact form endpoint.
 *
 * POST /api/contact
 * Body: { name: string, email: string, message: string }
 * Rate limit: 5 requests per IP per 60 seconds.
 * Security: correlation IDs, security headers, CSRF via origin check.
 *
 * TODO: For production, replace origin check with proper CSRF token validation
 * (e.g., csurf or next-csrf package with same-site cookie tokens).
 */

const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_SITE_URL,
  'http://localhost:8888',
  'https://me.zis3c.dev',
].filter(Boolean);

handler.post(async (req, res) => {
  // Attach correlation ID
  const correlationId = withCorrelationId(req, res);

  // Set security headers
  setSecurityHeaders(req, res);

  // CSRF: reject cross-origin POSTs without valid origin
  const origin = req.headers.origin;
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    logger.warn('Blocked cross-origin request', { origin, correlationId });
    return res.status(403).json({
      success: false,
      message: 'Cross-origin requests are not allowed.',
    });
  }

  // Apply rate limiting
  if (!rateLimiter(req, res, { maxRequests: 5, windowMs: 60_000 })) {
    return; // rateLimiter already sent 429 response
  }

  // Validate input
  const validationError = validateContactBody(req.body);
  if (validationError) {
    return res.status(400).json({
      success: false,
      message: validationError,
    });
  }

  logger.info('Contact form submitted', {
    correlationId,
    name: (req.body as Record<string, string>).name,
  });

  // Delegate to the actual email sender
  return sendEmail(req, res);
});

handler.all((req, res) => {
  const accepts = req.headers.accept ?? '';
  const wantsHtml = accepts.includes('text/html');

  if (wantsHtml) {
    res.redirect('/404');
    return;
  }

  res.status(404).json({
    success: false,
    message: 'Not found.',
  });
});

export default handler;

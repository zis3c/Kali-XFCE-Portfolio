import { NextApiRequest, NextApiResponse } from 'next';
import { logger } from '../utils/logger';

/**
 * Simple in-memory rate limiter.
 * Limits each IP to `maxRequests` per `windowMs` milliseconds.
 * For production, replace with Redis-backed token bucket or a service like Upstash.
 */

const ipRequestCounts = new Map<string, { count: number; resetAt: number }>();

interface RateLimitOptions {
  maxRequests?: number;
  windowMs?: number;
}

export const rateLimiter = (
  req: NextApiRequest,
  res: NextApiResponse,
  options: RateLimitOptions = {}
): boolean => {
  const { maxRequests = 5, windowMs = 60_000 } = options;

  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
    'unknown';

  const now = Date.now();
  const entry = ipRequestCounts.get(ip);

  if (!entry || now > entry.resetAt) {
    ipRequestCounts.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= maxRequests) {
    logger.warn('Rate limit exceeded', { ip, count: entry.count });
    res.status(429).json({
      success: false,
      message: `Too many requests. Try again in ${Math.ceil((entry.resetAt - now) / 1000)}s.`,
    });
    return false;
  }

  entry.count += 1;
  return true;
};

/**
 * Clean up stale entries periodically (every 5 minutes).
 */
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of Array.from(ipRequestCounts)) {
      if (now > entry.resetAt) {
        ipRequestCounts.delete(ip);
      }
    }
  }, 5 * 60 * 1000);
}

/**
 * Validate contact form body fields.
 * Returns an error message string, or null if valid.
 */
export const validateContactBody = (body: Record<string, unknown>): string | null => {
  const { name, email, message } = body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return 'Name is required.';
  }
  if (name.trim().length > 100) {
    return 'Name must be 100 characters or fewer.';
  }

  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    return 'Email is required.';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return 'Invalid email format.';
  }

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return 'Message is required.';
  }
  if (message.trim().length > 5000) {
    return 'Message must be 5000 characters or fewer.';
  }

  return null;
};

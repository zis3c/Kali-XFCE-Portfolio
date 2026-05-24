import { NextApiRequest, NextApiResponse } from 'next';
import { randomUUID } from 'crypto';

/**
 * Middleware that ensures every request has a correlation ID.
 * Uses X-Request-Id from the client if present, otherwise generates a new UUID.
 * The ID is attached to `req` and set on the response header for traceability.
 */

declare module 'http' {
  interface IncomingMessage {
    correlationId?: string;
  }
}

export const withCorrelationId = (
  req: NextApiRequest,
  res: NextApiResponse
): string => {
  const existing = req.headers['x-request-id'];
  const id =
    typeof existing === 'string' && existing.length > 0
      ? existing
      : randomUUID();

  req.correlationId = id;
  res.setHeader('X-Request-Id', id);
  return id;
};

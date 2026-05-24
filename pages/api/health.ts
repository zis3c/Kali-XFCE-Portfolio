import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import { logger } from '../../utils/logger';

/**
 * GET /api/health
 *
 * Returns application health status including:
 * - Server status (always 'ok' if this endpoint responds)
 * - MongoDB connectivity status
 * - Uptime in seconds
 */

const bootTime = Date.now();

export default async function healthHandler(
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const dbState = mongoose.connection.readyState;
  const dbStatus =
    dbState === 1
      ? 'connected'
      : dbState === 2
      ? 'connecting'
      : 'disconnected';

  const healthy = dbState === 1;

  logger.info('Health check', {
    dbStatus,
    uptime: Math.floor((Date.now() - bootTime) / 1000),
  });

  res.status(healthy ? 200 : 503).json({
    status: healthy ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    uptime: Math.floor((Date.now() - bootTime) / 1000),
    checks: {
      server: 'ok',
      database: dbStatus,
    },
  });
}

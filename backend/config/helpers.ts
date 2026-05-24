import mongoose from 'mongoose';
import { logger } from '../../utils/logger';
import { validateEnv } from '../../utils/env';

/**
 * @EXPORTS
 */
export { connectWithDB, disconnectFromDB };

/**
 * Instantiates connection with database.
 * Validates required environment variables before connecting.
 * @function connectWithDB
 */
const connectWithDB = (): void => {
  // Validate environment before attempting connection
  const envResult = validateEnv();
  if (!envResult.valid) {
    logger.error('Missing required environment variables', {
      missing: envResult.missing,
    });
    throw new Error(
      `Missing required environment variables: ${envResult.missing.join(', ')}`
    );
  }

  if (mongoose.connection.readyState >= 1) {
    return;
  }

  const dbUri = process.env.DB_URI;
  if (!dbUri) {
    throw new Error('DB_URI is not configured');
  }
  mongoose.connect(dbUri, {}, (err) => {
    if (err) {
      logger.error('MongoDB connection failed', { error: err.message });
      throw err;
    }
    logger.info('Connected to MongoDB');
  });
};

/**
 * Gracefully close the MongoDB connection.
 * Should be called on SIGTERM / SIGINT in production.
 * @function disconnectFromDB
 */
const disconnectFromDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    logger.info('MongoDB connection closed gracefully');
  } catch (error) {
    logger.error('Error closing MongoDB connection', {
      error: (error as Error).message,
    });
  }
};

// Graceful shutdown handlers (only in server context)
if (typeof process !== 'undefined') {
  const shutdown = async (signal: string) => {
    logger.info(`Received ${signal}, shutting down gracefully...`);
    await disconnectFromDB();
    process.exit(0);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

export default connectWithDB;

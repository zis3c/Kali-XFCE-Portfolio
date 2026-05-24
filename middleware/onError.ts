import { NextApiRequest, NextApiResponse } from 'next';
import ErrorHandler from '../utils/errorHandler';

interface MongooseError extends Error {
  statusCode?: number;
  path?: string;
  errors?: Record<string, { message: string }>;
}

/**
 * Middleware catch-all error handler function, executed whenever a middleware throws an error.
 *@function
 *@param {Error, NextApiRequest, NextApiResponse} params - will be automatically inferred from the context of execution
 */
export function onError(
  err: Error,
  req: NextApiRequest,
  res: NextApiResponse
): void {
  const mongooseErr = err as MongooseError;
  mongooseErr.statusCode = mongooseErr.statusCode || 500;

  let error: Error | ErrorHandler = { ...mongooseErr } as Error;

  error.message = err.message;

  // Wrong Mongoose Object ID Error
  if (mongooseErr.name === 'CastError') {
    const message = `Resource not found. Invalid: ${mongooseErr.path}`;
    error = new ErrorHandler(message, 400);
  }

  // Handling Mongoose Validation Error
  if (mongooseErr.name === 'ValidationError' && mongooseErr.errors) {
    const message = Object.values(mongooseErr.errors).map((e) => e.message)[0];
    error = new ErrorHandler(message, 400);
  }

  res.status(mongooseErr.statusCode).json({
    success: false,
    error,
    message: error.message,
    stack: error.stack,
  });
}

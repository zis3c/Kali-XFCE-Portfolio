import { NextApiRequest, NextApiResponse } from 'next';
import { logger } from '../utils/logger';

/**
 * Custom Error Handling Middleware for catching errors in api route controllers
 * @function
 * @import this function in any controller and wrap it
 * @returns error catching boundary for route controllers
 * @shares the error message with the client by sending it as the body of the 500 response
 */

type NextController = (
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) => Promise<unknown>;

export default function catchErrorsFrom(controller: NextController) {
  return async (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<unknown> => {
    return controller(req, res).catch((error) => {
      logger.error('Unhandled controller error', {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });
      return res
        .status(500)
        .json({
          success: 'fail',
          error: error instanceof Error ? error.message : String(error),
        });
    });
  };
}

import { NextApiRequest, NextApiResponse } from 'next';
import { logger } from '../utils/logger';

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
      return res.status(500).json({
        success: 'fail',
        error: error instanceof Error ? error.message : String(error),
      });
    });
  };
}

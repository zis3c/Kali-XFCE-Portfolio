import ErrorHandler from './errorHandler';

describe('ErrorHandler', () => {
  it('creates an error with a message and status code', () => {
    const err = new ErrorHandler('Not Found', 404);
    expect(err).toBeInstanceOf(Error);
    expect(err.message).toBe('Not Found');
    expect(err.statusCode).toBe(404);
  });

  it('captures a stack trace', () => {
    const err = new ErrorHandler('Server Error', 500);
    expect(err.stack).toBeDefined();
    expect(err.stack).toContain('ErrorHandler');
  });

  it('works with different status codes', () => {
    const badRequest = new ErrorHandler('Bad Request', 400);
    const unauthorized = new ErrorHandler('Unauthorized', 401);
    const forbidden = new ErrorHandler('Forbidden', 403);

    expect(badRequest.statusCode).toBe(400);
    expect(unauthorized.statusCode).toBe(401);
    expect(forbidden.statusCode).toBe(403);
  });
});

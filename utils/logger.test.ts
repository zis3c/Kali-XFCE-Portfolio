import { createLogger } from './logger';

describe('logger', () => {
  let consoleDebugSpy: jest.SpyInstance;
  let consoleInfoSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;
  let logger = createLogger();

  beforeEach(() => {
    logger = createLogger();
    consoleDebugSpy = jest.spyOn(console, 'debug').mockImplementation(() => {});
    consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleDebugSpy.mockRestore();
    consoleInfoSpy.mockRestore();
    consoleWarnSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  it('logs info level messages', () => {
    logger.info('App started');
    expect(consoleInfoSpy).toHaveBeenCalledTimes(1);
    expect(consoleInfoSpy.mock.calls[0][0]).toContain('[INFO]');
    expect(consoleInfoSpy.mock.calls[0][0]).toContain('App started');
  });

  it('logs warn level messages', () => {
    logger.warn('Deprecated API');
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy.mock.calls[0][0]).toContain('[WARN]');
    expect(consoleWarnSpy.mock.calls[0][0]).toContain('Deprecated API');
  });

  it('logs error level messages', () => {
    logger.error('Connection failed');
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy.mock.calls[0][0]).toContain('[ERROR]');
    expect(consoleErrorSpy.mock.calls[0][0]).toContain('Connection failed');
  });

  it('logs debug messages in non-production env', () => {
    logger = createLogger(() => 'development');

    logger.debug('Detail here');

    expect(consoleDebugSpy).toHaveBeenCalledTimes(1);
    expect(consoleDebugSpy.mock.calls[0][0]).toContain('[DEBUG]');
    expect(consoleDebugSpy.mock.calls[0][0]).toContain('Detail here');
  });

  it('suppresses debug messages in production', () => {
    logger = createLogger(() => 'production');

    logger.debug('Secret detail');

    expect(consoleDebugSpy).not.toHaveBeenCalled();
  });

  it('includes context in log output', () => {
    logger.info('User action', { userId: '42', action: 'login' });
    expect(consoleInfoSpy).toHaveBeenCalledTimes(1);
    const output = consoleInfoSpy.mock.calls[0][0];
    expect(output).toContain('userId');
    expect(output).toContain('42');
    expect(output).toContain('login');
  });

  it('includes ISO timestamp in log output', () => {
    logger.info('Timestamped');
    const output = consoleInfoSpy.mock.calls[0][0];
    // ISO timestamp pattern: YYYY-MM-DDTHH:mm:ss.sssZ
    expect(output).toMatch(/\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\]/);
  });
});

/**
 * Structured logger for consistent output across the application.
 * Replaces ad-hoc console.log calls with leveled, prefixed logging.
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
}

const formatEntry = (entry: LogEntry): string => {
  const prefix = `[${entry.timestamp}] [${entry.level.toUpperCase()}]`;
  const ctx = entry.context ? ` ${JSON.stringify(entry.context)}` : '';
  return `${prefix} ${entry.message}${ctx}`;
};

type RuntimeEnvGetter = () => string | undefined;

const getRuntimeEnv = (): string | undefined => process.env.NODE_ENV;

export const createLogger = (runtimeEnv: RuntimeEnvGetter = getRuntimeEnv) => {
  const log = (
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>
  ) => {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
    };

    const formatted = formatEntry(entry);

    switch (level) {
      case 'debug':
        if (runtimeEnv() !== 'production') console.debug(formatted);
        break;
      case 'info':
        console.info(formatted);
        break;
      case 'warn':
        console.warn(formatted);
        break;
      case 'error':
        console.error(formatted);
        break;
    }
  };

  return {
    debug: (msg: string, ctx?: Record<string, unknown>) =>
      log('debug', msg, ctx),
    info: (msg: string, ctx?: Record<string, unknown>) =>
      log('info', msg, ctx),
    warn: (msg: string, ctx?: Record<string, unknown>) =>
      log('warn', msg, ctx),
    error: (msg: string, ctx?: Record<string, unknown>) =>
      log('error', msg, ctx),
  };
};

export const logger = createLogger();

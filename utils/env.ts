/**
 * Environment variable validation.
 * Called at application startup to fail fast if required variables are missing
 * rather than crashing at the first incoming request.
 */

const REQUIRED_VARS = [
  'DB_URI',
  'SENDGRID_API_KEY',
  'GOOGLE_EMAIL_ADDRESS',
] as const;

const OPTIONAL_VARS = [
  'NEWS_API_KEY',
  'NEWS_URL_QUERY',
  'NEXT_PUBLIC_DEMO_PASSWORD',
] as const;

export interface EnvValidationResult {
  valid: boolean;
  missing: string[];
  warnings: string[];
}

export const validateEnv = (): EnvValidationResult => {
  const missing: string[] = [];
  const warnings: string[] = [];

  for (const key of REQUIRED_VARS) {
    if (!process.env[key]) {
      missing.push(key);
    }
  }

  for (const key of OPTIONAL_VARS) {
    if (!process.env[key]) {
      warnings.push(`${key} is not set — related features will be disabled.`);
    }
  }

  return {
    valid: missing.length === 0,
    missing,
    warnings,
  };
};

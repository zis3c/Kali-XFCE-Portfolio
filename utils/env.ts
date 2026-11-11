const OPTIONAL_VARS = [
  'NEWS_API_KEY',
  'NEWS_URL_QUERY',
  'NEXT_PUBLIC_DEMO_PASSWORD',
] as const;

interface EnvValidationResult {
  valid: boolean;
  missing: string[];
  warnings: string[];
}

export const validateEnv = (): EnvValidationResult => {
  const warnings = OPTIONAL_VARS.filter((key) => !process.env[key]).map(
    (key) => `${key} is not set — related features will be disabled.`
  );

  return {
    valid: true,
    missing: [],
    warnings,
  };
};

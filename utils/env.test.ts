import { validateEnv, EnvValidationResult } from './env';

const REQUIRED_VARS = ['DB_URI', 'SENDGRID_API_KEY', 'GOOGLE_EMAIL_ADDRESS'];
const OPTIONAL_VARS = ['NEWS_API_KEY', 'NEWS_URL_QUERY', 'NEXT_PUBLIC_DEMO_PASSWORD'];

describe('validateEnv', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('returns valid:true when all required vars are set', () => {
    for (const key of REQUIRED_VARS) {
      process.env[key] = 'some-value';
    }

    const result = validateEnv();
    expect(result.valid).toBe(true);
    expect(result.missing).toHaveLength(0);
  });

  it('returns valid:false and lists missing required vars', () => {
    // Remove all required vars
    for (const key of REQUIRED_VARS) {
      delete process.env[key];
    }

    const result = validateEnv();
    expect(result.valid).toBe(false);
    expect(result.missing).toEqual(REQUIRED_VARS);
  });

  it('returns valid:false for a single missing var', () => {
    for (const key of REQUIRED_VARS) {
      process.env[key] = 'some-value';
    }
    delete process.env['SENDGRID_API_KEY'];

    const result = validateEnv();
    expect(result.valid).toBe(false);
    expect(result.missing).toEqual(['SENDGRID_API_KEY']);
  });

  it('warns about missing optional vars', () => {
    for (const key of REQUIRED_VARS) {
      process.env[key] = 'some-value';
    }
    for (const key of OPTIONAL_VARS) {
      delete process.env[key];
    }

    const result = validateEnv();
    expect(result.valid).toBe(true);
    expect(result.warnings.length).toBe(OPTIONAL_VARS.length);
    for (const warning of result.warnings) {
      expect(warning).toContain('is not set');
    }
  });

  it('returns no warnings when optional vars are set', () => {
    for (const key of REQUIRED_VARS) {
      process.env[key] = 'some-value';
    }
    for (const key of OPTIONAL_VARS) {
      process.env[key] = 'some-value';
    }

    const result = validateEnv();
    expect(result.warnings).toHaveLength(0);
  });
});

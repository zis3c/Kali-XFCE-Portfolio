import { validateEnv } from './env';

const OPTIONAL_VARS = [
  'NEWS_API_KEY',
  'NEWS_URL_QUERY',
  'NEXT_PUBLIC_DEMO_PASSWORD',
];

describe('validateEnv', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('is always valid because no vars are required', () => {
    for (const key of OPTIONAL_VARS) {
      delete process.env[key];
    }

    const result = validateEnv();
    expect(result.valid).toBe(true);
    expect(result.missing).toHaveLength(0);
  });

  it('warns about missing optional vars', () => {
    for (const key of OPTIONAL_VARS) {
      delete process.env[key];
    }

    const result = validateEnv();
    expect(result.warnings.length).toBe(OPTIONAL_VARS.length);
    for (const warning of result.warnings) {
      expect(warning).toContain('is not set');
    }
  });

  it('returns no warnings when optional vars are set', () => {
    for (const key of OPTIONAL_VARS) {
      process.env[key] = 'some-value';
    }

    const result = validateEnv();
    expect(result.warnings).toHaveLength(0);
  });
});

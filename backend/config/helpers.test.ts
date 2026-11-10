import mongoose from 'mongoose';
import { validateEnv } from '../../utils/env';
import { connectWithDB, disconnectFromDB } from './helpers';

jest.mock('mongoose', () => ({
  __esModule: true,
  default: {
    connection: { readyState: 0 },
    connect: jest.fn(),
    disconnect: jest.fn(),
  },
}));

jest.mock('../../utils/env', () => ({
  validateEnv: jest.fn(),
}));

const mongooseMock = mongoose as unknown as {
  connection: { readyState: number };
  connect: jest.Mock;
  disconnect: jest.Mock;
};
const validateEnvMock = validateEnv as jest.Mock;

describe('connectWithDB', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv, DB_URI: 'mongodb://localhost/test' };
    mongooseMock.connection.readyState = 0;
    jest.clearAllMocks();
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('throws when required environment variables are missing', () => {
    validateEnvMock.mockReturnValue({
      valid: false,
      missing: ['DB_URI'],
      warnings: [],
    });

    expect(() => connectWithDB()).toThrow(
      'Missing required environment variables: DB_URI'
    );
    expect(mongooseMock.connect).not.toHaveBeenCalled();
  });

  it('connects to MongoDB when the environment is valid', () => {
    validateEnvMock.mockReturnValue({
      valid: true,
      missing: [],
      warnings: [],
    });

    connectWithDB();

    expect(mongooseMock.connect).toHaveBeenCalledWith(
      'mongodb://localhost/test',
      {},
      expect.any(Function)
    );
  });

  it('does not reconnect when a connection is already open', () => {
    validateEnvMock.mockReturnValue({
      valid: true,
      missing: [],
      warnings: [],
    });
    mongooseMock.connection.readyState = 1;

    connectWithDB();

    expect(mongooseMock.connect).not.toHaveBeenCalled();
  });

  it('throws when DB_URI is missing after validation passes', () => {
    validateEnvMock.mockReturnValue({
      valid: true,
      missing: [],
      warnings: [],
    });
    delete process.env.DB_URI;

    expect(() => connectWithDB()).toThrow('DB_URI is not configured');
  });
});

describe('disconnectFromDB', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('disconnects gracefully', async () => {
    mongooseMock.disconnect.mockResolvedValue(undefined);

    await disconnectFromDB();

    expect(mongooseMock.disconnect).toHaveBeenCalledTimes(1);
  });

  it('swallows disconnect errors after logging', async () => {
    mongooseMock.disconnect.mockRejectedValue(new Error('already closed'));

    await expect(disconnectFromDB()).resolves.toBeUndefined();
  });
});

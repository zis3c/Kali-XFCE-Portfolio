import { getErrorMessage } from './getErrorMessage';
import axios, { InternalAxiosRequestConfig } from 'axios';

describe('getErrorMessage', () => {
  it('extracts message from a standard Error', () => {
    const err = new Error('Something broke');
    expect(getErrorMessage(err)).toBe('Something broke');
  });

  it('extracts message from an Axios error with response data', () => {
    const axiosErr = new axios.AxiosError(
      'Request failed',
      'ERR_BAD_REQUEST',
      undefined,
      undefined,
      {
        status: 400,
        data: { message: 'Invalid input' },
        statusText: 'Bad Request',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      }
    );
    expect(getErrorMessage(axiosErr)).toBe('Invalid input');
  });

  it('falls back to error.message for Axios error without response data', () => {
    const axiosErr = new axios.AxiosError('Network Error');
    expect(getErrorMessage(axiosErr)).toBe('Network Error');
  });

  it('handles non-Error thrown values via JSON.stringify', () => {
    expect(getErrorMessage('plain string')).toBe('"plain string"');
    expect(getErrorMessage(42)).toBe('42');
    expect(getErrorMessage({ code: 'E001' })).toBe('{"code":"E001"}');
  });

  it('handles null gracefully', () => {
    expect(getErrorMessage(null)).toBe('null');
  });
});

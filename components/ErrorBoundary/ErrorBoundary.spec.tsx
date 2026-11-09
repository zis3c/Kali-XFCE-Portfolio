import { mount } from 'enzyme';
import React from 'react';
import ErrorBoundary from './ErrorBoundary';

const Bomb = ({ shouldThrow }: { shouldThrow: boolean }): JSX.Element => {
  if (shouldThrow) {
    throw new Error('kaboom');
  }
  return <div>safe content</div>;
};

describe('ErrorBoundary', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('renders children when there is no error', () => {
    const wrap = mount(
      <ErrorBoundary>
        <Bomb shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(wrap.text()).toContain('safe content');
  });

  it('renders the default fallback when a child throws', () => {
    const wrap = mount(
      <ErrorBoundary>
        <Bomb shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(wrap.text()).toContain('Something went wrong');
    expect(wrap.text()).toContain('kaboom');
    expect(wrap.find('button').text()).toBe('Try again');
  });

  it('renders a custom fallback when provided', () => {
    const wrap = mount(
      <ErrorBoundary fallback={<div>custom fallback</div>}>
        <Bomb shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(wrap.text()).toContain('custom fallback');
  });
});

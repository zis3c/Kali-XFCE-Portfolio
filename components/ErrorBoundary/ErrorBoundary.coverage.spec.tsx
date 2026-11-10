import { mount } from 'enzyme';
import React from 'react';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary recovery', () => {
  let consoleErrorSpy: jest.SpyInstance;
  let shouldThrow = true;

  const Recoverable = () => {
    if (shouldThrow) {
      throw new Error('once');
    }
    return <div>recovered</div>;
  };

  beforeEach(() => {
    shouldThrow = true;
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('recovers after Try again when the child stops throwing', () => {
    const wrap = mount(
      <ErrorBoundary>
        <Recoverable />
      </ErrorBoundary>
    );

    expect(wrap.text()).toContain('Something went wrong');

    shouldThrow = false;
    wrap.find('button').simulate('click');
    wrap.update();

    expect(wrap.text()).toContain('recovered');
  });
});

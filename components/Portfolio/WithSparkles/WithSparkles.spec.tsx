import { mount } from 'enzyme';
import React from 'react';
import WithSparkles from './WithSparkles';
import Sparkle from './Sparkle';

describe('Portfolio WithSparkles', () => {
  beforeEach(() => {
    window.matchMedia = jest.fn().mockReturnValue({
      matches: true,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    });
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders the wrapped children and initial sparkles', () => {
    const wrap = mount(
      <WithSparkles color="#00ffaa">
        <strong>portfolio</strong>
      </WithSparkles>
    );

    expect(wrap.text()).toBe('portfolio');
    expect(wrap.find(Sparkle)).toHaveLength(3);
  });
});

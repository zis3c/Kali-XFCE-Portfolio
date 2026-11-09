import { mount } from 'enzyme';
import React from 'react';
import WithSparkles from './WithSparkles';
import Sparkle from './Sparkle';

describe('WithSparkles', () => {
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
      <WithSparkles color="#ffd700">
        <span>child</span>
      </WithSparkles>
    );

    expect(wrap.text()).toBe('child');
    expect(wrap.find(Sparkle)).toHaveLength(3);
  });
});

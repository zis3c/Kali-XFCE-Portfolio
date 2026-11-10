import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

type MediaListener = (event: MediaQueryListEvent) => void;

const listeners: MediaListener[] = [];
const addListener = jest.fn((listener: MediaListener) => {
  listeners.push(listener);
});
const removeListener = jest.fn((listener: MediaListener) => {
  const index = listeners.indexOf(listener);
  if (index >= 0) listeners.splice(index, 1);
});

const matchMediaMock = (matches: boolean) =>
  jest.fn().mockImplementation(() => ({
    matches,
    addListener,
    removeListener,
  }));

const Harness = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  return <div data-reduced={prefersReducedMotion} />;
};

describe('usePrefersReducedMotion', () => {
  beforeEach(() => {
    listeners.length = 0;
    jest.clearAllMocks();
  });

  it('detects that motion is allowed', () => {
    window.matchMedia = matchMediaMock(true);
    const wrap = mount(<Harness />);

    expect(wrap.find('div').first().prop('data-reduced')).toBe(false);
    expect(addListener).toHaveBeenCalledTimes(1);
  });

  it('detects that motion is reduced', () => {
    window.matchMedia = matchMediaMock(false);
    const wrap = mount(<Harness />);

    expect(wrap.find('div').first().prop('data-reduced')).toBe(true);
  });

  it('updates when the media query changes', () => {
    window.matchMedia = matchMediaMock(false);
    const wrap = mount(<Harness />);

    act(() => {
      listeners[0]({ matches: true } as MediaQueryListEvent);
    });
    wrap.update();

    expect(wrap.find('div').first().prop('data-reduced')).toBe(false);
  });

  it('removes the listener on unmount', () => {
    window.matchMedia = matchMediaMock(false);
    const wrap = mount(<Harness />);

    wrap.unmount();

    expect(removeListener).toHaveBeenCalledTimes(1);
  });
});

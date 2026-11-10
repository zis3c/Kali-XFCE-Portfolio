import { mount } from 'enzyme';
import React, { useRef } from 'react';
import { act } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver';

type ObserverCallback = (entries: Array<{ isIntersecting: boolean }>) => void;

let observerCallback: ObserverCallback = () => undefined;
const observeMock = jest.fn();
const unobserveMock = jest.fn();

class MockIntersectionObserver {
  constructor(callback: ObserverCallback) {
    observerCallback = callback;
  }
  observe = observeMock;
  unobserve = unobserveMock;
  disconnect = jest.fn();
}

const Harness = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible] = useIntersectionObserver(ref, { threshold: 0.5 });
  return <div ref={ref} data-visible={isVisible} />;
};

const NullHarness = () => {
  const [isVisible] = useIntersectionObserver(null, {});
  return <span data-visible={isVisible} />;
};

describe('useIntersectionObserver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.IntersectionObserver =
      MockIntersectionObserver as unknown as typeof IntersectionObserver;
  });

  it('observes the referenced element and tracks visibility', () => {
    const wrap = mount(<Harness />);

    expect(observeMock).toHaveBeenCalledTimes(1);
    expect(wrap.find('div').first().prop('data-visible')).toBe(false);

    act(() => {
      observerCallback([{ isIntersecting: true }]);
    });
    wrap.update();

    expect(wrap.find('div').first().prop('data-visible')).toBe(true);
  });

  it('unobserves the element on unmount', () => {
    const wrap = mount(<Harness />);

    wrap.unmount();

    expect(unobserveMock).toHaveBeenCalledTimes(1);
  });

  it('does nothing when the ref is null', () => {
    const wrap = mount(<NullHarness />);

    expect(observeMock).not.toHaveBeenCalled();
    expect(wrap.find('span').prop('data-visible')).toBe(false);
  });
});

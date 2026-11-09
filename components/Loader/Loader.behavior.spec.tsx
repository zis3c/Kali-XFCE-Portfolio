import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react';
import Loader from './Loader';
import * as Styled from './Loader.styles';

describe('Loader behavior', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it('streams the boot sequence over time', () => {
    const wrap = mount(
      <Loader
        isOnScreen={true}
        loadingDuration={1400}
        onBootComplete={jest.fn()}
      />
    );

    expect(wrap.find(Styled.BootLine)).toHaveLength(0);

    act(() => {
      jest.advanceTimersByTime(200);
    });
    wrap.update();

    expect(wrap.find(Styled.BootLine).length).toBeGreaterThan(0);
    expect(wrap.text()).toContain('Linux version');
  });

  it('calls onBootComplete when the duration elapses', () => {
    const onBootComplete = jest.fn();
    mount(
      <Loader
        isOnScreen={true}
        loadingDuration={1400}
        onBootComplete={onBootComplete}
      />
    );

    act(() => {
      jest.advanceTimersByTime(1400);
    });

    expect(onBootComplete).toHaveBeenCalledTimes(1);
  });

  it('can be skipped with Enter', () => {
    const onBootComplete = jest.fn();
    mount(
      <Loader
        isOnScreen={true}
        loadingDuration={3000}
        onBootComplete={onBootComplete}
      />
    );

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    });

    expect(onBootComplete).toHaveBeenCalledTimes(1);
  });

  it('can be skipped with a click', () => {
    const onBootComplete = jest.fn();
    mount(
      <Loader
        isOnScreen={true}
        loadingDuration={3000}
        onBootComplete={onBootComplete}
      />
    );

    act(() => {
      window.dispatchEvent(new MouseEvent('click'));
    });

    expect(onBootComplete).toHaveBeenCalledTimes(1);
  });

  it('renders nothing when not on screen', () => {
    const wrap = mount(
      <Loader
        isOnScreen={false}
        loadingDuration={3000}
        onBootComplete={jest.fn()}
      />
    );

    expect(wrap.html()).toBeNull();
  });
});

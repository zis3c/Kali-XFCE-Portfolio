import { mount } from 'enzyme';
import React, { act } from 'react';
import ScrollToTopButton from './ScrollToTopButton';
import * as Styled from './PortfolioMode.styles';

describe('ScrollToTopButton', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    });
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders button with scroll-to-top aria-label and icon', () => {
    const wrap = mount(<ScrollToTopButton themeMode="terminal" />);
    const btn = wrap.find(Styled.ScrollToTopFab);
    expect(btn.length).toBe(1);
    expect(btn.prop('aria-label')).toBe('Scroll to top');
  });

  it('becomes visible when window scrolls beyond 300px', () => {
    const wrap = mount(<ScrollToTopButton themeMode="terminal" />);
    expect(wrap.find(Styled.ScrollToTopFab).prop('$visible')).toBe(false);

    act(() => {
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        configurable: true,
        value: 450,
      });
      window.dispatchEvent(new Event('scroll'));
    });
    wrap.update();

    expect(wrap.find(Styled.ScrollToTopFab).prop('$visible')).toBe(true);
  });

  it('calls window.scrollTo on click', () => {
    const wrap = mount(<ScrollToTopButton themeMode="paper" />);
    wrap.find(Styled.ScrollToTopFab).simulate('click');
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('cleans up scroll listener on unmount', () => {
    const removeSpy = jest.spyOn(window, 'removeEventListener');
    const wrap = mount(<ScrollToTopButton themeMode="terminal" />);
    wrap.unmount();
    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    removeSpy.mockRestore();
  });
});

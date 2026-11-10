import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react';
import PortfolioMode from './PortfolioMode';
import * as Styled from './PortfolioMode.styles';

describe('PortfolioMode coverage', () => {
  const originalOpen = window.open;
  const originalScrollBy = window.scrollBy;

  beforeEach(() => {
    jest.useFakeTimers();
    window.open = jest.fn();
    window.scrollBy = jest.fn();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
    window.open = originalOpen;
    window.scrollBy = originalScrollBy;
    document.getElementById('simple-about')?.remove();
  });

  it('scrolls with j and k', () => {
    mount(<PortfolioMode onBackToChooser={jest.fn()} />);

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'j' }));
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k' }));
    });

    expect(window.scrollBy).toHaveBeenNthCalledWith(1, {
      top: 230,
      behavior: 'smooth',
    });
    expect(window.scrollBy).toHaveBeenNthCalledWith(2, {
      top: -230,
      behavior: 'smooth',
    });
  });

  it('wraps project focus to the last card with ArrowLeft', () => {
    const wrap = mount(<PortfolioMode onBackToChooser={jest.fn()} />);

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    });
    wrap.update();

    expect(wrap.find(Styled.ProjectCard).at(22).prop('isFocused')).toBe(true);
  });

  it('runs the Go to About palette action', () => {
    const target = document.createElement('div');
    target.id = 'simple-about';
    target.scrollIntoView = jest.fn();
    document.body.appendChild(target);
    mount(<PortfolioMode onBackToChooser={jest.fn()} />);

    act(() => {
      window.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'k', ctrlKey: true })
      );
    });
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    });

    expect(target.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  it('toggles the theme from the palette', () => {
    const wrap = mount(<PortfolioMode onBackToChooser={jest.fn()} />);

    act(() => {
      window.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'k', ctrlKey: true })
      );
    });
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    });
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    });
    wrap.update();

    expect(wrap.find(Styled.ThemeToggle).prop('aria-label')).toContain(
      'terminal'
    );
  });

  it('closes the palette when the overlay is clicked', () => {
    const wrap = mount(<PortfolioMode onBackToChooser={jest.fn()} />);

    act(() => {
      window.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'k', ctrlKey: true })
      );
    });
    wrap.update();

    wrap.find(Styled.PaletteOverlay).simulate('click');
    wrap.update();

    expect(wrap.find(Styled.PaletteOverlay)).toHaveLength(0);
  });

  it('keeps the palette open when the panel is clicked', () => {
    const wrap = mount(<PortfolioMode onBackToChooser={jest.fn()} />);

    act(() => {
      window.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'k', ctrlKey: true })
      );
    });
    wrap.update();

    wrap.find(Styled.PalettePanel).simulate('click');
    wrap.update();

    expect(wrap.find(Styled.PaletteOverlay)).toHaveLength(1);
  });

  it('runs the glitch text animation to the next word', () => {
    const wrap = mount(<PortfolioMode onBackToChooser={jest.fn()} />);
    const initial = wrap.find(Styled.GlitchLive).text();

    act(() => {
      jest.advanceTimersByTime(5200);
    });
    wrap.update();

    const next = wrap.find(Styled.GlitchLive).text();
    expect(next.length).toBeGreaterThan(0);
    expect(next).not.toBe(initial);
  });
});

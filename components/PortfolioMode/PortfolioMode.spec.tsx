import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react';
import PortfolioMode from './PortfolioMode';
import * as Styled from './PortfolioMode.styles';

describe('PortfolioMode', () => {
  const originalOpen = window.open;

  beforeEach(() => {
    jest.useFakeTimers();
    window.open = jest.fn();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    window.open = originalOpen;
  });

  it('renders all featured projects by default', () => {
    const wrap = mount(<PortfolioMode onBackToChooser={jest.fn()} />);

    expect(wrap.find(Styled.ProjectCard)).toHaveLength(23);
    expect(wrap.text()).toContain('CloudSentinel');
  });

  it('filters projects by tag', () => {
    const wrap = mount(<PortfolioMode onBackToChooser={jest.fn()} />);
    const securityChip = wrap
      .find(Styled.FilterChip)
      .filterWhere((node) => node.text() === 'Security');

    securityChip.simulate('click');

    const cards = wrap.find(Styled.ProjectCard);
    expect(cards.length).toBeGreaterThan(0);
    expect(cards.length).toBeLessThan(23);
  });

  it('toggles between terminal and paper themes', () => {
    const wrap = mount(<PortfolioMode onBackToChooser={jest.fn()} />);
    const toggle = wrap.find(Styled.ThemeToggle);

    expect(toggle.prop('aria-label')).toContain('paper');
    toggle.simulate('click');
    expect(wrap.find(Styled.ThemeToggle).prop('aria-label')).toContain(
      'terminal'
    );
  });

  it('returns to the boot chooser', () => {
    const onBackToChooser = jest.fn();
    const wrap = mount(<PortfolioMode onBackToChooser={onBackToChooser} />);

    wrap.find(Styled.BackButton).simulate('click');

    expect(onBackToChooser).toHaveBeenCalledTimes(1);
  });

  it('opens and closes the command palette with the keyboard', () => {
    const wrap = mount(<PortfolioMode onBackToChooser={jest.fn()} />);

    act(() => {
      window.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'k', ctrlKey: true })
      );
    });
    wrap.update();
    expect(wrap.find(Styled.PaletteOverlay)).toHaveLength(1);

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });
    wrap.update();
    expect(wrap.find(Styled.PaletteOverlay)).toHaveLength(0);
  });

  it('navigates project focus with arrow keys and opens the focused repo', () => {
    const wrap = mount(<PortfolioMode onBackToChooser={jest.fn()} />);

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    });
    wrap.update();
    expect(wrap.find(Styled.ProjectCard).at(1).prop('isFocused')).toBe(true);

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    });

    expect(window.open).toHaveBeenCalledWith(
      'https://github.com/zis3c/RedLilyGO',
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('runs the selected palette action on Enter', () => {
    mount(<PortfolioMode onBackToChooser={jest.fn()} />);

    act(() => {
      window.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'k', ctrlKey: true })
      );
    });

    for (let i = 0; i < 3; i += 1) {
      act(() => {
        window.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'ArrowDown' })
        );
      });
    }

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    });

    expect(window.open).toHaveBeenCalledWith(
      'https://github.com/zis3c',
      '_blank',
      'noopener,noreferrer'
    );
  });
});

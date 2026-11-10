import { mount } from 'enzyme';
import React from 'react';
import { withReduxAndStyledProviders } from '../../test/testUtils';
import PortfolioNav from './PortfolioNav';
import * as Styled from './PortfolioMode.styles';

const setup = (simpleTheme: 'terminal' | 'paper' = 'terminal') => {
  const onToggleTheme = jest.fn();
  const onOpenPalette = jest.fn();
  const onBackToChooser = jest.fn();
  const jumpTo = jest.fn();
  const wrap = mount(
    withReduxAndStyledProviders(
      <PortfolioNav
        simpleTheme={simpleTheme}
        onToggleTheme={onToggleTheme}
        onOpenPalette={onOpenPalette}
        onBackToChooser={onBackToChooser}
        jumpTo={jumpTo}
      />
    )
  );
  return {
    wrap,
    onToggleTheme,
    onOpenPalette,
    onBackToChooser,
    jumpTo,
  };
};

describe('PortfolioNav', () => {
  it('jumps to every chapter', () => {
    const { wrap, jumpTo } = setup();
    const links = [
      ['About', 'simple-about'],
      ['What I Do', 'simple-craft'],
      ['Projects', 'simple-projects'],
      ['Experience', 'simple-journey'],
      ['Skills', 'simple-skills'],
      ['Contact', 'simple-contact'],
    ] as const;

    for (const [label, target] of links) {
      wrap
        .find(Styled.ChapterNav)
        .find('button')
        .filterWhere((node) => node.text() === label)
        .simulate('click');
      expect(jumpTo).toHaveBeenCalledWith(target);
    }
  });

  it('opens the palette and toggles the theme', () => {
    const { wrap, onOpenPalette, onToggleTheme } = setup();

    wrap.find(Styled.PaletteTrigger).simulate('click');
    wrap.find(Styled.ThemeToggle).simulate('click');

    expect(onOpenPalette).toHaveBeenCalledTimes(1);
    expect(onToggleTheme).toHaveBeenCalledTimes(1);
  });

  it('opens the exit confirmation', () => {
    const { wrap, onBackToChooser } = setup();

    wrap.find(Styled.BackButton).simulate('click');

    expect(onBackToChooser).toHaveBeenCalledTimes(1);
  });

  it('renders the paper theme actions', () => {
    const { wrap } = setup('paper');

    expect(wrap.find(Styled.ThemeToggle).prop('aria-label')).toContain(
      'terminal'
    );
  });
});

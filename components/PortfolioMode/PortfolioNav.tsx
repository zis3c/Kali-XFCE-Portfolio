import React from 'react';
import { FiCommand, FiMoon, FiPower, FiSun } from 'react-icons/fi';
import * as Styled from './PortfolioMode.styles';
import type { SimpleTheme } from './PortfolioMode.data';

interface Props {
  simpleTheme: SimpleTheme;
  onToggleTheme: () => void;
  onOpenPalette: () => void;
  onBackToChooser: () => void;
  jumpTo: (id: string) => void;
}

const PortfolioNav = ({
  simpleTheme,
  onToggleTheme,
  onOpenPalette,
  onBackToChooser,
  jumpTo,
}: Props): JSX.Element => (
  <Styled.Nav>
    <Styled.BrandGroup>
      <Styled.StatusLed title="Online" />
      <Styled.Brand>
        <span>Radzi (zis3c)</span>
      </Styled.Brand>
    </Styled.BrandGroup>

    <Styled.ChapterNav aria-label="Portfolio sections">
      <button type="button" onClick={() => jumpTo('simple-about')}>
        About
      </button>
      <button type="button" onClick={() => jumpTo('simple-craft')}>
        What I Do
      </button>
      <button type="button" onClick={() => jumpTo('simple-projects')}>
        Projects
      </button>
      <button type="button" onClick={() => jumpTo('simple-journey')}>
        Experience
      </button>
      <button type="button" onClick={() => jumpTo('simple-skills')}>
        Skills
      </button>
      <button type="button" onClick={() => jumpTo('simple-contact')}>
        Contact
      </button>
    </Styled.ChapterNav>

    <Styled.NavActions>
      <Styled.PaletteTrigger
        type="button"
        onClick={onOpenPalette}
        aria-label="Open command palette"
        title="Command Palette (Ctrl+K)"
      >
        <FiCommand />
      </Styled.PaletteTrigger>

      <Styled.ThemeToggle
        type="button"
        onClick={onToggleTheme}
        aria-label={
          simpleTheme === 'terminal'
            ? 'Switch to paper light theme'
            : 'Switch to terminal dark theme'
        }
        title={
          simpleTheme === 'terminal'
            ? 'Switch to Light Theme'
            : 'Switch to Dark Theme'
        }
      >
        {simpleTheme === 'terminal' ? <FiSun /> : <FiMoon />}
      </Styled.ThemeToggle>

      <Styled.BackButton
        type="button"
        onClick={onBackToChooser}
        aria-label="Open system boot menu"
        title="Return to Boot Menu / Kali Linux"
      >
        <FiPower />
      </Styled.BackButton>
    </Styled.NavActions>
  </Styled.Nav>
);

export default PortfolioNav;

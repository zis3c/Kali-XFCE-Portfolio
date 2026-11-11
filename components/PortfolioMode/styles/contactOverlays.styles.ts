import styled, { createGlobalStyle } from 'styled-components';
import type { SimpleTheme } from '../PortfolioMode.data';

/* ------------------------------------------------------------------ */
/*  Section 6: Contact & Footer                                        */
/* ------------------------------------------------------------------ */

export const ContactSection = styled.section`
  min-height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  padding: 40px 0;
  scroll-snap-align: start;
  scroll-margin-top: 64px;

  /* Smooth scroll reveal */
  opacity: 1;
  animation: sectionAppear 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-timeline: view();
  animation-range: entry 10% cover 30%;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: none;
  }

  @media (max-width: 768px) {
    min-height: auto;
    padding: 48px 0 32px;
  }
`;

export const CommsTerminal = styled.footer`
  border: 1px solid var(--border-strong);
  border-radius: 12px;
  background: var(--panel);
  box-shadow: var(--card-shadow);
  overflow: hidden;
`;

export const CommsBody = styled.div`
  padding: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;

  @media (max-width: 640px) {
    padding: 22px 18px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const CommsInfo = styled.div`
  flex: 1;
  min-width: 280px;

  h3 {
    margin: 0 0 8px 0;
    font-size: 20px;
    font-weight: 700;
    color: var(--text);
  }

  p {
    margin: 0;
    font-size: 14.5px;
    color: var(--muted);
    line-height: 1.6;
  }
`;

export const HotkeyBar = styled.div`
  padding: 12px 32px;
  background: var(--well);
  border-top: 1px solid var(--border-strong);
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  font-size: 12px;
  color: var(--muted);

  span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
  }

  kbd {
    padding: 2px 6px;
    border-radius: 4px;
    border: 1px solid var(--border-strong);
    background: var(--panel);
    color: var(--text);
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    font-weight: 600;
  }

  @media (max-width: 640px) {
    padding: 12px 18px;
    gap: 10px;
  }
`;

/* ------------------------------------------------------------------ */
/*  Command Palette                                                    */
/* ------------------------------------------------------------------ */

export const PaletteOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 12vh;
  z-index: 100;
`;

export const PalettePanel = styled.div`
  width: min(540px, calc(100vw - 32px));
  border: 1px solid var(--border-strong);
  background: var(--panel);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
  border-radius: 12px;
  padding: 12px;
`;

export const PaletteTitle = styled.div`
  color: var(--muted);
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 8px;
  padding: 4px 8px 8px;
  border-bottom: 1px solid var(--border-strong);
`;

export const PaletteItem = styled.div<{ isActive: boolean }>`
  width: 100%;
  text-align: left;
  border: 1px solid
    ${({ isActive }) => (isActive ? 'var(--border-hover)' : 'transparent')};
  border-radius: 8px;
  background: ${({ isActive }) => (isActive ? 'var(--well)' : 'transparent')};
  color: var(--text);
  padding: 10px 12px;
  font-size: 13.5px;
  font-weight: 500;
  cursor: pointer;
`;

/* ------------------------------------------------------------------ */
/*  Footer Component                                                   */
/* ------------------------------------------------------------------ */

export const Footer = styled.footer`
  position: relative;
  z-index: 2;
  border-top: 1px solid var(--border-strong);
  background: var(--panel);
  padding: 24px 36px;

  @media (max-width: 900px) {
    padding: 20px 20px;
  }
`;

export const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

export const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 24px;
`;

export const FooterBrand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 440px;

  .brand-header {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    font-weight: 700;
    color: var(--text);
  }

  .brand-desc {
    font-size: 13.5px;
    color: var(--muted);
    line-height: 1.6;
    margin: 0;
  }

  .brand-location {
    font-size: 12px;
    color: var(--muted);
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: 'JetBrains Mono', Consolas, monospace;
  }
`;

export const FooterNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 14px;

  @media (max-width: 768px) {
    align-items: flex-start;
  }
`;

export const FooterLinksRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  button {
    background: transparent;
    border: none;
    padding: 0;
    font-size: 13.5px;
    font-weight: 500;
    color: var(--muted);
    cursor: pointer;
    transition: color 0.15s ease;

    &:hover {
      color: var(--text);
    }
  }
`;

export const BackToTopButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: var(--well);
  border: 1px solid var(--border-strong);
  border-radius: 8px;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--text);
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: var(--border-strong);
  }
`;

export const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  padding-top: 0;
  border-top: none;
  font-size: 12.5px;
  color: var(--muted);
`;

export const FooterSocialList = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  a {
    color: var(--muted);
    font-size: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: color 0.15s ease, transform 0.15s ease;

    &:hover {
      color: var(--text);
      transform: translateY(-2px);
    }
  }
`;

/* ------------------------------------------------------------------ */
/*  Monochrome Scrollbar & Floating Scroll-To-Top Button               */
/* ------------------------------------------------------------------ */

export const PortfolioGlobalScrollbar = createGlobalStyle<{
  themeMode: SimpleTheme;
}>`
  html, body {
    scrollbar-color: ${({ themeMode }) =>
      themeMode === 'terminal' ? '#3f3f46 #09090b' : '#a1a1aa #f4f4f5'};
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ themeMode }) =>
      themeMode === 'terminal' ? '#09090b' : '#f4f4f5'};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ themeMode }) =>
      themeMode === 'terminal'
        ? 'rgba(255, 255, 255, 0.25)'
        : 'rgba(0, 0, 0, 0.25)'};
    border-radius: 4px;
    border: 2px solid
      ${({ themeMode }) => (themeMode === 'terminal' ? '#09090b' : '#f4f4f5')};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ themeMode }) =>
      themeMode === 'terminal'
        ? 'rgba(255, 255, 255, 0.5)'
        : 'rgba(0, 0, 0, 0.5)'};
  }

  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none;
    mix-blend-mode: normal;
  }
`;

export const ScrollToTopFab = styled.button<{
  themeMode: SimpleTheme;
  $visible: boolean;
}>`
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 50;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid
    ${({ themeMode }) =>
      themeMode === 'terminal'
        ? 'rgba(255, 255, 255, 0.2)'
        : 'rgba(0, 0, 0, 0.15)'};
  background: ${({ themeMode }) =>
    themeMode === 'terminal'
      ? 'rgba(10, 10, 12, 0.75)'
      : 'rgba(255, 255, 255, 0.85)'};
  color: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#fafafa' : '#09090b'};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: ${({ themeMode }) =>
    themeMode === 'terminal'
      ? '0 8px 24px rgba(0, 0, 0, 0.6)'
      : '0 8px 24px rgba(0, 0, 0, 0.1)'};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) =>
    $visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.85)'};
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
  transition: opacity 0.25s ease, transform 0.25s ease, background 0.2s ease,
    border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background: ${({ themeMode }) =>
      themeMode === 'terminal' ? '#18181b' : '#ffffff'};
    border-color: ${({ themeMode }) =>
      themeMode === 'terminal'
        ? 'rgba(255, 255, 255, 0.5)'
        : 'rgba(0, 0, 0, 0.35)'};
    transform: translateY(-3px) scale(1.05);
    box-shadow: ${({ themeMode }) =>
      themeMode === 'terminal'
        ? '0 12px 28px rgba(0, 0, 0, 0.8)'
        : '0 12px 28px rgba(0, 0, 0, 0.16)'};
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 3px;
  }

  svg {
    width: 20px;
    height: 20px;
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translateY(-2px);
  }

  @media (max-width: 640px) {
    bottom: 20px;
    right: 20px;
    width: 42px;
    height: 42px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

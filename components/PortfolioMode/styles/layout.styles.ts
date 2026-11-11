import styled, { keyframes } from 'styled-components';
import type { SimpleTheme } from '../PortfolioMode.data';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const pulseBar = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(250%);
  }
`;

/* ------------------------------------------------------------------ */
/*  Next.js Minimalist Monochrome Palette (Black / Zinc / Crisp White) */
/* ------------------------------------------------------------------ */

export const Wrapper = styled.section<{ themeMode: SimpleTheme }>`
  /* Surfaces */
  --bg: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#000000' : '#fafafa'};
  --panel: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#0a0a0a' : '#ffffff'};
  --well: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#121214' : '#f4f4f5'};
  --well-hover: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#1c1c1f' : '#e4e4e7'};

  /* Typography (WCAG AA verified) */
  --text: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#fafafa' : '#09090b'};
  --muted: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#a1a1aa' : '#52525b'};

  /* Borders & Subtle Elevation */
  --border-strong: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#222225' : '#e4e4e7'};
  --border-subtle: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#18181b' : '#f4f4f5'};
  --border-hover: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#52525b' : '#a1a1aa'};
  --focus-ring: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#fafafa' : '#09090b'};

  /* High-Contrast Monochrome Primary Controls */
  --btn-primary-bg: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#fafafa' : '#09090b'};
  --btn-primary-text: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#09090b' : '#fafafa'};
  --btn-primary-hover: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#d4d4d8' : '#27272a'};

  --card-shadow: ${({ themeMode }) =>
    themeMode === 'terminal'
      ? '0 2px 8px rgba(0, 0, 0, 0.45)'
      : '0 2px 8px rgba(0, 0, 0, 0.04)'};

  min-height: 100vh;
  background-color: var(--bg);
  color: var(--text);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter',
    sans-serif;
  overflow-x: hidden;
  scroll-behavior: smooth;

  ::selection,
  *::selection {
    background: ${({ themeMode }) =>
      themeMode === 'terminal'
        ? 'rgba(96, 165, 250, 0.35)'
        : 'rgba(59, 130, 246, 0.25)'};
    color: inherit;
  }
`;

/* ------------------------------------------------------------------ */
/*  Mock Boot Load Spinner Overlay                                     */
/* ------------------------------------------------------------------ */

export const BootLoaderOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 90;
  background: rgba(5, 5, 5, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const BootLoaderCard = styled.div`
  width: min(420px, 100%);
  background: #0a0a0a;
  border: 1px solid #262626;
  border-radius: 12px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 14px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.65);

  .spinner-ring {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 3px solid #262626;
    border-top-color: #fafafa;
    animation: ${spin} 0.7s linear infinite;
  }

  .spinner-title {
    margin: 0;
    font-size: 15px;
    font-weight: 600;
    color: #fafafa;
  }

  .spinner-sub {
    margin: 0;
    font-size: 12.5px;
    color: #a1a1aa;
  }

  .spinner-bar {
    width: 100%;
    height: 4px;
    background: #1a1a1a;
    border-radius: 999px;
    overflow: hidden;
    position: relative;
    margin-top: 4px;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 45%;
      height: 100%;
      background: #fafafa;
      border-radius: 999px;
      animation: ${pulseBar} 1s ease-in-out infinite;
    }
  }
`;

/* ------------------------------------------------------------------ */
/*  Top Navigation Bar                                                 */
/* ------------------------------------------------------------------ */

export const Nav = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 16px 36px;
  border-bottom: 1px solid var(--border-strong);
  background: var(--panel);
  position: sticky;
  top: 0;
  z-index: 20;

  @media (max-width: 900px) {
    padding: 14px 20px;
  }

  @media (max-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 14px;
  }
`;

export const BrandGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
`;

export const StatusLed = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  flex-shrink: 0;
`;

export const Brand = styled.div`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.3px;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
`;

export const ChapterNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 6px;

  button {
    min-height: 38px;
    padding: 6px 14px;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 8px;
    color: var(--muted);
    font-family: inherit;
    font-size: 13.5px;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.15s ease, background 0.15s ease;

    &:hover {
      color: var(--text);
      background: var(--well);
    }

    &:focus-visible {
      outline: 2px solid var(--focus-ring);
      outline-offset: 2px;
    }
  }

  @media (max-width: 980px) {
    display: none;
  }
`;

export const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 640px) {
    gap: 6px;
  }
`;

export const PaletteTrigger = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  min-height: 40px;
  min-width: 40px;
  padding: 0;
  border: 1px solid var(--border-strong);
  background: var(--well);
  color: var(--text);
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: border-color 0.15s ease, background 0.15s ease;

  &:hover {
    border-color: var(--border-hover);
    background: var(--well-hover);
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
  }

  @media (max-width: 640px) {
    width: 36px;
    height: 36px;
    min-width: 36px;
    min-height: 36px;
    font-size: 14px;
  }
`;

export const ThemeToggle = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  min-height: 40px;
  min-width: 40px;
  padding: 0;
  border: 1px solid var(--border-strong);
  background: var(--panel);
  color: var(--text);
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: border-color 0.15s ease, background 0.15s ease;

  &:hover {
    border-color: var(--border-hover);
    background: var(--well);
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
  }

  @media (max-width: 640px) {
    width: 36px;
    height: 36px;
    min-width: 36px;
    min-height: 36px;
    font-size: 14px;
  }
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  min-height: 40px;
  min-width: 40px;
  padding: 0;
  border: 1px solid var(--btn-primary-bg);
  background: var(--btn-primary-bg);
  color: var(--btn-primary-text);
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.15s ease;

  &:hover {
    background: var(--btn-primary-hover);
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
  }

  @media (max-width: 640px) {
    width: 36px;
    height: 36px;
    min-width: 36px;
    min-height: 36px;
    font-size: 14px;
  }
`;

/* ------------------------------------------------------------------ */
/*  Main Container (Spacious & Breathable)                             */
/* ------------------------------------------------------------------ */

export const Main = styled.main`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px 32px;

  @media (max-width: 900px) {
    padding: 0 20px 24px;
  }

  @media (max-width: 640px) {
    padding: 0 16px 20px;
  }
`;

export const StorySection = styled.section`
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

  @keyframes sectionAppear {
    from {
      opacity: 0.3;
      transform: translateY(22px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

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

export const SectionHeader = styled.div`
  text-align: left;
  margin-bottom: 24px;
  width: 100%;
`;

export const SectionTitle = styled.h2`
  font-size: clamp(22px, 2.8vw, 28px);
  font-weight: 700;
  letter-spacing: -0.6px;
  margin: 0 0 8px 0;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SectionSubtitle = styled.p`
  margin: 0;
  font-size: 15px;
  color: var(--muted);
  line-height: 1.65;
  width: 100%;
`;

/* ------------------------------------------------------------------ */
/*  Section 1: Minimalist Hero                                         */
/* ------------------------------------------------------------------ */

export const HeroWorkbench = styled.section`
  min-height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  padding: 40px 0;
  scroll-snap-align: start;
  scroll-margin-top: 64px;

  @media (max-width: 768px) {
    min-height: auto;
    padding: 48px 0 32px;
  }
`;

export const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
`;

export const HeroTitle = styled.h1`
  margin: 0;
  font-size: clamp(28px, 5vw, 52px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -1.5px;
  color: var(--text);

  @media (max-width: 640px) {
    font-size: clamp(24px, 6.2vw, 30px);
    letter-spacing: -0.9px;
    line-height: 1.15;
  }
`;

export const HeroRoleSub = styled.p`
  margin: 4px 0 0;
  font-size: clamp(15px, 1.8vw, 18px);
  font-weight: 600;
  color: var(--text);
`;

export const HeroText = styled.p`
  margin: 4px 0 0;
  color: var(--muted);
  font-size: clamp(15.5px, 1.6vw, 17px);
  line-height: 1.75;
  width: 100%;
`;

export const SocialGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 12px;

  @media (max-width: 640px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
`;

export const SocialButton = styled.a<{ iconColor?: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  padding: 10px 16px;
  background: var(--panel);
  color: var(--text);
  border: 1px solid var(--border-strong);
  border-radius: 8px;
  font-size: 13.5px;
  font-weight: 500;
  text-decoration: none;
  transition: border-color 0.15s ease, background 0.15s ease,
    transform 0.1s ease;

  svg {
    color: ${({ iconColor }) => iconColor || 'var(--text)'};
    font-size: 15px;
    flex-shrink: 0;
  }

  &:hover {
    border-color: var(--border-hover);
    background: var(--well);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
  }
`;

export const QuickStatsGrid = styled.div`
  margin-top: 36px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const QuickStatCard = styled.div`
  padding: 16px 20px;
  background: var(--panel);
  border: 1px solid var(--border-strong);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  min-width: 0;

  .stat-label {
    font-size: 12px;
    font-weight: 500;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.4px;
    white-space: nowrap;
  }

  .stat-value {
    font-size: clamp(14px, 1.15vw, 15px);
    font-weight: 700;
    color: var(--text);
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

/* ------------------------------------------------------------------ */
/*  Section 2: What I Do (3 Spacious Cards)                            */
/* ------------------------------------------------------------------ */

export const PillarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const PillarCard = styled.article<{ iconColor?: string }>`
  background: var(--panel);
  border: 1px solid var(--border-strong);
  border-radius: 12px;
  padding: 28px;
  box-shadow: var(--card-shadow);
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: border-color 0.18s ease, transform 0.18s ease;

  &:hover {
    border-color: var(--border-hover);
    transform: translateY(-2px);
  }

  .pillar-icon {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: var(--well);
    border: 1px solid var(--border-strong);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: ${({ iconColor }) => iconColor || 'var(--text)'};
  }

  h3 {
    margin: 4px 0 0;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.3px;
    color: var(--text);
  }

  p {
    margin: 0;
    font-size: 14.5px;
    line-height: 1.7;
    color: var(--muted);
  }

  .pillar-tags {
    margin-top: auto;
    padding-top: 14px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    font-size: 12px;
    color: var(--text);
    font-weight: 500;
  }

  .pillar-tag {
    padding: 4px 10px;
    border-radius: 6px;
    background: var(--well);
    border: 1px solid var(--border-strong);
  }
`;

/* ------------------------------------------------------------------ */
/*  Glitch Text                                                        */
/* ------------------------------------------------------------------ */

export const GlitchWrap = styled.span`
  display: inline-grid;
  position: relative;
  max-width: 100%;
`;

export const GlitchGhost = styled.span`
  visibility: hidden;
  white-space: nowrap;
  grid-area: 1 / 1;

  @media (max-width: 700px) {
    white-space: normal;
    overflow-wrap: break-word;
  }

  @media (max-width: 480px) {
    min-height: 2.3em;
  }
`;

export const GlitchLive = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  white-space: nowrap;

  &::after {
    content: '';
    display: inline-block;
    width: 2px;
    height: 1.1em;
    vertical-align: -0.15em;
    margin-left: 4px;
    background-color: currentColor;
    opacity: 0.8;
    animation: glitchCursorBlink 1s infinite;
  }

  @keyframes glitchCursorBlink {
    0%,
    50% {
      opacity: 0.8;
    }
    51%,
    100% {
      opacity: 0;
    }
  }

  @media (max-width: 700px) {
    white-space: normal;
    overflow-wrap: break-word;
  }
`;

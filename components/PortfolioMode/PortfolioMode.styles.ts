import styled from 'styled-components';

type SimpleTheme = 'terminal' | 'paper';

/* ------------------------------------------------------------------ */
/*  Wrapper & Chrome                                                   */
/* ------------------------------------------------------------------ */

export const Wrapper = styled.section<{ themeMode: SimpleTheme }>`
  --bg: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#000000' : '#f4f5f7'};
  --text: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#ffffff' : '#16181d'};
  --muted: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#a1a1aa' : '#4b5563'};
  --panel: ${({ themeMode }) =>
    themeMode === 'terminal'
      ? 'rgba(0, 0, 0, 0.8)'
      : 'rgba(255, 255, 255, 0.9)'};
  --panel-border: ${({ themeMode }) =>
    themeMode === 'terminal' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.12)'};
  --card-bg: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#0a0a0a' : '#ffffff'};
  --card-border: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#1f1f1f' : '#d1d5db'};
  --chip-bg: ${({ themeMode }) =>
    themeMode === 'terminal' ? 'rgba(255,255,255,0.04)' : '#eef2f7'};
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  overflow-x: hidden;
  scroll-behavior: smooth;
`;

export const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 32px;
  border-bottom: 1px solid var(--panel-border);
  background: var(--panel);
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 10;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    padding: 12px;
  }
`;

export const Brand = styled.div`
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 0.5px;
  color: var(--text);

  @media (max-width: 700px) {
    font-size: 17px;
    text-align: center;
  }
`;

export const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 700px) {
    width: 100%;
    gap: 8px;
  }
`;

export const ThemeToggle = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  border: 1px solid var(--panel-border);
  background: var(--chip-bg);
  color: var(--text);
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;

  @media (max-width: 700px) {
    flex: 1;
    min-height: 38px;

    .btn-label {
      display: none;
    }
  }
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  border: 1px solid #ffffff;
  background: #ffffff;
  color: #000000;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: #eaeaea;
    color: #000000;
  }

  @media (max-width: 700px) {
    flex: 1;
    min-height: 38px;

    .btn-label {
      display: none;
    }
  }
`;

export const Main = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: 80px 24px;

  @media (max-width: 700px) {
    padding: 30px 14px 44px;
  }
`;

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 60px;
  width: 100%;
`;

export const HeroBadge = styled.div`
  display: inline-block;
  padding: 6px 12px;
  background: #ffffff;
  color: #000000;
  border-radius: 0px;
  font-size: 13px;
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  font-weight: bold;
  margin-bottom: 24px;
  letter-spacing: 0.5px;
`;

export const HeroTitle = styled.h2`
  margin: 0;
  font-size: clamp(28px, 8.5vw, 56px);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -1.5px;
  color: var(--text);
`;

export const HeroText = styled.p`
  margin: 24px 0 0;
  color: var(--muted);
  font-size: 20px;
  line-height: 1.6;
  max-width: 840px;
  text-align: justify;

  @media (max-width: 600px) {
    font-size: 17px;
    text-align: left;
  }
`;

/* ------------------------------------------------------------------ */
/*  Stats                                                              */
/* ------------------------------------------------------------------ */

export const StatsStrip = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;

  @media (max-width: 700px) {
    gap: 8px;
  }
`;

export const StatPill = styled.div`
  font-size: 12px;
  color: var(--text);
  border: 1px solid var(--panel-border);
  background: var(--chip-bg);
  padding: 7px 10px;
  border-radius: 999px;

  @media (max-width: 700px) {
    font-size: 11px;
    padding: 6px 8px;
  }
`;

/* ------------------------------------------------------------------ */
/*  Cards                                                              */
/* ------------------------------------------------------------------ */

export const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.article<{
  accentColor?: string;
  colSpan?: number;
  rowSpan?: number;
}>`
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-top: 2px solid ${({ accentColor }) => accentColor || '#333'};
  border-radius: 12px;
  padding: 32px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
  overflow: hidden;

  grid-column: span ${({ colSpan }) => colSpan || 1};
  grid-row: span ${({ rowSpan }) => rowSpan || 1};

  @media (max-width: 900px) {
    grid-column: span ${({ colSpan }) => Math.min(colSpan || 1, 2)};
  }

  @media (max-width: 600px) {
    grid-column: span 1;
    grid-row: span 1;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(
      180deg,
      ${({ accentColor }) =>
        accentColor ? `${accentColor}1A` : 'transparent'},
      transparent
    );
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px -10px ${({ accentColor }) => (accentColor ? `${accentColor}33` : 'rgba(0,0,0,0.5)')};
  }
`;

export const CardTitle = styled.h3<{ accentColor?: string }>`
  margin: 0;
  font-size: 22px;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 12px;

  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    background: ${({ accentColor }) => accentColor || '#ffffff'};
    border-radius: 50%;
    box-shadow: 0 0 10px ${({ accentColor }) => accentColor || '#ffffff'};
  }
`;

export const CardText = styled.p`
  margin: 16px 0 0;
  color: var(--muted);
  font-size: 16px;
  line-height: 1.6;
`;

export const CardMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 18px;
`;

export const MetaItem = styled.div`
  color: var(--text);
  font-size: 13px;
  line-height: 1.5;
  border: 1px solid var(--panel-border);
  background: var(--chip-bg);
  padding: 8px 10px;
  border-radius: 8px;
`;

/* ------------------------------------------------------------------ */
/*  Social                                                             */
/* ------------------------------------------------------------------ */

export const SocialGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;

  @media (max-width: 700px) {
    width: 100%;
    gap: 8px;
  }
`;

export const SocialButton = styled.a<{ bg: string; hoverBg: string }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${({ bg }) => bg};
  color: #ffffff;
  padding: 10px 16px;
  border-radius: 6px;
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    background: ${({ hoverBg }) => hoverBg};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 700px) {
    flex: 1 1 calc(50% - 6px);
    justify-content: center;
    min-height: 38px;
    padding: 8px 10px;
    font-size: 12px;
  }
`;

/* ------------------------------------------------------------------ */
/*  Filter / Projects                                                  */
/* ------------------------------------------------------------------ */

export const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;

  @media (max-width: 700px) {
    gap: 8px;
  }
`;

export const FilterChip = styled.button<{ isActive: boolean }>`
  border: 1px solid
    ${({ isActive }) => (isActive ? '#22c55e' : 'var(--panel-border)')};
  background: ${({ isActive }) =>
    isActive ? 'rgba(34,197,94,0.2)' : 'var(--chip-bg)'};
  color: var(--text);
  padding: 7px 12px;
  border-radius: 999px;
  font-size: 12px;
  cursor: pointer;

  @media (max-width: 700px) {
    font-size: 11px;
    padding: 6px 10px;
  }
`;

export const ProjectsSection = styled.section`
  margin-top: 36px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const ProjectCard = styled.article<{
  accentColor: string;
  isFocused: boolean;
}>`
  border: 1px solid var(--panel-border);
  border-left: 1px solid var(--panel-border);
  border-radius: 12px;
  background: linear-gradient(
    160deg,
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.015)
  );
  padding: 22px;
  backdrop-filter: blur(4px);
  transition: transform 0.25s ease, border-color 0.2s ease,
    box-shadow 0.25s ease;
  animation: projectReveal 0.5s ease both;
  transform-origin: center;

  &:hover {
    transform: translateY(-4px) rotateX(2deg) rotateY(-1deg);
    border-color: ${({ accentColor }) => accentColor};
    border-left-color: ${({ accentColor }) => accentColor};
    box-shadow: 0 18px 30px rgba(0, 0, 0, 0.18),
      0 0 0 1px ${({ accentColor }) => `${accentColor}AA`},
      0 0 20px ${({ accentColor }) => `${accentColor}66`};
  }

  @keyframes projectReveal {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const ProjectHeader = styled.div`
  margin-bottom: 10px;
`;

export const ProjectName = styled.h4`
  margin: 0;
  color: var(--text);
  font-size: 20px;
  letter-spacing: -0.3px;
`;

export const ProjectStack = styled.div`
  margin-top: 6px;
  color: #93c5fd;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.55px;
`;

export const ProjectSummary = styled.p`
  margin: 0;
  color: var(--muted);
  line-height: 1.6;
  font-size: 14px;
`;

export const ProjectHighlights = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
`;

export const ProjectHighlight = styled.span`
  font-size: 12px;
  color: var(--text);
  border: 1px solid var(--panel-border);
  padding: 5px 8px;
  border-radius: 999px;
  background: var(--chip-bg);
`;

export const ProjectOpenLink = styled.a`
  display: inline-flex;
  margin-top: 14px;
  color: #22c55e;
  text-decoration: none;
  font-size: 12px;
  border-bottom: 1px dashed rgba(34, 197, 94, 0.5);
`;

/* ------------------------------------------------------------------ */
/*  Command Palette                                                    */
/* ------------------------------------------------------------------ */

export const PaletteOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.56);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 12vh;
  z-index: 100;
`;

export const PalettePanel = styled.div`
  width: min(620px, calc(100vw - 32px));
  border: 1px solid var(--panel-border);
  background: var(--card-bg);
  border-radius: 10px;
  padding: 12px;
`;

export const PaletteTitle = styled.div`
  color: var(--muted);
  font-size: 12px;
  margin-bottom: 8px;
`;

export const PaletteItem = styled.div<{ isActive: boolean }>`
  width: 100%;
  text-align: left;
  border: 1px solid ${({ isActive }) => (isActive ? '#22c55e' : 'transparent')};
  border-radius: 8px;
  background: ${({ isActive }) =>
    isActive ? 'rgba(34,197,94,0.16)' : 'transparent'};
  color: var(--text);
  padding: 9px 10px;
  font-size: 13px;
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
    overflow-wrap: anywhere;
    word-break: break-word;
  }
`;

export const GlitchLive = styled.span`
  grid-area: 1 / 1;
  white-space: nowrap;

  @media (max-width: 700px) {
    white-space: normal;
    overflow-wrap: anywhere;
    word-break: break-word;
  }
`;

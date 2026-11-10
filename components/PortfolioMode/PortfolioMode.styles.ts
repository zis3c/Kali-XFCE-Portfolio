import styled from 'styled-components';

type SimpleTheme = 'terminal' | 'paper';

/* ------------------------------------------------------------------ */
/*  Root Workstation Chassis & Theme Tokens                            */
/* ------------------------------------------------------------------ */

export const Wrapper = styled.section<{ themeMode: SimpleTheme }>`
  /* Core Neutral Chassis (3 tones) */
  --bg: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#090b0e' : '#f4f1ea'};
  --panel: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#11151c' : '#ffffff'};
  --well: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#0c0f14' : '#ebe6dc'};

  /* Typography (WCAG AA verified via contrast-check.py) */
  --text: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#f1f5f9' : '#0f172a'};
  --muted: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#94a3b8' : '#334155'};

  /* Primary Phosphor Accent + Secondary Hardware Register Accent */
  --accent: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#4ade80' : '#15803d'};
  --accent-strong: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#22c55e' : '#166534'};
  --accent-tint: ${({ themeMode }) =>
    themeMode === 'terminal' ? 'rgba(74, 222, 128, 0.12)' : '#f0fdf4'};
  --accent-border: ${({ themeMode }) =>
    themeMode === 'terminal' ? 'rgba(74, 222, 128, 0.45)' : '#86efac'};

  --amber: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#fbbf24' : '#92400e'};
  --amber-tint: ${({ themeMode }) =>
    themeMode === 'terminal' ? 'rgba(251, 191, 36, 0.12)' : '#fffbeb'};
  --amber-border: ${({ themeMode }) =>
    themeMode === 'terminal' ? 'rgba(251, 191, 36, 0.4)' : '#fcd34d'};

  /* Hardware Borders & Tactile 3D Bevels */
  --border-strong: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#334155' : '#1e293b'};
  --border-subtle: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#1e293b' : '#cbd5e1'};
  --bevel-light: ${({ themeMode }) =>
    themeMode === 'terminal'
      ? 'rgba(255, 255, 255, 0.08)'
      : 'rgba(255, 255, 255, 0.9)'};
  --bevel-shadow: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#040507' : '#cbd5e1'};
  --card-shadow: ${({ themeMode }) =>
    themeMode === 'terminal' ? '4px 4px 0px #040507' : '4px 4px 0px #cbd5e1'};
  --keycap-shadow: ${({ themeMode }) =>
    themeMode === 'terminal'
      ? '0 3px 0 #040507, inset 0 1px 0 rgba(255, 255, 255, 0.12)'
      : '0 3px 0 #94a3b8, inset 0 1px 0 #ffffff'};

  min-height: 100vh;
  background-color: var(--bg);
  color: var(--text);
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  overflow-x: hidden;
  scroll-behavior: smooth;
  position: relative;

  /* Subtle CRT scanline motif in terminal mode; clean archival grain in paper mode */
  background-image: ${({ themeMode }) =>
    themeMode === 'terminal'
      ? 'repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.015) 0px, rgba(255, 255, 255, 0.015) 1px, transparent 1px, transparent 3px)'
      : 'none'};
`;

/* ------------------------------------------------------------------ */
/*  Workstation Top Chrome Bar (Nav)                                   */
/* ------------------------------------------------------------------ */

export const Nav = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 12px 28px;
  border-bottom: 2px solid var(--border-strong);
  background: var(--panel);
  box-shadow: 0 2px 0 var(--bevel-shadow);
  position: sticky;
  top: 0;
  z-index: 20;

  @media (max-width: 900px) {
    padding: 12px 18px;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    padding: 10px 14px;
  }
`;

export const BrandGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;

  @media (max-width: 640px) {
    justify-content: space-between;
  }
`;

export const StatusLed = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 2px;
  background: var(--accent);
  border: 1px solid var(--border-strong);
  flex-shrink: 0;
`;

export const Brand = styled.div`
  font-size: clamp(14px, 1.8vw, 17px);
  font-weight: 800;
  letter-spacing: 0.4px;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;

  .sys-path {
    color: var(--muted);
    font-size: 12px;
    font-weight: 600;
    padding: 2px 8px;
    background: var(--well);
    border: 1px solid var(--border-subtle);
    border-radius: 3px;

    @media (max-width: 900px) {
      display: none;
    }
  }
`;

export const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
`;

export const PaletteTrigger = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  padding: 8px 14px;
  border: 1px solid var(--border-strong);
  background: var(--well);
  color: var(--text);
  border-radius: 4px;
  box-shadow: var(--keycap-shadow);
  cursor: pointer;
  font-family: inherit;
  font-size: 12px;
  font-weight: 700;
  transition: transform 0.1s ease, border-color 0.15s ease;

  .kbd-tag {
    color: var(--amber);
    font-size: 11px;
    padding: 1px 5px;
    border: 1px solid var(--amber-border);
    background: var(--amber-tint);
    border-radius: 3px;
  }

  &:hover {
    border-color: var(--accent);
  }

  &:active {
    transform: translateY(2px);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  @media (max-width: 640px) {
    padding: 8px 6px;
    .kbd-tag {
      display: none;
    }
  }
`;

export const ThemeToggle = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  padding: 8px 14px;
  border: 1px solid var(--border-strong);
  background: var(--panel);
  color: var(--text);
  border-radius: 4px;
  box-shadow: var(--keycap-shadow);
  cursor: pointer;
  font-family: inherit;
  font-size: 12px;
  font-weight: 700;
  transition: transform 0.1s ease, border-color 0.15s ease;

  &:hover {
    border-color: var(--accent);
    color: var(--accent);
  }

  &:active {
    transform: translateY(2px);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  @media (max-width: 640px) {
    padding: 8px 6px;
  }
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  padding: 8px 16px;
  border: 1px solid var(--accent-border);
  background: var(--accent-tint);
  color: var(--accent);
  border-radius: 4px;
  box-shadow: var(--keycap-shadow);
  cursor: pointer;
  font-family: inherit;
  font-size: 12px;
  font-weight: 800;
  transition: transform 0.1s ease, background 0.15s ease;

  &:hover {
    background: var(--accent-strong);
    color: #ffffff;
  }

  &:active {
    transform: translateY(2px);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  @media (max-width: 640px) {
    padding: 8px 6px;
  }
`;

/* ------------------------------------------------------------------ */
/*  Main Workstation Container                                         */
/* ------------------------------------------------------------------ */

export const Main = styled.main`
  max-width: 1160px;
  margin: 0 auto;
  padding: 36px 24px 72px;

  @media (max-width: 900px) {
    padding: 28px 18px 56px;
  }

  @media (max-width: 640px) {
    padding: 20px 14px 44px;
  }
`;

/* ------------------------------------------------------------------ */
/*  Section 1: Asymmetric Workstation Hero + CRT Telemetry Readout     */
/* ------------------------------------------------------------------ */

export const HeroWorkbench = styled.section`
  display: grid;
  grid-template-columns: 7fr 5fr;
  gap: 24px;
  align-items: stretch;
  margin-bottom: 56px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 40px;
  }
`;

export const HeroSection = styled.div`
  background: var(--panel);
  border: 2px solid var(--border-strong);
  border-radius: 6px;
  box-shadow: var(--card-shadow);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
`;

export const WindowChromeBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 8px 14px;
  background: var(--well);
  border-bottom: 2px solid var(--border-strong);
  font-size: 11px;
  font-weight: 700;
  color: var(--muted);
  letter-spacing: 0.5px;

  .window-controls {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .win-box {
    width: 10px;
    height: 10px;
    border: 1px solid var(--border-strong);
    background: var(--panel);
    display: inline-block;
  }

  .win-code {
    color: var(--amber);
    font-weight: 800;
  }
`;

export const HeroBody = styled.div`
  padding: 28px 26px 26px;

  @media (max-width: 640px) {
    padding: 20px 16px;
  }
`;

export const HeroTitle = styled.h1`
  margin: 0;
  font-size: clamp(26px, 4.2vw, 44px);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -1px;
  color: var(--text);
`;

export const HeroRoleSub = styled.p`
  margin: 12px 0 0;
  font-size: clamp(13px, 1.6vw, 15px);
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 0.2px;
`;

export const HeroText = styled.p`
  margin: 18px 0 0;
  color: var(--muted);
  font-size: clamp(14px, 1.5vw, 15.5px);
  line-height: 1.7;
  max-width: 65ch;
`;

export const SocialGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px dashed var(--border-subtle);

  @media (max-width: 640px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
`;

export const SocialButton = styled.a<{ bg?: string; hoverBg?: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  padding: 8px 14px;
  background: var(--well);
  color: var(--text);
  border: 1px solid var(--border-strong);
  border-radius: 4px;
  box-shadow: var(--keycap-shadow);
  font-family: inherit;
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.1s ease, border-color 0.15s ease, color 0.15s ease;

  svg {
    color: var(--accent);
    font-size: 14px;
    flex-shrink: 0;
  }

  &:hover {
    border-color: var(--accent);
    color: var(--accent);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(2px);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

/* Right Column: Recessed Hardware Telemetry / Dossier Readout */
export const TelemetryPanel = styled.aside`
  background: var(--panel);
  border: 2px solid var(--border-strong);
  border-radius: 6px;
  box-shadow: var(--card-shadow);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const TelemetryBody = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;

  @media (max-width: 640px) {
    padding: 16px;
  }
`;

export const RegisterTable = styled.dl`
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
`;

export const RegisterRow = styled.div`
  display: grid;
  grid-template-columns: 128px 1fr;
  gap: 10px;
  align-items: baseline;
  padding: 8px 10px;
  background: var(--well);
  border: 1px solid var(--border-subtle);
  border-radius: 4px;
  font-size: 12px;

  dt {
    color: var(--amber);
    font-weight: 700;
    letter-spacing: 0.3px;
  }

  dd {
    margin: 0;
    color: var(--text);
    font-weight: 600;
    line-height: 1.45;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 4px;
  }
`;

/* ------------------------------------------------------------------ */
/*  Section 2: Mounted Repository Bay (Filter + Projects)              */
/* ------------------------------------------------------------------ */

export const DirectoryFrame = styled.section`
  margin-bottom: 60px;
`;

export const DirectoryHeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 16px;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--border-strong);
`;

export const SectionHeader = styled.div`
  text-align: left;
`;

export const SectionTitle = styled.h2`
  font-size: clamp(20px, 2.6vw, 26px);
  font-weight: 800;
  letter-spacing: -0.4px;
  margin: 0 0 6px 0;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 10px;

  .reg-prefix {
    font-size: 13px;
    padding: 3px 8px;
    background: var(--amber-tint);
    border: 1px solid var(--amber-border);
    color: var(--amber);
    border-radius: 3px;
    font-weight: 800;
  }
`;

export const SectionSubtitle = styled.p`
  margin: 0;
  font-size: 13.5px;
  color: var(--muted);
  line-height: 1.5;
`;

export const DirectoryCountBadge = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: var(--accent);
  background: var(--accent-tint);
  border: 1px solid var(--accent-border);
  padding: 6px 12px;
  border-radius: 4px;
`;

export const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
  padding: 12px;
  background: var(--well);
  border: 1px solid var(--border-strong);
  border-radius: 5px;

  @media (max-width: 640px) {
    gap: 8px;
    padding: 10px;
  }
`;

export const FilterChip = styled.button<{ isActive: boolean }>`
  min-height: 44px;
  min-width: 44px;
  padding: 8px 16px;
  border: 1px solid
    ${({ isActive }) =>
      isActive ? 'var(--accent-border)' : 'var(--border-strong)'};
  background: ${({ isActive }) =>
    isActive ? 'var(--accent-tint)' : 'var(--panel)'};
  color: ${({ isActive }) => (isActive ? 'var(--accent)' : 'var(--text)')};
  border-radius: 4px;
  box-shadow: ${({ isActive }) => (isActive ? 'none' : 'var(--keycap-shadow)')};
  font-family: inherit;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.1s ease, border-color 0.15s ease;

  &:hover {
    border-color: var(--accent);
  }

  &:active {
    transform: translateY(2px);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  @media (max-width: 640px) {
    flex: 1 1 calc(33.333% - 8px);
    padding: 8px 10px;
    font-size: 11.5px;
    text-align: center;
  }
`;

export const ProjectsSection = styled.div`
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22px;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
    gap: 18px;
  }
`;

export const ProjectCard = styled.article<{
  accentColor?: string;
  isFocused: boolean;
  isFlagship?: boolean;
}>`
  grid-column: ${({ isFlagship }) => (isFlagship ? '1 / -1' : 'span 1')};
  border: 2px solid
    ${({ isFocused }) => (isFocused ? 'var(--accent)' : 'var(--border-strong)')};
  border-radius: 6px;
  background: var(--panel);
  box-shadow: var(--card-shadow);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  transition: transform 0.18s ease, border-color 0.18s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: var(--accent);
  }

  @media (max-width: 920px) {
    grid-column: span 1;
  }
`;

export const ProjectCardChrome = styled.div<{ isFocused?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 7px 14px;
  background: ${({ isFocused }) =>
    isFocused ? 'var(--accent-tint)' : 'var(--well)'};
  border-bottom: 1px solid var(--border-strong);
  font-size: 11px;
  font-weight: 700;
  color: ${({ isFocused }) => (isFocused ? 'var(--accent)' : 'var(--muted)')};

  .slot-id {
    color: var(--amber);
    font-weight: 800;
  }

  .slot-status {
    font-size: 10.5px;
    padding: 1px 6px;
    border-radius: 3px;
    border: 1px solid var(--border-subtle);
    background: var(--panel);
    color: var(--text);
  }
`;

export const ProjectCardBody = styled.div<{ isFlagship?: boolean }>`
  padding: 22px;
  display: ${({ isFlagship }) => (isFlagship ? 'grid' : 'flex')};
  grid-template-columns: ${({ isFlagship }) =>
    isFlagship ? '1.15fr 0.85fr' : '1fr'};
  flex-direction: column;
  gap: 20px;
  flex: 1;

  @media (max-width: 820px) {
    display: flex;
    flex-direction: column;
    padding: 18px 16px;
  }
`;

export const ProjectHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ProjectTopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
`;

export const ProjectIdentity = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ProjectAvatar = styled.div<{ accentColor?: string }>`
  width: 44px;
  height: 44px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: var(--accent);
  background: var(--well);
  border: 1px solid var(--border-strong);
  box-shadow: var(--keycap-shadow);
  flex-shrink: 0;
`;

export const ProjectMetaInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ProjectName = styled.h3`
  margin: 0;
  color: var(--text);
  font-size: clamp(17px, 2vw, 20px);
  font-weight: 800;
  letter-spacing: -0.3px;
`;

export const ProjectMetaRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 11.5px;
  color: var(--muted);

  .repo-tag {
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }
`;

export const ProjectQuickGithub = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 4px;
  border: 1px solid var(--border-strong);
  background: var(--well);
  box-shadow: var(--keycap-shadow);
  color: var(--text);
  font-size: 17px;
  text-decoration: none;
  flex-shrink: 0;
  transition: transform 0.1s ease, border-color 0.15s ease, color 0.15s ease;

  &:hover {
    color: var(--accent);
    border-color: var(--accent);
  }

  &:active {
    transform: translateY(2px);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

export const ProjectStackWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const TechBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 9px;
  border-radius: 3px;
  font-size: 11.5px;
  font-weight: 700;
  border: 1px solid var(--border-subtle);
  background: var(--well);
  color: var(--text);
  letter-spacing: 0.2px;

  .tech-icon {
    display: inline-flex;
    align-items: center;
    font-size: 13px;
    color: var(--accent);
  }

  .tech-name {
    font-size: 11.5px;
    font-family: inherit;
  }
`;

export const ProjectSummary = styled.p`
  margin: 0;
  color: var(--muted);
  line-height: 1.65;
  font-size: 14px;
  max-width: 65ch;
`;

export const ProjectHighlights = styled.ul`
  margin: 0;
  padding: 12px 14px;
  list-style: none;
  background: var(--well);
  border: 1px solid var(--border-subtle);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ProjectHighlight = styled.li`
  font-size: 12.5px;
  color: var(--text);
  line-height: 1.5;
  display: flex;
  align-items: baseline;
  gap: 8px;

  &::before {
    content: '>';
    color: var(--amber);
    font-weight: 800;
    flex-shrink: 0;
  }
`;

export const ProjectActionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 22px;
  background: var(--well);
  border-top: 1px solid var(--border-strong);
  flex-wrap: wrap;

  @media (max-width: 640px) {
    padding: 12px 16px;
  }
`;

export const ProjectButtonGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
`;

export const ProjectOpenLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  padding: 8px 16px;
  border-radius: 4px;
  background: var(--accent-tint);
  border: 1px solid var(--accent-border);
  box-shadow: var(--keycap-shadow);
  color: var(--accent);
  text-decoration: none;
  font-size: 12px;
  font-weight: 800;
  transition: transform 0.1s ease, background 0.15s ease, color 0.15s ease;

  &:hover {
    background: var(--accent-strong);
    color: #ffffff;
  }

  &:active {
    transform: translateY(2px);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  @media (max-width: 640px) {
    flex: 1;
  }
`;

export const ProjectDemoLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 44px;
  padding: 8px 14px;
  border-radius: 4px;
  background: var(--panel);
  border: 1px solid var(--border-strong);
  box-shadow: var(--keycap-shadow);
  color: var(--text);
  text-decoration: none;
  font-size: 12px;
  font-weight: 700;
  transition: transform 0.1s ease, border-color 0.15s ease;

  &:hover {
    border-color: var(--amber);
    color: var(--amber);
  }

  &:active {
    transform: translateY(2px);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  @media (max-width: 640px) {
    flex: 1;
  }
`;

export const EmptyStateBox = styled.div`
  grid-column: 1 / -1;
  padding: 36px 24px;
  background: var(--panel);
  border: 2px dashed var(--border-strong);
  border-radius: 6px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  p {
    margin: 0;
    color: var(--muted);
    font-size: 14px;
  }

  button {
    min-height: 44px;
    padding: 8px 16px;
    background: var(--accent-tint);
    border: 1px solid var(--accent-border);
    color: var(--accent);
    font-family: inherit;
    font-size: 12px;
    font-weight: 700;
    border-radius: 4px;
    cursor: pointer;
  }
`;

/* ------------------------------------------------------------------ */
/*  Section 3: Rack-Mount Technical Arsenal Matrix                     */
/* ------------------------------------------------------------------ */

export const ArsenalSection = styled.section`
  margin-bottom: 60px;
`;

export const ArsenalRack = styled.div`
  margin-top: 20px;
  border: 2px solid var(--border-strong);
  border-radius: 6px;
  background: var(--panel);
  box-shadow: var(--card-shadow);
  overflow: hidden;
`;

export const ArsenalRow = styled.div`
  display: grid;
  grid-template-columns: 290px 1fr;
  border-bottom: 1px solid var(--border-strong);

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

export const ArsenalRowMeta = styled.div`
  padding: 18px 20px;
  background: var(--well);
  border-right: 1px solid var(--border-strong);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;

  .rack-addr {
    font-size: 11px;
    font-weight: 800;
    color: var(--amber);
    letter-spacing: 0.5px;
  }

  .rack-title {
    font-size: 14px;
    font-weight: 800;
    color: var(--text);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .rack-desc {
    font-size: 11.5px;
    color: var(--muted);
    line-height: 1.4;
  }

  @media (max-width: 820px) {
    border-right: none;
    border-bottom: 1px solid var(--border-subtle);
    padding: 14px 16px;
  }
`;

export const ArsenalBadgeList = styled.div`
  padding: 18px 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;

  @media (max-width: 640px) {
    padding: 14px 16px;
    gap: 8px;
  }
`;

export const ArsenalBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  background: var(--well);
  border: 1px solid var(--border-strong);
  box-shadow: var(--keycap-shadow);
  color: var(--text);

  .badge-icon {
    display: inline-flex;
    align-items: center;
    font-size: 14px;
    color: var(--accent);
  }
`;

/* ------------------------------------------------------------------ */
/*  Section 4: Direct Comms Dispatch & Keyboard Status Bar             */
/* ------------------------------------------------------------------ */

export const CommsTerminal = styled.footer`
  border: 2px solid var(--border-strong);
  border-radius: 6px;
  background: var(--panel);
  box-shadow: var(--card-shadow);
  overflow: hidden;
`;

export const CommsBody = styled.div`
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 640px) {
    padding: 18px 16px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const CommsInfo = styled.div`
  max-width: 60ch;

  h3 {
    margin: 0 0 6px 0;
    font-size: 18px;
    font-weight: 800;
    color: var(--text);
  }

  p {
    margin: 0;
    font-size: 13.5px;
    color: var(--muted);
    line-height: 1.55;
  }
`;

export const HotkeyBar = styled.div`
  padding: 10px 24px;
  background: var(--well);
  border-top: 1px solid var(--border-strong);
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 11.5px;
  color: var(--muted);

  span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  kbd {
    padding: 1px 6px;
    border-radius: 3px;
    border: 1px solid var(--border-strong);
    background: var(--panel);
    color: var(--amber);
    font-family: inherit;
    font-size: 11px;
    font-weight: 700;
  }

  @media (max-width: 640px) {
    padding: 10px 16px;
    gap: 10px;
  }
`;

/* ------------------------------------------------------------------ */
/*  Command Palette                                                    */
/* ------------------------------------------------------------------ */

export const PaletteOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.68);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 12vh;
  z-index: 100;
`;

export const PalettePanel = styled.div`
  width: min(620px, calc(100vw - 32px));
  border: 2px solid var(--border-strong);
  background: var(--panel);
  box-shadow: var(--card-shadow);
  border-radius: 6px;
  padding: 12px;
`;

export const PaletteTitle = styled.div`
  color: var(--amber);
  font-size: 12px;
  font-weight: 800;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border-subtle);
`;

export const PaletteItem = styled.div<{ isActive: boolean }>`
  width: 100%;
  text-align: left;
  border: 1px solid
    ${({ isActive }) => (isActive ? 'var(--accent-border)' : 'transparent')};
  border-radius: 4px;
  background: ${({ isActive }) =>
    isActive ? 'var(--accent-tint)' : 'transparent'};
  color: ${({ isActive }) => (isActive ? 'var(--accent)' : 'var(--text)')};
  padding: 10px 12px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
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

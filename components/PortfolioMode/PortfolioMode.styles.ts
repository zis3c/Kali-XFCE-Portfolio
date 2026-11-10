import styled from 'styled-components';

type SimpleTheme = 'terminal' | 'paper';

/* ------------------------------------------------------------------ */
/*  Next.js Monochrome Palette (Black / Zinc Grey / Crisp White)       */
/* ------------------------------------------------------------------ */

export const Wrapper = styled.section<{ themeMode: SimpleTheme }>`
  /* Surfaces */
  --bg: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#000000' : '#fafafa'};
  --panel: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#0a0a0a' : '#ffffff'};
  --well: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#141414' : '#f4f4f5'};
  --well-hover: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#1f1f1f' : '#e4e4e7'};

  /* Typography (WCAG AA verified) */
  --text: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#fafafa' : '#09090b'};
  --muted: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#a1a1aa' : '#52525b'};

  /* Borders & Subtle Elevation */
  --border-strong: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#262626' : '#e4e4e7'};
  --border-subtle: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#1a1a1a' : '#f4f4f5'};
  --border-hover: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#52525b' : '#a1a1aa'};
  --focus-ring: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#fafafa' : '#09090b'};

  /* High-Contrast Monochrome Primary Controls (Next.js style) */
  --btn-primary-bg: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#fafafa' : '#09090b'};
  --btn-primary-text: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#09090b' : '#fafafa'};
  --btn-primary-hover: ${({ themeMode }) =>
    themeMode === 'terminal' ? '#d4d4d8' : '#27272a'};

  --card-shadow: ${({ themeMode }) =>
    themeMode === 'terminal'
      ? '0 1px 2px rgba(0, 0, 0, 0.6)'
      : '0 1px 3px rgba(0, 0, 0, 0.05)'};

  min-height: 100vh;
  background-color: var(--bg);
  color: var(--text);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter',
    sans-serif;
  overflow-x: hidden;
  scroll-behavior: smooth;
`;

/* ------------------------------------------------------------------ */
/*  Top Navigation Bar                                                 */
/* ------------------------------------------------------------------ */

export const Nav = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 14px 32px;
  border-bottom: 1px solid var(--border-strong);
  background: var(--panel);
  position: sticky;
  top: 0;
  z-index: 20;

  @media (max-width: 900px) {
    padding: 12px 20px;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    padding: 12px 16px;
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

  .role-tag {
    color: var(--muted);
    font-size: 12px;
    font-weight: 500;
    padding: 2px 8px;
    background: var(--well);
    border: 1px solid var(--border-strong);
    border-radius: 6px;

    @media (max-width: 1080px) {
      display: none;
    }
  }
`;

export const ChapterNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 4px;

  button {
    min-height: 38px;
    padding: 6px 12px;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 6px;
    color: var(--muted);
    font-family: inherit;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.15s ease, background 0.15s ease, border-color 0.15s ease;

    &:hover {
      color: var(--text);
      background: var(--well);
      border-color: var(--border-strong);
    }

    &:focus-visible {
      outline: 2px solid var(--focus-ring);
      outline-offset: 2px;
    }
  }

  @media (max-width: 960px) {
    display: none;
  }
`;

export const ChapterEyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11.5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--muted);
  margin-bottom: 10px;
`;

export const StorySection = styled.section`
  margin-bottom: 72px;

  @media (max-width: 640px) {
    margin-bottom: 52px;
  }
`;

export const PillarGrid = styled.div`
  margin-top: 22px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

export const PillarCard = styled.article<{ iconColor?: string }>`
  background: var(--panel);
  border: 1px solid var(--border-strong);
  border-radius: 8px;
  padding: 24px;
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
    width: 42px;
    height: 42px;
    border-radius: 8px;
    background: var(--well);
    border: 1px solid var(--border-strong);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 19px;
    color: ${({ iconColor }) => iconColor || 'var(--text)'};
  }

  h3 {
    margin: 0;
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.3px;
    color: var(--text);
  }

  p {
    margin: 0;
    font-size: 14px;
    line-height: 1.68;
    color: var(--muted);
  }

  .pillar-tags {
    margin-top: auto;
    padding-top: 12px;
    border-top: 1px solid var(--border-subtle);
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    font-size: 12px;
    color: var(--text);
    font-weight: 500;
  }

  .pillar-tag {
    padding: 3px 9px;
    border-radius: 5px;
    background: var(--well);
    border: 1px solid var(--border-strong);
  }
`;

export const TimelineWrap = styled.div`
  margin-top: 22px;
  border: 1px solid var(--border-strong);
  border-radius: 8px;
  background: var(--panel);
  box-shadow: var(--card-shadow);
  overflow: hidden;
`;

export const TimelineItem = styled.div`
  display: grid;
  grid-template-columns: 210px 1fr;
  gap: 20px;
  padding: 22px 24px;
  border-bottom: 1px solid var(--border-strong);

  &:last-child {
    border-bottom: none;
  }

  .time-period {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12.5px;
    font-weight: 600;
    color: var(--text);
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .time-sub {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      sans-serif;
    font-size: 12px;
    font-weight: 500;
    color: var(--muted);
  }

  .time-content {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .time-title {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    color: var(--text);
  }

  .time-desc {
    margin: 0;
    font-size: 14px;
    line-height: 1.65;
    color: var(--muted);
    max-width: 68ch;
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 18px 16px;
  }
`;

export const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
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
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;
  font-size: 13px;
  font-weight: 500;
  transition: border-color 0.15s ease, background 0.15s ease;

  .kbd-tag {
    color: var(--muted);
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    padding: 2px 6px;
    border: 1px solid var(--border-strong);
    background: var(--panel);
    border-radius: 4px;
  }

  &:hover {
    border-color: var(--border-hover);
    background: var(--well-hover);
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
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
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;
  font-size: 13px;
  font-weight: 500;
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
  border: 1px solid var(--btn-primary-bg);
  background: var(--btn-primary-bg);
  color: var(--btn-primary-text);
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  transition: background 0.15s ease;

  &:hover {
    background: var(--btn-primary-hover);
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
  }

  @media (max-width: 640px) {
    padding: 8px 6px;
  }
`;

/* ------------------------------------------------------------------ */
/*  Main Container                                                     */
/* ------------------------------------------------------------------ */

export const Main = styled.main`
  max-width: 1140px;
  margin: 0 auto;
  padding: 40px 24px 72px;

  @media (max-width: 900px) {
    padding: 28px 18px 56px;
  }

  @media (max-width: 640px) {
    padding: 20px 14px 44px;
  }
`;

/* ------------------------------------------------------------------ */
/*  Section 1: Hero & Quick Summary                                    */
/* ------------------------------------------------------------------ */

export const HeroWorkbench = styled.section`
  display: grid;
  grid-template-columns: 7fr 5fr;
  gap: 20px;
  align-items: stretch;
  margin-bottom: 56px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-bottom: 40px;
  }
`;

export const HeroSection = styled.div`
  background: var(--panel);
  border: 1px solid var(--border-strong);
  border-radius: 8px;
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
  padding: 10px 18px;
  background: var(--well);
  border-bottom: 1px solid var(--border-strong);
  font-size: 12px;
  font-weight: 600;
  color: var(--muted);

  .window-dots {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .win-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 1px solid var(--border-hover);
    display: inline-block;
  }
`;

export const HeroBody = styled.div`
  padding: 28px 28px 26px;

  @media (max-width: 640px) {
    padding: 20px 16px;
  }
`;

export const HeroTitle = styled.h1`
  margin: 0;
  font-size: clamp(28px, 4.2vw, 44px);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -1.2px;
  color: var(--text);
`;

export const HeroRoleSub = styled.p`
  margin: 12px 0 0;
  font-size: clamp(14px, 1.6vw, 16px);
  font-weight: 600;
  color: var(--text);
`;

export const HeroText = styled.p`
  margin: 16px 0 0;
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
  border-top: 1px solid var(--border-strong);

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
  padding: 8px 14px;
  background: var(--well);
  color: var(--text);
  border: 1px solid var(--border-strong);
  border-radius: 6px;
  font-size: 13px;
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
    background: var(--well-hover);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
  }
`;

/* Right Column: Profile & Education Summary */
export const TelemetryPanel = styled.aside`
  background: var(--panel);
  border: 1px solid var(--border-strong);
  border-radius: 8px;
  box-shadow: var(--card-shadow);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const TelemetryBody = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  grid-template-columns: 130px 1fr;
  gap: 12px;
  align-items: baseline;
  padding: 9px 12px;
  background: var(--well);
  border: 1px solid var(--border-subtle);
  border-radius: 6px;
  font-size: 13px;

  dt {
    color: var(--muted);
    font-weight: 500;
  }

  dd {
    margin: 0;
    color: var(--text);
    font-weight: 600;
    line-height: 1.45;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 3px;
  }
`;

/* ------------------------------------------------------------------ */
/*  Section 2: Projects Directory                                      */
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
  border-bottom: 1px solid var(--border-strong);
`;

export const SectionHeader = styled.div`
  text-align: left;
`;

export const SectionTitle = styled.h2`
  font-size: clamp(20px, 2.5vw, 26px);
  font-weight: 700;
  letter-spacing: -0.5px;
  margin: 0 0 6px 0;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SectionSubtitle = styled.p`
  margin: 0;
  font-size: 14px;
  color: var(--muted);
  line-height: 1.5;
`;

export const DirectoryCountBadge = styled.div`
  font-size: 12.5px;
  font-weight: 500;
  color: var(--muted);
  background: var(--well);
  border: 1px solid var(--border-strong);
  padding: 6px 12px;
  border-radius: 6px;
`;

export const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;

  @media (max-width: 640px) {
    gap: 6px;
  }
`;

export const FilterChip = styled.button<{ isActive: boolean }>`
  min-height: 44px;
  min-width: 44px;
  padding: 8px 16px;
  border: 1px solid
    ${({ isActive }) =>
      isActive ? 'var(--btn-primary-bg)' : 'var(--border-strong)'};
  background: ${({ isActive }) =>
    isActive ? 'var(--btn-primary-bg)' : 'var(--panel)'};
  color: ${({ isActive }) =>
    isActive ? 'var(--btn-primary-text)' : 'var(--muted)'};
  border-radius: 6px;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: ${({ isActive }) =>
      isActive ? 'var(--btn-primary-bg)' : 'var(--border-hover)'};
    color: ${({ isActive }) =>
      isActive ? 'var(--btn-primary-text)' : 'var(--text)'};
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
  }

  @media (max-width: 640px) {
    flex: 1 1 calc(33.333% - 6px);
    padding: 8px 10px;
    font-size: 12px;
    text-align: center;
  }
`;

export const ProjectsSection = styled.div`
  margin-top: 22px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const ProjectCard = styled.article<{
  accentColor?: string;
  isFocused: boolean;
  isFlagship?: boolean;
}>`
  grid-column: ${({ isFlagship }) => (isFlagship ? '1 / -1' : 'span 1')};
  border: 1px solid
    ${({ isFocused }) =>
      isFocused ? 'var(--border-hover)' : 'var(--border-strong)'};
  border-radius: 8px;
  background: var(--panel);
  box-shadow: var(--card-shadow);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  transition: border-color 0.18s ease, transform 0.18s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: var(--border-hover);
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
  padding: 8px 16px;
  background: var(--well);
  border-bottom: 1px solid var(--border-strong);
  font-size: 12px;
  font-weight: 500;
  color: var(--muted);

  .slot-status {
    font-size: 11px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 4px;
    border: 1px solid var(--border-strong);
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
  gap: 18px;
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
  gap: 14px;
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

export const ProjectAvatar = styled.div<{ iconColor?: string }>`
  width: 42px;
  height: 42px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: ${({ iconColor }) => iconColor || 'var(--text)'};
  background: var(--well);
  border: 1px solid var(--border-strong);
  flex-shrink: 0;
`;

export const ProjectMetaInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const ProjectName = styled.h3`
  margin: 0;
  color: var(--text);
  font-size: clamp(17px, 2vw, 19px);
  font-weight: 700;
  letter-spacing: -0.3px;
`;

export const ProjectMetaRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 12.5px;
  color: var(--muted);

  .repo-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
`;

export const ProjectQuickGithub = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 6px;
  border: 1px solid var(--border-strong);
  background: var(--well);
  color: var(--text);
  font-size: 18px;
  text-decoration: none;
  flex-shrink: 0;
  transition: border-color 0.15s ease, background 0.15s ease;

  &:hover {
    border-color: var(--border-hover);
    background: var(--well-hover);
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
  }
`;

export const ProjectStackWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const TechBadge = styled.span<{ iconColor?: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid var(--border-strong);
  background: var(--well);
  color: var(--text);

  .tech-icon {
    display: inline-flex;
    align-items: center;
    font-size: 14px;
    color: ${({ iconColor }) => iconColor || 'var(--text)'};
  }

  .tech-name {
    font-size: 12px;
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
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ProjectHighlight = styled.li`
  font-size: 13px;
  color: var(--text);
  line-height: 1.5;
  display: flex;
  align-items: baseline;
  gap: 8px;

  &::before {
    content: '•';
    color: var(--muted);
    font-weight: 700;
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
  border-radius: 6px;
  background: var(--btn-primary-bg);
  border: 1px solid var(--btn-primary-bg);
  color: var(--btn-primary-text);
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  transition: background 0.15s ease;

  &:hover {
    background: var(--btn-primary-hover);
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
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
  border-radius: 6px;
  background: var(--panel);
  border: 1px solid var(--border-strong);
  color: var(--text);
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
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
    flex: 1;
  }
`;

export const EmptyStateBox = styled.div`
  grid-column: 1 / -1;
  padding: 36px 24px;
  background: var(--panel);
  border: 1px dashed var(--border-strong);
  border-radius: 8px;
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
    background: var(--btn-primary-bg);
    border: 1px solid var(--btn-primary-bg);
    color: var(--btn-primary-text);
    font-family: inherit;
    font-size: 13px;
    font-weight: 600;
    border-radius: 6px;
    cursor: pointer;
  }
`;

/* ------------------------------------------------------------------ */
/*  Section 3: Technical Skills & Tooling Table                        */
/* ------------------------------------------------------------------ */

export const ArsenalSection = styled.section`
  margin-bottom: 60px;
`;

export const ArsenalRack = styled.div`
  margin-top: 20px;
  border: 1px solid var(--border-strong);
  border-radius: 8px;
  background: var(--panel);
  box-shadow: var(--card-shadow);
  overflow: hidden;
`;

export const ArsenalRow = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
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

  .rack-title {
    font-size: 14px;
    font-weight: 700;
    color: var(--text);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .rack-desc {
    font-size: 12.5px;
    color: var(--muted);
    line-height: 1.45;
  }

  @media (max-width: 820px) {
    border-right: none;
    border-bottom: 1px solid var(--border-strong);
    padding: 14px 16px;
  }
`;

export const ArsenalBadgeList = styled.div`
  padding: 18px 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;

  @media (max-width: 640px) {
    padding: 14px 16px;
    gap: 8px;
  }
`;

export const ArsenalBadge = styled.div<{ iconColor?: string }>`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12.5px;
  font-weight: 500;
  background: var(--well);
  border: 1px solid var(--border-strong);
  color: var(--text);

  .badge-icon {
    display: inline-flex;
    align-items: center;
    font-size: 15px;
    color: ${({ iconColor }) => iconColor || 'var(--text)'};
  }
`;

/* ------------------------------------------------------------------ */
/*  Section 4: Contact & Keyboard Shortcuts Footer                     */
/* ------------------------------------------------------------------ */

export const CommsTerminal = styled.footer`
  border: 1px solid var(--border-strong);
  border-radius: 8px;
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
    font-weight: 700;
    color: var(--text);
  }

  p {
    margin: 0;
    font-size: 14px;
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
  font-size: 12px;
  color: var(--muted);

  span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
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
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 12vh;
  z-index: 100;
`;

export const PalettePanel = styled.div`
  width: min(560px, calc(100vw - 32px));
  border: 1px solid var(--border-strong);
  background: var(--panel);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
  border-radius: 8px;
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
  border-radius: 6px;
  background: ${({ isActive }) => (isActive ? 'var(--well)' : 'transparent')};
  color: var(--text);
  padding: 10px 12px;
  font-size: 13.5px;
  font-weight: 500;
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

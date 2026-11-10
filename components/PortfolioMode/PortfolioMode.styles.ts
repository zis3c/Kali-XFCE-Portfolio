import styled, { keyframes } from 'styled-components';

type SimpleTheme = 'terminal' | 'paper';

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
  min-height: 42px;
  padding: 8px 14px;
  border: 1px solid var(--border-strong);
  background: var(--well);
  color: var(--text);
  border-radius: 8px;
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
  min-height: 42px;
  padding: 8px 14px;
  border: 1px solid var(--border-strong);
  background: var(--panel);
  color: var(--text);
  border-radius: 8px;
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
  min-height: 42px;
  padding: 8px 16px;
  border: 1px solid var(--btn-primary-bg);
  background: var(--btn-primary-bg);
  color: var(--btn-primary-text);
  border-radius: 8px;
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
/*  Main Container (Spacious & Breathable)                             */
/* ------------------------------------------------------------------ */

export const Main = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 64px 32px 96px;

  @media (max-width: 900px) {
    padding: 44px 20px 72px;
  }

  @media (max-width: 640px) {
    padding: 32px 16px 56px;
  }
`;

export const StorySection = styled.section`
  margin-bottom: 88px;

  @media (max-width: 640px) {
    margin-bottom: 64px;
  }
`;

export const SectionHeader = styled.div`
  text-align: left;
  margin-bottom: 28px;
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
  margin-bottom: 88px;

  @media (max-width: 640px) {
    margin-bottom: 64px;
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
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -1.5px;
  color: var(--text);
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
  padding: 20px;
  background: var(--panel);
  border: 1px solid var(--border-strong);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;

  .stat-label {
    font-size: 12.5px;
    font-weight: 500;
    color: var(--muted);
  }

  .stat-value {
    font-size: 15px;
    font-weight: 700;
    color: var(--text);
    line-height: 1.4;
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
/*  Section 3: Projects Directory (Minimalist & Clean)                 */
/* ------------------------------------------------------------------ */

export const DirectoryFrame = styled.section`
  margin-bottom: 88px;

  @media (max-width: 640px) {
    margin-bottom: 64px;
  }
`;

export const DirectoryHeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
`;

export const DirectoryCountBadge = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: var(--muted);
  background: var(--panel);
  border: 1px solid var(--border-strong);
  padding: 6px 14px;
  border-radius: 8px;
`;

export const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;

  @media (max-width: 640px) {
    gap: 6px;
  }
`;

export const FilterChip = styled.button<{ isActive: boolean }>`
  min-height: 42px;
  min-width: 44px;
  padding: 8px 18px;
  border: 1px solid
    ${({ isActive }) =>
      isActive ? 'var(--btn-primary-bg)' : 'var(--border-strong)'};
  background: ${({ isActive }) =>
    isActive ? 'var(--btn-primary-bg)' : 'var(--panel)'};
  color: ${({ isActive }) =>
    isActive ? 'var(--btn-primary-text)' : 'var(--muted)'};
  border-radius: 8px;
  font-family: inherit;
  font-size: 13.5px;
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
    font-size: 12.5px;
    text-align: center;
  }
`;

export const ProjectsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const ProjectCard = styled.article<{
  accentColor?: string;
  isFocused: boolean;
  isFlagship?: boolean;
}>`
  border: 1px solid
    ${({ isFocused }) =>
      isFocused ? 'var(--border-hover)' : 'var(--border-strong)'};
  border-radius: 12px;
  background: var(--panel);
  box-shadow: var(--card-shadow);
  padding: 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  transition: border-color 0.18s ease, transform 0.18s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: var(--border-hover);
  }

  @media (max-width: 640px) {
    padding: 22px 18px;
  }
`;

export const ProjectHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
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
  gap: 14px;
`;

export const ProjectAvatar = styled.div<{ iconColor?: string }>`
  width: 44px;
  height: 44px;
  border-radius: 10px;
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
  gap: 4px;
`;

export const ProjectName = styled.h3`
  margin: 0;
  color: var(--text);
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.3px;
`;

export const ProjectMetaRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 13px;
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
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid var(--border-strong);
  background: var(--well);
  color: var(--text);
  font-size: 17px;
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

export const ProjectSummary = styled.p`
  margin: 0;
  color: var(--muted);
  line-height: 1.7;
  font-size: 14.5px;
`;

export const ProjectStackWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const TechBadge = styled.span<{ iconColor?: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 11px;
  border-radius: 6px;
  font-size: 12.5px;
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
    font-size: 12.5px;
  }
`;

export const ProjectActionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid var(--border-subtle);
  flex-wrap: wrap;
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
  min-height: 42px;
  padding: 8px 16px;
  border-radius: 8px;
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
  min-height: 42px;
  padding: 8px 14px;
  border-radius: 8px;
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
  padding: 40px 24px;
  background: var(--panel);
  border: 1px dashed var(--border-strong);
  border-radius: 12px;
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
    min-height: 42px;
    padding: 8px 16px;
    background: var(--btn-primary-bg);
    border: 1px solid var(--btn-primary-bg);
    color: var(--btn-primary-text);
    font-family: inherit;
    font-size: 13px;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
  }
`;

/* ------------------------------------------------------------------ */
/*  Section 4: Experience & Achievements                               */
/* ------------------------------------------------------------------ */

export const TimelineWrap = styled.div`
  border: 1px solid var(--border-strong);
  border-radius: 12px;
  background: var(--panel);
  box-shadow: var(--card-shadow);
  overflow: hidden;
`;

export const TimelineItem = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 24px;
  padding: 26px 28px;
  border-bottom: 1px solid var(--border-strong);
  align-items: start;

  &:last-child {
    border-bottom: none;
  }

  .time-period {
    font-size: 13.5px;
    font-weight: 600;
    color: var(--text);
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .time-sub {
    font-size: 12.5px;
    font-weight: 500;
    color: var(--muted);
  }

  .time-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .time-title {
    margin: 0;
    font-size: 17px;
    font-weight: 700;
    color: var(--text);
  }

  .time-desc {
    margin: 0;
    font-size: 14.5px;
    line-height: 1.7;
    color: var(--muted);
    width: 100%;
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 20px 18px;
  }
`;

export const RecognitionGrid = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const RecognitionCard = styled.div`
  padding: 22px 24px;
  border: 1px solid var(--border-strong);
  border-radius: 12px;
  background: var(--panel);
  box-shadow: var(--card-shadow);
  display: flex;
  flex-direction: column;
  gap: 8px;

  .rec-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    font-size: 12px;
    font-weight: 600;
    color: var(--muted);
  }

  .rec-badge {
    padding: 3px 9px;
    border-radius: 6px;
    background: var(--well);
    border: 1px solid var(--border-strong);
    color: var(--text);
    font-weight: 600;
  }

  h4 {
    margin: 4px 0 0;
    font-size: 16px;
    font-weight: 700;
    color: var(--text);
  }

  p {
    margin: 0;
    font-size: 13.5px;
    line-height: 1.6;
    color: var(--muted);
  }
`;

/* ------------------------------------------------------------------ */
/*  Section 5: Technical Skills                                        */
/* ------------------------------------------------------------------ */

export const ArsenalSection = styled.section`
  margin-bottom: 88px;

  @media (max-width: 640px) {
    margin-bottom: 64px;
  }
`;

export const ArsenalRack = styled.div`
  border: 1px solid var(--border-strong);
  border-radius: 12px;
  background: var(--panel);
  box-shadow: var(--card-shadow);
  overflow: hidden;
`;

export const ArsenalRow = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  border-bottom: 1px solid var(--border-strong);

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

export const ArsenalRowMeta = styled.div`
  padding: 22px 24px;
  background: var(--well);
  border-right: 1px solid var(--border-strong);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;

  .rack-title {
    font-size: 14.5px;
    font-weight: 700;
    color: var(--text);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .rack-desc {
    font-size: 13px;
    color: var(--muted);
    line-height: 1.5;
  }

  @media (max-width: 820px) {
    border-right: none;
    border-bottom: 1px solid var(--border-strong);
    padding: 16px 18px;
  }
`;

export const ArsenalBadgeList = styled.div`
  padding: 22px 24px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;

  @media (max-width: 640px) {
    padding: 16px 18px;
    gap: 8px;
  }
`;

export const ArsenalBadge = styled.div<{ iconColor?: string }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 13px;
  border-radius: 8px;
  font-size: 13px;
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
/*  Section 6: Contact & Footer                                        */
/* ------------------------------------------------------------------ */

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

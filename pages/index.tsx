import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import React, { useState, useCallback, useEffect } from 'react';
import Desktop from '../components/Desktop/Desktop';
import DesktopLayout from '../components/DesktopLayout/DesktopLayout';
import { wrapper } from '../store';
import { loadLatestNews } from '../store/action-creators/news-action-creators';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Loader from '../components/Loader/Loader';
import LoginScreen from '../components/LoginScreen/LoginScreen';
import { SESSION_ACTION_EVENT, SessionAction } from '../utils/session-actions';
import styled from 'styled-components';
import { FaEnvelope, FaGithub, FaLinkedin, FaYoutube, FaInstagram } from 'react-icons/fa';

interface ServerProps {
  title: string;
}

type AppPhase = 'boot' | 'login' | 'desktop';
type ExperienceMode = 'chooser' | 'kali' | 'portfolio';

type FeaturedProject = {
  name: string;
  stack: string;
  summary: string;
  highlights: string[];
  accent: string;
  tags: string[];
  link: string;
};

const featuredProjects: FeaturedProject[] = [
  {
    name: 'STEM Telebot',
    stack: 'Python, Telegram Bot API, Google Sheets',
    summary: 'Bilingual membership automation bot for STEM support workflows.',
    highlights: ['Join/leave automation', 'Sheets sync pipeline', 'Admin + superadmin controls'],
    accent: '#22c55e',
    tags: ['Automation', 'Bot'],
    link: 'https://github.com/zis3c/STEM-Telebot',
  },
  {
    name: 'Tgsortreact',
    stack: 'Python, Telethon, Pandas, React',
    summary: 'Telegram reaction analytics engine with dashboard-oriented processing.',
    highlights: ['Reaction scrape jobs', 'Data cleaning with Pandas', 'Web analytics view'],
    accent: '#38bdf8',
    tags: ['Automation', 'Bot', 'Research'],
    link: 'https://github.com/zis3c/Tgsortreact',
  },
  {
    name: 'USAS Launcher',
    stack: 'Python, Selenium, Desktop Automation',
    summary: 'Secure launcher to speed up repetitive campus portal sign-in tasks.',
    highlights: ['Credential-assisted login', 'Browser automation profiles', 'Time-saving launcher UX'],
    accent: '#f59e0b',
    tags: ['Automation'],
    link: 'https://github.com/zis3c/USAS-Launcher',
  },
  {
    name: 'Assignment Notifier',
    stack: 'Python, Telegram Bot API, Scheduler',
    summary: 'Reminder bot for deadlines with privacy-minded credential handling.',
    highlights: ['Automated reminder cycle', 'Encrypted credential storage', 'Student-focused flow'],
    accent: '#e879f9',
    tags: ['Automation', 'Bot'],
    link: 'https://github.com/zis3c/USAS-Assignment-Notifier',
  },
  {
    name: 'Certclaim',
    stack: 'Next.js, TypeScript, Admin Panel',
    summary: 'Certificate claim and verification portal with operator workflow.',
    highlights: ['Claim submission flow', 'Admin review dashboard', 'Structured record handling'],
    accent: '#60a5fa',
    tags: ['Web'],
    link: 'https://github.com/zis3c/Certclaim',
  },
  {
    name: 'Finvault',
    stack: 'Next.js, PostgreSQL, Prisma',
    summary: 'Fintech-style wallet simulator with transaction-centric UX.',
    highlights: ['Wallet balance modeling', 'Transaction history management', 'Database-backed state'],
    accent: '#14b8a6',
    tags: ['Web'],
    link: 'https://github.com/zis3c/Finvault',
  },
  {
    name: 'QRBot + Qrtendify',
    stack: 'Python, Django, Telegram Bot API',
    summary: 'QR ecosystem: bot-generated QR utilities and attendance/session tracking.',
    highlights: ['QR generate + decode bot', 'Encrypted mode support', 'Attendance platform integration'],
    accent: '#fb7185',
    tags: ['Security', 'Bot', 'Automation'],
    link: 'https://github.com/zis3c/QRBot',
  },
  {
    name: 'Polyglot Files',
    stack: 'Security Research, File Format Internals',
    summary: 'Polyglot file experiments that combine valid multiple file signatures.',
    highlights: ['JPG/PDF hybrids', 'PNG/PDF hybrids', 'Payload structure research'],
    accent: '#a78bfa',
    tags: ['Security', 'Research'],
    link: 'https://github.com/zis3c/Polyglot-File',
  },
];

const PROJECT_FILTERS = ['All', 'Security', 'Automation', 'Bot', 'Web', 'Research'] as const;
type ProjectFilter = typeof PROJECT_FILTERS[number];
type SimpleTheme = 'terminal' | 'paper';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

const GlitchText = ({ words }: { words: string[] }) => {
  const [text, setText] = useState(words[0]);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const nextWord = words[(wordIndex + 1) % words.length];
    const currentWord = words[wordIndex];
    const maxLength = Math.max(currentWord.length, nextWord.length);
    let revealProgress = 0;
    let glitchInterval: number | undefined;

    const startGlitch = window.setTimeout(() => {
      glitchInterval = window.setInterval(() => {
        const rendered = Array.from({ length: maxLength }, (_, index) => {
          if (index < revealProgress) {
            return nextWord[index] || '';
          }
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('');

        setText(rendered);
        revealProgress += 1 / 3;

        if (revealProgress >= nextWord.length) {
          window.clearInterval(glitchInterval);
          setText(nextWord);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }, 30);
    }, 3200);

    return () => {
      window.clearTimeout(startGlitch);
      if (glitchInterval) {
        window.clearInterval(glitchInterval);
      }
    };
  }, [wordIndex, words]);

  return <span style={{ fontFamily: '"JetBrains Mono", "Fira Code", "Consolas", monospace' }}>{text}</span>;
};

/**
 * Startup flow: Boot terminal → LightDM login → Xfce desktop
 */
const Home: NextPage<ServerProps> = ({ title }) => {
  const [mode, setMode] = useState<ExperienceMode>('chooser');
  const [phase, setPhase] = useState<AppPhase>('boot');
  const [bootCycle, setBootCycle] = useState(0);
  const [selectedBootIndex, setSelectedBootIndex] = useState(0);
  const [bootHint, setBootHint] = useState('Use ↑ ↓ and Enter to choose.');
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>('All');
  const [simpleTheme, setSimpleTheme] = useState<SimpleTheme>('terminal');
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [focusedProjectIndex, setFocusedProjectIndex] = useState(0);

  const filteredProjects = featuredProjects.filter((project) => {
    if (projectFilter === 'All') return true;
    return project.tags.includes(projectFilter);
  });

  const handleBootComplete = useCallback(() => {
    setPhase('login');
  }, []);

  const handleLoginComplete = useCallback(() => {
    setPhase('desktop');
  }, []);

  useEffect(() => {
    const onSessionAction = (event: Event) => {
      if (mode !== 'kali') return;
      const action = (event as CustomEvent<SessionAction>).detail;

      if (action === 'lock' || action === 'logout') {
        setPhase('login');
      }

      if (action === 'restart') {
        setBootCycle((prev) => prev + 1);
        setMode('chooser');
        setPhase('boot');
      }
    };

    window.addEventListener(SESSION_ACTION_EVENT, onSessionAction as EventListener);
    return () =>
      window.removeEventListener(
        SESSION_ACTION_EVENT,
        onSessionAction as EventListener
      );
  }, [mode]);

  useEffect(() => {
    if (mode !== 'chooser') return;

    const launchSelected = () => {
      if (selectedBootIndex === 0) {
        setMode('portfolio');
        return;
      }
      setMode('kali');
      setPhase('boot');
      setBootCycle((prev) => prev + 1);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedBootIndex((prev) => (prev - 1 + 2) % 2);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedBootIndex((prev) => (prev + 1) % 2);
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        launchSelected();
      }
      if (e.key === 'F2') {
        e.preventDefault();
        setBootHint('F2: BIOS Setup is protected in this demo.');
      }
      if (e.key === 'F8') {
        e.preventDefault();
        setBootHint('F8: Advanced Boot Options opened (simulated).');
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mode, selectedBootIndex]);

  useEffect(() => {
    if (mode !== 'portfolio') return;
    const prevHtml = document.documentElement.style.scrollBehavior;
    const prevBody = document.body.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.scrollBehavior = 'smooth';

    // Add softer inertia-like wheel scrolling on desktop.
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      return () => {
        document.documentElement.style.scrollBehavior = prevHtml;
        document.body.style.scrollBehavior = prevBody;
      };
    }

    let targetY = window.scrollY;
    let currentY = window.scrollY;
    let rafId = 0;

    const animate = () => {
      currentY += (targetY - currentY) * 0.14;
      if (Math.abs(targetY - currentY) < 0.4) {
        currentY = targetY;
      }
      window.scrollTo(0, currentY);
      if (currentY !== targetY) {
        rafId = window.requestAnimationFrame(animate);
      } else {
        rafId = 0;
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      e.preventDefault();
      const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      targetY = Math.min(maxY, Math.max(0, targetY + e.deltaY));
      if (!rafId) {
        rafId = window.requestAnimationFrame(animate);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', onWheel);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      document.documentElement.style.scrollBehavior = prevHtml;
      document.body.style.scrollBehavior = prevBody;
    };
  }, [mode]);

  useEffect(() => {
    setFocusedProjectIndex(0);
  }, [projectFilter]);

  useEffect(() => {
    if (mode !== 'portfolio') return;

    const jumpTo = (id: string) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const paletteActions = [
      { label: 'Go to About', run: () => jumpTo('simple-about') },
      { label: 'Go to Projects', run: () => jumpTo('simple-projects') },
      { label: 'Go to Contact', run: () => jumpTo('simple-contact') },
      { label: 'Open GitHub', run: () => window.open('https://github.com/zis3c', '_blank', 'noopener,noreferrer') },
      { label: 'Toggle Theme', run: () => setSimpleTheme((prev) => (prev === 'terminal' ? 'paper' : 'terminal')) },
    ];

    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
        return;
      }
      if (e.key === 'Escape') {
        setIsPaletteOpen(false);
        return;
      }
      if (isPaletteOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setPaletteIndex((prev) => (prev + 1) % paletteActions.length);
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setPaletteIndex((prev) => (prev - 1 + paletteActions.length) % paletteActions.length);
        }
        if (e.key === 'Enter') {
          e.preventDefault();
          paletteActions[paletteIndex].run();
          setIsPaletteOpen(false);
        }
        return;
      }
      if (e.key.toLowerCase() === 'j') {
        e.preventDefault();
        window.scrollBy({ top: 230, behavior: 'smooth' });
      }
      if (e.key.toLowerCase() === 'k') {
        e.preventDefault();
        window.scrollBy({ top: -230, behavior: 'smooth' });
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setFocusedProjectIndex((prev) => (prev + 1) % Math.max(1, filteredProjects.length));
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setFocusedProjectIndex((prev) => (prev - 1 + Math.max(1, filteredProjects.length)) % Math.max(1, filteredProjects.length));
      }
      if (e.key === 'Enter' && filteredProjects[focusedProjectIndex]) {
        window.open(filteredProjects[focusedProjectIndex].link, '_blank', 'noopener,noreferrer');
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mode, isPaletteOpen, paletteIndex, filteredProjects, focusedProjectIndex]);

  return (
    <>
      {mode === 'chooser' && (
        <ChooserWrapper>
          <BootViewport>
            <BootHeader>Phoenix SecureCore Tiano Setup</BootHeader>
            <BootSubheader>
              CPU: Intel(R) Core(TM) i7-10750H 2.60GHz | Memory Test: 8192MB OK
            </BootSubheader>
            <BootLog>[ OK ] SATA Controller initialized</BootLog>
            <BootLog>[ OK ] NVMe Controller initialized</BootLog>
            <BootLog>[ OK ] USB Controllers initialized</BootLog>
            <BootLog>[ OK ] Detecting bootable devices...</BootLog>
            <ChooserTitle>Boot Menu</ChooserTitle>
            <ChooserSubtitle>
              Use Up/Down to select boot target, then press Enter.
            </ChooserSubtitle>
            <ChooserActions>
              <ChooserButton
                isActive={selectedBootIndex === 0}
                onClick={() => {
                  setSelectedBootIndex(0);
                  setMode('portfolio');
                }}
              >
                Portfolio Mode (default)
              </ChooserButton>
              <ChooserButton
                isActive={selectedBootIndex === 1}
                onClick={() => {
                  setSelectedBootIndex(1);
                  setMode('kali');
                  setPhase('boot');
                }}
              >
                Kali Linux XFCE Mode
              </ChooserButton>
            </ChooserActions>
          </BootViewport>
          <BootBottom>
            <BootFooter>{bootHint}</BootFooter>
            <BootFooter>
              F2 = Setup | F8 = Advanced Boot Options | Enter = Continue
            </BootFooter>
          </BootBottom>
        </ChooserWrapper>
      )}

      {mode === 'kali' && (
        <>
          <Loader
            key={`boot-${bootCycle}`}
            isOnScreen={phase === 'boot'}
            loadingDuration={3200}
            onBootComplete={handleBootComplete}
          />
          <LoginScreen
            isVisible={phase === 'login'}
            onLoginComplete={handleLoginComplete}
          />
          {phase === 'desktop' && (
            <DesktopLayout title={title} entranceAnimationDelay={0}>
              <Desktop />
            </DesktopLayout>
          )}
        </>
      )}

      {mode === 'portfolio' && (
        <PortfolioWrapper themeMode={simpleTheme}>
          <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
          </Head>
          <PortfolioNav>
            <Brand>Radzi Zamri (Zis3c)</Brand>
            <NavActions>
              <ThemeToggle
                type="button"
                onClick={() =>
                  setSimpleTheme((prev) => (prev === 'terminal' ? 'paper' : 'terminal'))
                }
              >
                {simpleTheme === 'terminal' ? 'Paper Light' : 'Terminal Dark'}
              </ThemeToggle>
              <BackButton onClick={() => setMode('chooser')}>
                System Boot Menu
              </BackButton>
            </NavActions>
          </PortfolioNav>
          <PortfolioMain>
            <StatsStrip>
              <StatPill>Role: Cybersecurity Student</StatPill>
              <StatPill>CTF Team: Dot Zero</StatPill>
              <StatPill>Repos: 14+</StatPill>
              <StatPill>Now Building: Automation + Security Tools</StatPill>
            </StatsStrip>
            <HeroSection id="simple-about">
              <HeroBadge>Cybersecurity Student</HeroBadge>
              <HeroTitle>
                <GlitchText words={['Cybersecurity Portfolio', 'Offensive Security', 'Purple Team', 'Dot Zero']} />
              </HeroTitle>
              <HeroText>
                USAS Bachelor of Computer Science student with offensive and defensive
                security projects, CTF experience with Dot Zero, and hands-on
                automation/tooling projects built from curiosity and hobby exploration.
              </HeroText>
              <SocialGrid>
                <SocialButton href="mailto:i24107504@usas.student.edu.my" bg="#ea4335" hoverBg="#d33426">
                  <FaEnvelope /> Email
                </SocialButton>
                <SocialButton href="https://github.com/zis3c" target="_blank" rel="noopener noreferrer" bg="#24292e" hoverBg="#1b1f23">
                  <FaGithub /> GitHub
                </SocialButton>
                <SocialButton href="https://linkedin.com/in/radzizamri" target="_blank" rel="noopener noreferrer" bg="#0a66c2" hoverBg="#004182">
                  <FaLinkedin /> LinkedIn
                </SocialButton>
                <SocialButton href="https://www.youtube.com/@zis3c" target="_blank" rel="noopener noreferrer" bg="#ff0000" hoverBg="#cc0000">
                  <FaYoutube /> YouTube
                </SocialButton>
                <SocialButton href="https://www.instagram.com/radz.z_/" target="_blank" rel="noopener noreferrer" bg="linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)" hoverBg="linear-gradient(45deg, #d3812c 0%, #cc5c34 25%, #c2213a 50%, #b31e59 75%, #a61578 100%)">
                  <FaInstagram /> Instagram
                </SocialButton>
              </SocialGrid>
            </HeroSection>

            <Cards>
              <Card accentColor="#3b82f6" colSpan={2}>
                <CardTitle accentColor="#3b82f6">About Me</CardTitle>
                <CardText>
                  Purple team focused. USAS Bachelor of Computer Science student and active
                  member of Dot Zero CTF team. I love breaking systems to understand their
                  flaws while building practical tools from curiosity, experimentation,
                  and daily problem-solving needs.
                </CardText>
              </Card>
              <Card accentColor="#10b981" rowSpan={2}>
                <CardTitle accentColor="#10b981">Project Arsenal</CardTitle>
                <CardText>
                  Hands-on builds across cybersecurity tooling, Telegram bots, local automation,
                  and utility apps made for learning and real use.
                </CardText>
                <CardMeta>
                  <MetaItem>14 repositories reviewed</MetaItem>
                  <MetaItem>Security + automation focus</MetaItem>
                  <MetaItem>Academic + hobby/curiosity projects</MetaItem>
                </CardMeta>
              </Card>
              <Card accentColor="#f43f5e" colSpan={2} id="simple-contact">
                <CardTitle accentColor="#f43f5e">Contact</CardTitle>
                <CardText>
                  Open to learning, collaboration, and internship opportunities.
                </CardText>
              </Card>
            </Cards>

            <FilterRow id="simple-projects">
              {PROJECT_FILTERS.map((filter) => (
                <FilterChip
                  key={filter}
                  type="button"
                  isActive={projectFilter === filter}
                  onClick={() => setProjectFilter(filter)}
                >
                  {filter}
                </FilterChip>
              ))}
            </FilterRow>

            <ProjectsSection>
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.name}
                  accentColor={project.accent}
                  isFocused={index === focusedProjectIndex}
                  style={{ animationDelay: `${index * 75}ms` }}
                >
                  <ProjectHeader>
                    <ProjectName>{project.name}</ProjectName>
                    <ProjectStack>{project.stack}</ProjectStack>
                  </ProjectHeader>
                  <ProjectSummary>{project.summary}</ProjectSummary>
                  <ProjectHighlights>
                    {project.highlights.map((highlight) => (
                      <ProjectHighlight key={`${project.name}-${highlight}`}>{highlight}</ProjectHighlight>
                    ))}
                  </ProjectHighlights>
                  <ProjectOpenLink href={project.link} target="_blank" rel="noopener noreferrer">
                    Open Repository
                  </ProjectOpenLink>
                </ProjectCard>
              ))}
            </ProjectsSection>
          </PortfolioMain>
          {isPaletteOpen && (
            <PaletteOverlay onClick={() => setIsPaletteOpen(false)}>
              <PalettePanel onClick={(e) => e.stopPropagation()}>
                <PaletteTitle>Command Palette</PaletteTitle>
                {['Go to About', 'Go to Projects', 'Go to Contact', 'Open GitHub', 'Toggle Theme'].map(
                  (action, index) => (
                    <PaletteItem key={action} isActive={index === paletteIndex}>
                      {action}
                    </PaletteItem>
                  )
                )}
              </PalettePanel>
            </PaletteOverlay>
          )}
        </PortfolioWrapper>
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async () => {
    await store.dispatch(loadLatestNews());

    return {
      props: {
        title: 'zis3c@kali',
      },
      revalidate: 3600,
    };
  }
);

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    news: bindActionCreators(loadLatestNews, dispatch),
  };
};
export default connect(null, mapDispatchToProps)(Home);

const ChooserWrapper = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  background: #050707;
  padding: 42px 52px 28px;

  @media (max-width: 900px) {
    padding: 30px 24px 20px;
  }

  @media (max-width: 600px) {
    min-height: 100dvh;
    padding: calc(18px + env(safe-area-inset-top)) 12px
      calc(14px + env(safe-area-inset-bottom));
  }
`;

const BootViewport = styled.div`
  width: min(760px, 100%);
  font-family: 'Consolas', 'Lucida Console', monospace;
`;

const BootBottom = styled.div`
  font-family: 'Consolas', 'Lucida Console', monospace;
`;

const BootHeader = styled.div`
  color: #b8c3cc;
  font-size: 14px;
  margin-bottom: 4px;

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const BootSubheader = styled.div`
  color: #7f8d99;
  font-size: 12px;

  @media (max-width: 600px) {
    font-size: 11px;
    line-height: 1.35;
  }
`;

const BootLog = styled.div`
  color: #8aa98a;
  font-size: 12px;
  margin-top: 2px;

  @media (max-width: 600px) {
    font-size: 10px;
    line-height: 1.3;
  }
`;

const ChooserTitle = styled.h1`
  margin: 14px 0 0;
  font-size: 17px;
  color: #c9d3da;

  @media (max-width: 600px) {
    font-size: 15px;
    margin-top: 10px;
  }
`;

const ChooserSubtitle = styled.p`
  margin: 10px 0 0;
  color: #7f8d99;
  font-size: 12px;

  @media (max-width: 600px) {
    font-size: 11px;
    margin-top: 8px;
  }
`;

const ChooserActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 22px;
  width: min(640px, 100%);

  @media (max-width: 600px) {
    margin-top: 12px;
    gap: 8px;
  }
`;

const ChooserButton = styled.button<{ isActive: boolean }>`
  width: 100%;
  text-align: left;
  border: 1px solid ${({ isActive }) => (isActive ? '#6f7f86' : 'transparent')};
  background: ${({ isActive }) => (isActive ? '#1d2529' : 'transparent')};
  color: ${({ isActive }) => (isActive ? '#d9e4eb' : '#96a3ac')};
  padding: 8px 10px;
  cursor: pointer;
  font-family: 'Consolas', 'Lucida Console', monospace;
  font-size: 13px;

  &:hover {
    background: ${({ isActive }) =>
      isActive ? '#1d2529' : 'rgba(255,255,255,0.05)'};
  }

  @media (max-width: 600px) {
    min-height: 40px;
    font-size: 12px;
    line-height: 1.35;
  }
`;

const BootFooter = styled.div`
  margin-top: 10px;
  color: #707f8a;
  font-size: 11px;

  @media (max-width: 600px) {
    font-size: 10px;
    line-height: 1.35;
  }
`;

const PortfolioWrapper = styled.section<{ themeMode: SimpleTheme }>`
  --bg: ${({ themeMode }) => (themeMode === 'terminal' ? '#000000' : '#f4f5f7')};
  --text: ${({ themeMode }) => (themeMode === 'terminal' ? '#ffffff' : '#16181d')};
  --muted: ${({ themeMode }) => (themeMode === 'terminal' ? '#a1a1aa' : '#4b5563')};
  --panel: ${({ themeMode }) => (themeMode === 'terminal' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)')};
  --panel-border: ${({ themeMode }) => (themeMode === 'terminal' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.12)')};
  --card-bg: ${({ themeMode }) => (themeMode === 'terminal' ? '#0a0a0a' : '#ffffff')};
  --card-border: ${({ themeMode }) => (themeMode === 'terminal' ? '#1f1f1f' : '#d1d5db')};
  --chip-bg: ${({ themeMode }) => (themeMode === 'terminal' ? 'rgba(255,255,255,0.04)' : '#eef2f7')};
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  overflow-x: hidden;
  scroll-behavior: smooth;
`;

const PortfolioNav = styled.div`
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
`;

const Brand = styled.div`
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 0.5px;
  color: var(--text);
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ThemeToggle = styled.button`
  border: 1px solid var(--panel-border);
  background: var(--chip-bg);
  color: var(--text);
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
`;

const BackButton = styled.button`
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
`;

const PortfolioMain = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: 80px 24px;
`;

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 60px;
`;

const HeroBadge = styled.div`
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

const HeroTitle = styled.h2`
  margin: 0;
  font-size: 56px;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -1.5px;
  color: var(--text);

  @media (max-width: 600px) {
    font-size: 40px;
  }
`;

const HeroText = styled.p`
  margin: 24px 0 0;
  color: var(--muted);
  font-size: 20px;
  line-height: 1.6;
  max-width: 840px;
  text-align: justify;

  @media (max-width: 600px) {
    font-size: 17px;
  }
`;

const StatsStrip = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
`;

const StatPill = styled.div`
  font-size: 12px;
  color: var(--text);
  border: 1px solid var(--panel-border);
  background: var(--chip-bg);
  padding: 7px 10px;
  border-radius: 999px;
`;


const Cards = styled.div`
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

const Card = styled.article<{ accentColor?: string; colSpan?: number; rowSpan?: number }>`
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
    top: 0; left: 0; right: 0; height: 100px;
    background: linear-gradient(180deg, ${({ accentColor }) => accentColor ? `${accentColor}1A` : 'transparent'}, transparent);
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px -10px ${({ accentColor }) => accentColor ? `${accentColor}33` : 'rgba(0,0,0,0.5)'};
  }
`;

const CardTitle = styled.h3<{ accentColor?: string }>`
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

const CardText = styled.p`
  margin: 16px 0 0;
  color: var(--muted);
  font-size: 16px;
  line-height: 1.6;
`;

const SocialGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;
`;

const SocialButton = styled.a<{ bg: string; hoverBg: string }>`
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
`;

const CardMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 18px;
`;

const MetaItem = styled.div`
  color: var(--text);
  font-size: 13px;
  line-height: 1.5;
  border: 1px solid var(--panel-border);
  background: var(--chip-bg);
  padding: 8px 10px;
  border-radius: 8px;
`;

const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
`;

const FilterChip = styled.button<{ isActive: boolean }>`
  border: 1px solid ${({ isActive }) => (isActive ? '#22c55e' : 'var(--panel-border)')};
  background: ${({ isActive }) => (isActive ? 'rgba(34,197,94,0.2)' : 'var(--chip-bg)')};
  color: var(--text);
  padding: 7px 12px;
  border-radius: 999px;
  font-size: 12px;
  cursor: pointer;
`;

const ProjectsSection = styled.section`
  margin-top: 36px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.article<{ accentColor: string; isFocused: boolean }>`
  border: 1px solid ${({ isFocused }) => (isFocused ? '#22c55e' : 'var(--panel-border)')};
  border-left: 3px solid ${({ accentColor }) => accentColor};
  border-radius: 12px;
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.015));
  padding: 22px;
  backdrop-filter: blur(4px);
  transition: transform 0.25s ease, border-color 0.2s ease, box-shadow 0.25s ease;
  animation: projectReveal 0.5s ease both;
  transform-origin: center;

  &:hover {
    transform: translateY(-4px) rotateX(2deg) rotateY(-1deg);
    border-color: ${({ accentColor }) => accentColor};
    box-shadow: 0 18px 30px rgba(0, 0, 0, 0.18);
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

const ProjectHeader = styled.div`
  margin-bottom: 10px;
`;

const ProjectName = styled.h4`
  margin: 0;
  color: var(--text);
  font-size: 20px;
  letter-spacing: -0.3px;
`;

const ProjectStack = styled.div`
  margin-top: 6px;
  color: #93c5fd;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.55px;
`;

const ProjectSummary = styled.p`
  margin: 0;
  color: var(--muted);
  line-height: 1.6;
  font-size: 14px;
`;

const ProjectHighlights = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
`;

const ProjectHighlight = styled.span`
  font-size: 12px;
  color: var(--text);
  border: 1px solid var(--panel-border);
  padding: 5px 8px;
  border-radius: 999px;
  background: var(--chip-bg);
`;

const ProjectOpenLink = styled.a`
  display: inline-flex;
  margin-top: 14px;
  color: #22c55e;
  text-decoration: none;
  font-size: 12px;
  border-bottom: 1px dashed rgba(34, 197, 94, 0.5);
`;

const PaletteOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.56);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 12vh;
  z-index: 100;
`;

const PalettePanel = styled.div`
  width: min(620px, calc(100vw - 32px));
  border: 1px solid var(--panel-border);
  background: var(--card-bg);
  border-radius: 10px;
  padding: 12px;
`;

const PaletteTitle = styled.div`
  color: var(--muted);
  font-size: 12px;
  margin-bottom: 8px;
`;

const PaletteItem = styled.div<{ isActive: boolean }>`
  width: 100%;
  text-align: left;
  border: 1px solid ${({ isActive }) => (isActive ? '#22c55e' : 'transparent')};
  border-radius: 8px;
  background: ${({ isActive }) => (isActive ? 'rgba(34,197,94,0.16)' : 'transparent')};
  color: var(--text);
  padding: 9px 10px;
  font-size: 13px;
`;

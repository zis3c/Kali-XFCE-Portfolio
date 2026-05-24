import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaGithub, FaLinkedin, FaYoutube, FaInstagram } from 'react-icons/fa';
import { FiPower, FiSun, FiMoon } from 'react-icons/fi';
import * as Styled from './PortfolioMode.styles';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  GlitchText sub-component                                           */
/* ------------------------------------------------------------------ */

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

const GlitchText = ({ words }: { words: string[] }) => {
  const [text, setText] = useState(words[0]);
  const [wordIndex, setWordIndex] = useState(0);
  const longestWord = words.reduce(
    (max, current) => (current.length > max.length ? current : max),
    words[0] || ''
  );

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

  return (
    <Styled.GlitchWrap>
      <Styled.GlitchGhost>{longestWord}</Styled.GlitchGhost>
      <Styled.GlitchLive>{text}</Styled.GlitchLive>
    </Styled.GlitchWrap>
  );
};

/* ------------------------------------------------------------------ */
/*  PortfolioMode component                                           */
/* ------------------------------------------------------------------ */

interface Props {
  onBackToChooser: () => void;
}

const PortfolioMode = ({ onBackToChooser }: Props): JSX.Element => {
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>('All');
  const [simpleTheme, setSimpleTheme] = useState<SimpleTheme>('terminal');
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [focusedProjectIndex, setFocusedProjectIndex] = useState(0);

  const filteredProjects = featuredProjects.filter((project) => {
    if (projectFilter === 'All') return true;
    return project.tags.includes(projectFilter);
  });

  useEffect(() => {
    setFocusedProjectIndex(0);
  }, [projectFilter]);

  // Smooth scroll (inertia-like) for desktop
  useEffect(() => {
    const prevHtml = document.documentElement.style.scrollBehavior;
    const prevBody = document.body.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.scrollBehavior = 'smooth';

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
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
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
  }, [isPaletteOpen, paletteIndex, filteredProjects, focusedProjectIndex]);

  return (
    <Styled.Wrapper themeMode={simpleTheme}>
      <Styled.Nav>
        <Styled.Brand>Radzi Zamri (Zis3c)</Styled.Brand>
        <Styled.NavActions>
          <Styled.ThemeToggle
            type="button"
            onClick={() =>
              setSimpleTheme((prev) => (prev === 'terminal' ? 'paper' : 'terminal'))
            }
            aria-label={simpleTheme === 'terminal' ? 'Switch to paper light theme' : 'Switch to terminal dark theme'}
            title={simpleTheme === 'terminal' ? 'Paper Light' : 'Terminal Dark'}
          >
            {simpleTheme === 'terminal' ? <FiSun /> : <FiMoon />}
            <span className="btn-label">
              {simpleTheme === 'terminal' ? 'Paper Light' : 'Terminal Dark'}
            </span>
          </Styled.ThemeToggle>
          <Styled.BackButton
            onClick={onBackToChooser}
            aria-label="Open system boot menu"
            title="System Boot Menu"
          >
            <FiPower />
            <span className="btn-label">System Boot Menu</span>
          </Styled.BackButton>
        </Styled.NavActions>
      </Styled.Nav>
      <Styled.Main>
        <Styled.StatsStrip>
          <Styled.StatPill>Role: Cybersecurity Student</Styled.StatPill>
          <Styled.StatPill>CTF Team: Dot Zero</Styled.StatPill>
          <Styled.StatPill>Repos: 14+</Styled.StatPill>
          <Styled.StatPill>Now Building: Automation + Security Tools</Styled.StatPill>
        </Styled.StatsStrip>
        <Styled.HeroSection id="simple-about">
          <Styled.HeroBadge>Cybersecurity Student</Styled.HeroBadge>
          <Styled.HeroTitle>
            <GlitchText words={['Cybersecurity Portfolio', 'Offensive Security', 'Purple Team', 'Dot Zero']} />
          </Styled.HeroTitle>
          <Styled.HeroText>
            USAS Bachelor of Computer Science student with offensive and defensive
            security projects, CTF experience with Dot Zero, and hands-on
            automation/tooling projects built from curiosity and hobby exploration.
          </Styled.HeroText>
          <Styled.SocialGrid>
            <Styled.SocialButton href="mailto:i24107504@usas.student.edu.my" bg="#ea4335" hoverBg="#d33426">
              <FaEnvelope /> Email
            </Styled.SocialButton>
            <Styled.SocialButton href="https://github.com/zis3c" target="_blank" rel="noopener noreferrer" bg="#24292e" hoverBg="#1b1f23">
              <FaGithub /> GitHub
            </Styled.SocialButton>
            <Styled.SocialButton href="https://linkedin.com/in/radzizamri" target="_blank" rel="noopener noreferrer" bg="#0a66c2" hoverBg="#004182">
              <FaLinkedin /> LinkedIn
            </Styled.SocialButton>
            <Styled.SocialButton href="https://www.youtube.com/@zis3c" target="_blank" rel="noopener noreferrer" bg="#ff0000" hoverBg="#cc0000">
              <FaYoutube /> YouTube
            </Styled.SocialButton>
            <Styled.SocialButton href="https://www.instagram.com/radz.z_/" target="_blank" rel="noopener noreferrer" bg="linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)" hoverBg="linear-gradient(45deg, #d3812c 0%, #cc5c34 25%, #c2213a 50%, #b31e59 75%, #a61578 100%)">
              <FaInstagram /> Instagram
            </Styled.SocialButton>
          </Styled.SocialGrid>
        </Styled.HeroSection>

        <Styled.Cards>
          <Styled.Card accentColor="#3b82f6" colSpan={2}>
            <Styled.CardTitle accentColor="#3b82f6">About Me</Styled.CardTitle>
            <Styled.CardText>
              Purple team focused. USAS Bachelor of Computer Science student and active
              member of Dot Zero CTF team. I love breaking systems to understand their
              flaws while building practical tools from curiosity, experimentation,
              and daily problem-solving needs.
            </Styled.CardText>
          </Styled.Card>
          <Styled.Card accentColor="#10b981" rowSpan={2}>
            <Styled.CardTitle accentColor="#10b981">Project Arsenal</Styled.CardTitle>
            <Styled.CardText>
              Hands-on builds across cybersecurity tooling, Telegram bots, local automation,
              and utility apps made for learning and real use.
            </Styled.CardText>
            <Styled.CardMeta>
              <Styled.MetaItem>14 repositories reviewed</Styled.MetaItem>
              <Styled.MetaItem>Security + automation focus</Styled.MetaItem>
              <Styled.MetaItem>Academic + hobby/curiosity projects</Styled.MetaItem>
            </Styled.CardMeta>
          </Styled.Card>
          <Styled.Card accentColor="#f43f5e" colSpan={2} id="simple-contact">
            <Styled.CardTitle accentColor="#f43f5e">Contact</Styled.CardTitle>
            <Styled.CardText>
              Open to learning, collaboration, and internship opportunities.
            </Styled.CardText>
          </Styled.Card>
        </Styled.Cards>

        <Styled.FilterRow id="simple-projects">
          {PROJECT_FILTERS.map((filter) => (
            <Styled.FilterChip
              key={filter}
              type="button"
              isActive={projectFilter === filter}
              onClick={() => setProjectFilter(filter)}
            >
              {filter}
            </Styled.FilterChip>
          ))}
        </Styled.FilterRow>

        <Styled.ProjectsSection>
          {filteredProjects.map((project, index) => (
            <Styled.ProjectCard
              key={project.name}
              accentColor={project.accent}
              isFocused={index === focusedProjectIndex}
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <Styled.ProjectHeader>
                <Styled.ProjectName>{project.name}</Styled.ProjectName>
                <Styled.ProjectStack>{project.stack}</Styled.ProjectStack>
              </Styled.ProjectHeader>
              <Styled.ProjectSummary>{project.summary}</Styled.ProjectSummary>
              <Styled.ProjectHighlights>
                {project.highlights.map((highlight) => (
                  <Styled.ProjectHighlight key={`${project.name}-${highlight}`}>{highlight}</Styled.ProjectHighlight>
                ))}
              </Styled.ProjectHighlights>
              <Styled.ProjectOpenLink href={project.link} target="_blank" rel="noopener noreferrer">
                Open Repository
              </Styled.ProjectOpenLink>
            </Styled.ProjectCard>
          ))}
        </Styled.ProjectsSection>
      </Styled.Main>
      {isPaletteOpen && (
        <Styled.PaletteOverlay onClick={() => setIsPaletteOpen(false)}>
          <Styled.PalettePanel onClick={(e) => e.stopPropagation()}>
            <Styled.PaletteTitle>Command Palette</Styled.PaletteTitle>
            {['Go to About', 'Go to Projects', 'Go to Contact', 'Open GitHub', 'Toggle Theme'].map(
              (action, index) => (
                <Styled.PaletteItem key={action} isActive={index === paletteIndex}>
                  {action}
                </Styled.PaletteItem>
              )
            )}
          </Styled.PalettePanel>
        </Styled.PaletteOverlay>
      )}
    </Styled.Wrapper>
  );
};

export default PortfolioMode;

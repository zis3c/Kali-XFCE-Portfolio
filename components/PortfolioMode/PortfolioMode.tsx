import React, { useState, useEffect } from 'react';
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaInstagram,
} from 'react-icons/fa';
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
    name: 'CloudSentinel (FYP)',
    stack: 'Python, Next.js, ClickHouse, Redis, DigitalOcean',
    summary:
      'SSH Honeypot & Threat Detection System capturing real-time brute-force sessions and scanner traffic.',
    highlights: [
      'HASSH fingerprinting & 20 MITRE ATT&CK rules',
      'Automated firewall IP blocking (<1ms median response)',
      'Next.js dashboard backed by ClickHouse & Redis with GeoIP maps',
    ],
    accent: '#ef4444',
    tags: ['Security', 'Web', 'Research'],
    link: 'https://github.com/zis3c/CloudSentinel',
  },
  {
    name: 'RedLilyGO',
    stack: 'C++, .NET 8, ESP32-S3, GitHub Actions',
    summary:
      'Custom security testing firmware for LILYGO T-Dongle-S3 USB & Wi-Fi research.',
    highlights: [
      'USB HID payload automation & Wi-Fi packet capture (PCAP)',
      'Local web UI & .NET 8 companion desktop manager over serial',
      'CI pipeline with CodeQL, Semgrep & Gitleaks security checks',
    ],
    accent: '#f97316',
    tags: ['Security', 'Research', 'Automation'],
    link: 'https://github.com/zis3c/RedLilyGO',
  },
  {
    name: 'JanjiCare',
    stack: 'Laravel 13, React 18, Inertia.js, Tailwind, LiveKit WebRTC',
    summary:
      'Full-stack clinic booking & telehealth consultation platform with real-time queues.',
    highlights: [
      'Role-based access control (Patient, Doctor, Admin)',
      'LiveKit WebRTC video consultations with server-signed JWT tokens',
      'Real-time appointment queue updates powered by Laravel Reverb',
    ],
    accent: '#06b6d4',
    tags: ['Web'],
    link: 'https://github.com/zis3c/Clinic-Web-Appointment',
  },
  {
    name: 'Dot Zero CTF Pipeline & RE',
    stack: 'Ghidra, IDA, x64dbg, GDB/GEF, Frida, Python, Bash',
    summary:
      'CTF automation pipeline and hands-on Reverse Engineering training materials.',
    highlights: [
      'CTFd workspace automation tool to streamline challenge downloads & write-ups',
      'RE workshops: Ghidra/IDA decompiler triage, x64dbg binary patching & Frida hooks',
      'Crackme analysis & anti-reversing: ELF/PE parsing, GDB/GEF debugging & memory inspection',
    ],
    accent: '#8b5cf6',
    tags: ['Security', 'Automation'],
    link: 'https://ctftime.org/team/421634',
  },
  {
    name: 'STEM Platform & Telebot',
    stack: 'React, TypeScript, Python, Telegram Bot API, Google Sheets',
    summary:
      'Official web portal and automated membership verification ecosystem for STEM USAS.',
    highlights: [
      'Official STEM-USAS web portal at stem.zis3c.dev',
      'Verified 62+ registered members with automated digital receipts',
      'Google Sheets sync pipeline with admin & superadmin controls',
    ],
    accent: '#22c55e',
    tags: ['Web', 'Automation', 'Bot'],
    link: 'https://github.com/zis3c/STEM-Telebot',
  },
  {
    name: 'USAS Assignment Notifier & Timetable',
    stack: 'Python, PostgreSQL, Telegram Bot API, React',
    summary:
      'Automated LMS deadline tracker for 50 students across 245 assignments, plus timetable exporter.',
    highlights: [
      'Automated deadline alerts synced from USAS LMS',
      'Student timetable exporter at jadualkelas.zis3c.dev (PDF & wallpapers)',
      'Privacy-focused student credential & notification management',
    ],
    accent: '#e879f9',
    tags: ['Automation', 'Bot', 'Web'],
    link: 'https://github.com/zis3c/USAS-Assignment-Notifier',
  },
  {
    name: 'Polyglot Files',
    stack: 'Python CLI, File Internals, Steganography',
    summary:
      'Dual-format file generator combining valid JPEG/PNG and PDF structures for security analysis.',
    highlights: [
      'Valid JPEG+PDF and PNG+PDF hybrid file generation',
      'File signature parser behavior and upload validation research',
      'Safe demonstration of format confusion vectors',
    ],
    accent: '#a78bfa',
    tags: ['Security', 'Research'],
    link: 'https://github.com/zis3c/Polyglot-File',
  },
  {
    name: 'QRBot & Qrtendify',
    stack: 'Python, Aiogram, Docker',
    summary:
      'Versatile QR code bot ecosystem for text, WiFi, vCard, and encrypted payloads.',
    highlights: [
      'Multi-format QR code generation & camera/image decoding',
      'Encrypted payload support for attendance tracking',
      'Lightweight Docker deployment for high uptime',
    ],
    accent: '#fb7185',
    tags: ['Security', 'Bot', 'Automation'],
    link: 'https://github.com/zis3c/QRBot',
  },
  {
    name: 'Finvault',
    stack: 'Next.js, PostgreSQL, Prisma, Gemini API',
    summary: 'Fintech-style wallet simulator with AI transaction analysis.',
    highlights: [
      'Wallet balance modeling & transaction ledger',
      'Gemini AI-assisted fraud and spending insights',
      'Database-backed state management with Prisma',
    ],
    accent: '#14b8a6',
    tags: ['Web'],
    link: 'https://github.com/zis3c/Finvault',
  },
];

const PROJECT_FILTERS = [
  'All',
  'Security',
  'Automation',
  'Bot',
  'Web',
  'Research',
] as const;
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

  // Manage body / html scrolling and styling for Portfolio Mode
  useEffect(() => {
    const prevHtmlScrollBehavior =
      document.documentElement.style.scrollBehavior;
    const prevBodyScrollBehavior = document.body.style.scrollBehavior;
    const prevHtmlHeight = document.documentElement.style.height;
    const prevBodyHeight = document.body.style.height;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;

    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.scrollBehavior = 'smooth';
    document.documentElement.style.height = 'auto';
    document.body.style.height = 'auto';
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';

    return () => {
      document.documentElement.style.scrollBehavior = prevHtmlScrollBehavior;
      document.body.style.scrollBehavior = prevBodyScrollBehavior;
      document.documentElement.style.height = prevHtmlHeight;
      document.body.style.height = prevBodyHeight;
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
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
      {
        label: 'Open GitHub',
        run: () =>
          window.open(
            'https://github.com/zis3c',
            '_blank',
            'noopener,noreferrer'
          ),
      },
      {
        label: 'Toggle Theme',
        run: () =>
          setSimpleTheme((prev) =>
            prev === 'terminal' ? 'paper' : 'terminal'
          ),
      },
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
          setPaletteIndex(
            (prev) => (prev - 1 + paletteActions.length) % paletteActions.length
          );
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
        setFocusedProjectIndex(
          (prev) => (prev + 1) % Math.max(1, filteredProjects.length)
        );
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setFocusedProjectIndex(
          (prev) =>
            (prev - 1 + Math.max(1, filteredProjects.length)) %
            Math.max(1, filteredProjects.length)
        );
      }
      if (e.key === 'Enter' && filteredProjects[focusedProjectIndex]) {
        window.open(
          filteredProjects[focusedProjectIndex].link,
          '_blank',
          'noopener,noreferrer'
        );
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
              setSimpleTheme((prev) =>
                prev === 'terminal' ? 'paper' : 'terminal'
              )
            }
            aria-label={
              simpleTheme === 'terminal'
                ? 'Switch to paper light theme'
                : 'Switch to terminal dark theme'
            }
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
          <Styled.StatPill>
            Role: Cybersecurity & CS Undergrad (CGPA 3.83)
          </Styled.StatPill>
          <Styled.StatPill>CTF Team: Dot Zero (U545)</Styled.StatPill>
          <Styled.StatPill>Repos: 20+</Styled.StatPill>
          <Styled.StatPill>
            Now Building: Threat Detection & RE Tooling
          </Styled.StatPill>
        </Styled.StatsStrip>
        <Styled.HeroSection id="simple-about">
          <Styled.HeroBadge>
            Cybersecurity Undergrad • Purple Team • RE Trainer
          </Styled.HeroBadge>
          <Styled.HeroTitle>
            <GlitchText
              words={[
                'Cybersecurity Portfolio',
                'Threat Detection',
                'Reverse Engineering',
                'Dot Zero CTF',
              ]}
            />
          </Styled.HeroTitle>
          <Styled.HeroText>
            Universiti Sultan Azlan Shah (USAS) Computer Science undergraduate
            (CGPA 3.83) with practical experience in threat detection, reverse
            engineering, and full-stack development. Secretary & RE Trainer for
            Dot Zero CTF team, currently seeking a 14-week Cybersecurity
            Internship (starting February 2027) in SOC monitoring, incident
            response, or penetration testing.
          </Styled.HeroText>
          <Styled.SocialGrid>
            <Styled.SocialButton
              href="mailto:r.zradzizamri@gmail.com"
              bg="#ea4335"
              hoverBg="#d33426"
            >
              <FaEnvelope /> Email
            </Styled.SocialButton>
            <Styled.SocialButton
              href="https://github.com/zis3c"
              target="_blank"
              rel="noopener noreferrer"
              bg="#24292e"
              hoverBg="#1b1f23"
            >
              <FaGithub /> GitHub
            </Styled.SocialButton>
            <Styled.SocialButton
              href="https://linkedin.com/in/radzizamri"
              target="_blank"
              rel="noopener noreferrer"
              bg="#0a66c2"
              hoverBg="#004182"
            >
              <FaLinkedin /> LinkedIn
            </Styled.SocialButton>
            <Styled.SocialButton
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              bg="#059669"
              hoverBg="#047857"
            >
              📄 Resume (PDF)
            </Styled.SocialButton>
            <Styled.SocialButton
              href="https://www.youtube.com/@zis3c"
              target="_blank"
              rel="noopener noreferrer"
              bg="#ff0000"
              hoverBg="#cc0000"
            >
              <FaYoutube /> YouTube
            </Styled.SocialButton>
            <Styled.SocialButton
              href="https://www.instagram.com/radz.z_/"
              target="_blank"
              rel="noopener noreferrer"
              bg="linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)"
              hoverBg="linear-gradient(45deg, #d3812c 0%, #cc5c34 25%, #c2213a 50%, #b31e59 75%, #a61578 100%)"
            >
              <FaInstagram /> Instagram
            </Styled.SocialButton>
          </Styled.SocialGrid>
        </Styled.HeroSection>

        <Styled.Cards>
          <Styled.Card accentColor="#3b82f6" colSpan={2}>
            <Styled.CardTitle accentColor="#3b82f6">About Me</Styled.CardTitle>
            <Styled.CardText>
              Purple team focused Computer Science undergraduate at Universiti
              Sultan Azlan Shah (Degree CGPA 3.83, Diploma CGPA 3.77) with 4
              Dean&apos;s List awards. Secretary and Reverse Engineering Trainer
              for USAS CTF team Dot Zero (U545). Passionate about threat
              detection, binary analysis across Ghidra, IDA Pro, x64dbg, GDB/GEF
              &amp; Frida, honeypot telemetry, firmware security, and building
              automated security tooling.
            </Styled.CardText>
          </Styled.Card>
          <Styled.Card accentColor="#10b981" rowSpan={2}>
            <Styled.CardTitle accentColor="#10b981">
              Project Arsenal
            </Styled.CardTitle>
            <Styled.CardText>
              Hands-on builds across cybersecurity threat intelligence, custom
              firmware, telehealth systems, CTF pipelines, and campus automation
              tools.
            </Styled.CardText>
            <Styled.CardMeta>
              <Styled.MetaItem>20+ public repositories</Styled.MetaItem>
              <Styled.MetaItem>Threat detection &amp; RE focus</Styled.MetaItem>
              <Styled.MetaItem>
                Honeypot, firmware, web &amp; automation
              </Styled.MetaItem>
            </Styled.CardMeta>
          </Styled.Card>
          <Styled.Card accentColor="#f43f5e" colSpan={2} id="simple-contact">
            <Styled.CardTitle accentColor="#f43f5e">Contact</Styled.CardTitle>
            <Styled.CardText>
              Open to 14-week Cybersecurity Internship (Feb 2027), CTF team
              collabs, and security research opportunities.
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
                  <Styled.ProjectHighlight key={`${project.name}-${highlight}`}>
                    {highlight}
                  </Styled.ProjectHighlight>
                ))}
              </Styled.ProjectHighlights>
              <Styled.ProjectOpenLink
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
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
            {[
              'Go to About',
              'Go to Projects',
              'Go to Contact',
              'Open GitHub',
              'Toggle Theme',
            ].map((action, index) => (
              <Styled.PaletteItem
                key={action}
                isActive={index === paletteIndex}
              >
                {action}
              </Styled.PaletteItem>
            ))}
          </Styled.PalettePanel>
        </Styled.PaletteOverlay>
      )}
    </Styled.Wrapper>
  );
};

export default PortfolioMode;

import React, { useState, useEffect } from 'react';
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaInstagram,
  FaShieldAlt,
  FaMicrochip,
  FaHospital,
  FaBolt,
  FaFlag,
  FaRobot,
  FaBell,
  FaFileCode,
  FaQrcode,
  FaFolder,
} from 'react-icons/fa';
import {
  SiPython,
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiLaravel,
  SiPhp,
  SiTailwindcss,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiDigitalocean,
  SiTelegram,
  SiCplusplus,
  SiDotnet,
  SiWebrtc,
  SiWireshark,
  SiKalilinux,
  SiGnubash,
  SiGoogle,
  SiGithubactions,
  SiLinux,
} from 'react-icons/si';
import {
  FiPower,
  FiSun,
  FiMoon,
  FiExternalLink,
  FiCpu,
  FiTerminal,
  FiCommand,
} from 'react-icons/fi';
import * as Styled from './PortfolioMode.styles';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type TechItem = {
  name: string;
  icon: React.ReactNode;
};

type FeaturedProject = {
  slot: string;
  name: string;
  icon: React.ReactNode;
  repoType: string;
  stack: TechItem[];
  summary: string;
  highlights: string[];
  tags: string[];
  link: string;
  demoLink?: string;
  demoLabel?: string;
};

const featuredProjects: FeaturedProject[] = [
  {
    slot: '01',
    name: 'CloudSentinel (FYP)',
    icon: <FaShieldAlt />,
    repoType: 'SSH Honeypot & Threat Intel',
    stack: [
      { name: 'Python', icon: <SiPython /> },
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'Redis', icon: <SiRedis /> },
      { name: 'DigitalOcean', icon: <SiDigitalocean /> },
      { name: 'Linux', icon: <SiLinux /> },
    ],
    summary:
      'High-interaction SSH honeypot and threat detection system deployed on DigitalOcean to capture brute-force sessions, attacker command streams, and automated scanner payloads in real time.',
    highlights: [
      'HASSH client fingerprinting paired with 20 MITRE ATT&CK classification rules',
      'Automated iptables firewall IP containment with <1ms median benchmark response',
      'Next.js telemetry dashboard backed by ClickHouse time-series storage and Redis pub/sub',
    ],
    tags: ['Security', 'Web', 'Research'],
    link: 'https://github.com/zis3c/CloudSentinel',
  },
  {
    slot: '02',
    name: 'RedLilyGO',
    icon: <FaMicrochip />,
    repoType: 'ESP32-S3 Security Firmware',
    stack: [
      { name: 'C++', icon: <SiCplusplus /> },
      { name: '.NET 8', icon: <SiDotnet /> },
      { name: 'Wireshark', icon: <SiWireshark /> },
      { name: 'CI/CD', icon: <SiGithubactions /> },
    ],
    summary:
      'Custom C++ security assessment firmware for the LILYGO T-Dongle-S3 hardware dongle, built for authorized USB HID testing and wireless packet capture.',
    highlights: [
      'Authorized USB HID keystroke injection and payload sequencing',
      'Onboard Wi-Fi PCAP packet capture controlled via local web UI and .NET 8 desktop companion over serial',
      'Hardened GitHub Actions pipeline with CodeQL, Semgrep, and Gitleaks static analysis',
    ],
    tags: ['Security', 'Research', 'Automation'],
    link: 'https://github.com/zis3c/RedLilyGO',
  },
  {
    slot: '03',
    name: 'JanjiCare',
    icon: <FaHospital />,
    repoType: 'Clinic Web Appointment & Telehealth',
    stack: [
      { name: 'Laravel 13', icon: <SiLaravel /> },
      { name: 'PHP 8.3', icon: <SiPhp /> },
      { name: 'React 18', icon: <SiReact /> },
      { name: 'Tailwind', icon: <SiTailwindcss /> },
      { name: 'WebRTC', icon: <SiWebrtc /> },
    ],
    summary:
      'Full-stack clinical appointment scheduling and telehealth consultation platform with live queue synchronization.',
    highlights: [
      'Role-based access control isolating Patient, Doctor, and Administrator workflows',
      'LiveKit WebRTC encrypted video consultations authenticated via server-signed JWT room tokens',
      'Real-time clinical queue updates broadcast over Laravel Reverb WebSockets',
    ],
    tags: ['Web'],
    link: 'https://github.com/zis3c/Clinic-Web-Appointment',
  },
  {
    slot: '04',
    name: 'Google Forms Spammer',
    icon: <FaBolt />,
    repoType: 'Async Stress Testing Engine',
    stack: [
      { name: 'Python', icon: <SiPython /> },
      { name: 'aiohttp', icon: <SiPython /> },
      { name: 'Google Forms', icon: <SiGoogle /> },
      { name: 'Rich CLI', icon: <SiGnubash /> },
    ],
    summary:
      'Asynchronous stress-testing engine for Google Forms engineered with multi-worker concurrency and automated field discovery.',
    highlights: [
      'Non-blocking aiohttp worker pool capable of high-throughput concurrent request bursts',
      'Adaptive HTTP 429 rate-limit backoff, user-agent rotation, and automatic form schema parser',
      'Includes local web configurator UI and Rich terminal telemetry view',
    ],
    tags: ['Automation', 'Security', 'Research'],
    link: 'https://github.com/zis3c/google-form-spammer',
  },
  {
    slot: '05',
    name: 'Dot Zero CTF Pipeline & RE',
    icon: <FaFlag />,
    repoType: 'CTFd Automation & RE Workshops',
    stack: [
      { name: 'Kali Linux', icon: <SiKalilinux /> },
      { name: 'Python', icon: <SiPython /> },
      { name: 'Bash', icon: <SiGnubash /> },
      { name: 'Reverse Eng', icon: <SiLinux /> },
    ],
    summary:
      'CTFd workspace automation CLI and hands-on Reverse Engineering training curriculum built for USAS CTF team Dot Zero (U545).',
    highlights: [
      'Automated CTFd challenge synchronization, directory scaffolding, and write-up templates',
      'RE training labs: Ghidra and IDA Pro static decompilation, x64dbg patching, and Frida dynamic hooks',
      'Crackme triage covering ELF/PE internals, GDB+GEF memory inspection, and anti-debugging bypass',
    ],
    tags: ['Security', 'Automation'],
    link: 'https://ctftime.org/team/421634',
    demoLink: 'https://ctftime.org/team/421634',
    demoLabel: 'CTFtime Profile',
  },
  {
    slot: '06',
    name: 'STEM Platform & Telebot',
    icon: <FaRobot />,
    repoType: 'Student Ecosystem & Bot',
    stack: [
      { name: 'React', icon: <SiReact /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'Python', icon: <SiPython /> },
      { name: 'Telegram', icon: <SiTelegram /> },
      { name: 'Google Sheets', icon: <SiGoogle /> },
    ],
    summary:
      'Official student association portal and automated Telegram membership verification pipeline for STEM USAS.',
    highlights: [
      'Production web portal deployed at stem.zis3c.dev for event and committee management',
      'Verified 62+ registered members with automated digital receipt generation',
      'Real-time Google Sheets synchronization with role-tiered admin and superadmin bot commands',
    ],
    tags: ['Web', 'Automation', 'Bot'],
    link: 'https://github.com/zis3c/STEM-Telebot',
    demoLink: 'https://stem.zis3c.dev',
    demoLabel: 'stem.zis3c.dev',
  },
  {
    slot: '07',
    name: 'USAS Assignment Notifier & Timetable',
    icon: <FaBell />,
    repoType: 'LMS Tracker & Timetable Generator',
    stack: [
      { name: 'Python', icon: <SiPython /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
      { name: 'Telegram', icon: <SiTelegram /> },
      { name: 'React', icon: <SiReact /> },
    ],
    summary:
      'Automated campus LMS deadline tracker serving 50 students across 245 assignments, paired with a class timetable exporter.',
    highlights: [
      'Scheduled LMS scraper dispatching proactive Telegram deadline alerts',
      'Interactive timetable generator at jadualkelas.zis3c.dev exporting PDFs and lockscreen wallpapers',
      'PostgreSQL state persistence with encrypted student session handling',
    ],
    tags: ['Automation', 'Bot', 'Web'],
    link: 'https://github.com/zis3c/USAS-Assignment-Notifier',
    demoLink: 'https://jadualkelas.zis3c.dev',
    demoLabel: 'jadualkelas.zis3c.dev',
  },
  {
    slot: '08',
    name: 'Polyglot Files',
    icon: <FaFileCode />,
    repoType: 'Format Confusion & Security Research',
    stack: [
      { name: 'Python', icon: <SiPython /> },
      { name: 'Linux', icon: <SiLinux /> },
      { name: 'Binary RE', icon: <SiGnubash /> },
    ],
    summary:
      'Dual-signature file generator combining valid JPEG/PNG and PDF binary structures to test magic-byte parsers and upload validators.',
    highlights: [
      'Constructs valid hybrid JPEG+PDF and PNG+PDF polyglot binaries',
      'Demonstrates parser differential behavior across document and image readers',
      'Designed for security research and defensive upload filter hardening',
    ],
    tags: ['Security', 'Research'],
    link: 'https://github.com/zis3c/Polyglot-File',
  },
  {
    slot: '09',
    name: 'QRBot & Qrtendify',
    icon: <FaQrcode />,
    repoType: 'QR Code Automation & Crypto Attendance',
    stack: [
      { name: 'Python', icon: <SiPython /> },
      { name: 'Docker', icon: <SiDocker /> },
      { name: 'Telegram', icon: <SiTelegram /> },
    ],
    summary:
      'Multi-format QR code generation, optical decoding, and encrypted attendance verification bot ecosystem.',
    highlights: [
      'Generates and decodes Text, Wi-Fi, vCard, and geolocation QR payloads via Telegram',
      'Cryptographic payload signing for tamper-resistant event attendance check-ins',
      'Containerized with Docker for isolated, reproducible deployment',
    ],
    tags: ['Security', 'Bot', 'Automation'],
    link: 'https://github.com/zis3c/QRBot',
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

const CHARS = '!<>-_\\/[]{}~=+*^?#________';

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
        setSimpleTheme((prev) => (prev === 'terminal' ? 'paper' : 'terminal')),
    },
  ];

  useEffect(() => {
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
  });

  return (
    <Styled.Wrapper themeMode={simpleTheme}>
      {/* Top Workstation Window Titlebar */}
      <Styled.Nav>
        <Styled.BrandGroup>
          <Styled.StatusLed title="Workstation Online" />
          <Styled.Brand>
            <span>RADZI ZAMRI // ZIS3C</span>
            <span className="sys-path">SYS://WORKSTATION/PORTFOLIO.EXE</span>
          </Styled.Brand>
        </Styled.BrandGroup>

        <Styled.NavActions>
          <Styled.PaletteTrigger
            type="button"
            onClick={() => setIsPaletteOpen(true)}
            aria-label="Open command palette"
            title="Command Palette (Ctrl+K)"
          >
            <FiCommand />
            <span>Command</span>
            <span className="kbd-tag">Ctrl+K</span>
          </Styled.PaletteTrigger>

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
            title={simpleTheme === 'terminal' ? 'Paper Manual' : 'CRT Phosphor'}
          >
            {simpleTheme === 'terminal' ? <FiSun /> : <FiMoon />}
            <span className="btn-label">
              {simpleTheme === 'terminal' ? 'Paper Manual' : 'CRT Phosphor'}
            </span>
          </Styled.ThemeToggle>

          <Styled.BackButton
            type="button"
            onClick={onBackToChooser}
            aria-label="Open system boot menu"
            title="Return to BIOS Boot Menu"
          >
            <FiPower />
            <span className="btn-label">BIOS Boot</span>
          </Styled.BackButton>
        </Styled.NavActions>
      </Styled.Nav>

      <Styled.Main>
        {/* Section 1: Asymmetric Operator Dossier + Hardware Readout */}
        <Styled.HeroWorkbench id="simple-about">
          <Styled.HeroSection>
            <Styled.WindowChromeBar>
              <span>[0x00] // OPERATOR_DOSSIER.SYS</span>
              <span className="window-controls">
                <span className="win-code">TTY1</span>
                <span className="win-box" />
                <span className="win-box" />
              </span>
            </Styled.WindowChromeBar>

            <Styled.HeroBody>
              <Styled.HeroTitle>
                <GlitchText
                  words={[
                    'Cybersecurity Portfolio',
                    'Threat Detection & SOC',
                    'Reverse Engineering',
                    'Dot Zero CTF (U545)',
                  ]}
                />
              </Styled.HeroTitle>

              <Styled.HeroRoleSub>
                Computer Science Undergrad (CGPA 3.83) / Purple Team / RE
                Trainer
              </Styled.HeroRoleSub>

              <Styled.HeroText>
                Universiti Sultan Azlan Shah (USAS) Computer Science
                undergraduate with hands-on experience in SSH honeypot
                telemetry, binary reverse engineering (Ghidra, IDA Pro, x64dbg,
                GDB+GEF, Frida), custom hardware firmware, and full-stack
                engineering. Secretary and Reverse Engineering Trainer for Dot
                Zero CTF team, seeking a 14-week Cybersecurity Internship
                starting February 2027 in SOC monitoring, incident response, or
                penetration testing.
              </Styled.HeroText>

              <Styled.SocialGrid>
                <Styled.SocialButton href="mailto:r.zradzizamri@gmail.com">
                  <FaEnvelope /> Email Dispatch
                </Styled.SocialButton>
                <Styled.SocialButton
                  href="https://github.com/zis3c"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub /> GitHub (zis3c)
                </Styled.SocialButton>
                <Styled.SocialButton
                  href="https://linkedin.com/in/radzizamri"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin /> LinkedIn
                </Styled.SocialButton>
                <Styled.SocialButton
                  href="https://ctftime.org/team/421634"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFlag /> Dot Zero CTF
                </Styled.SocialButton>
                <Styled.SocialButton
                  href="https://www.youtube.com/@zis3c"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube /> YouTube
                </Styled.SocialButton>
                <Styled.SocialButton
                  href="https://www.instagram.com/radz.z_/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram /> Instagram
                </Styled.SocialButton>
              </Styled.SocialGrid>
            </Styled.HeroBody>
          </Styled.HeroSection>

          <Styled.TelemetryPanel aria-label="Verified Operator Specifications">
            <Styled.WindowChromeBar>
              <span>[0x01] // VERIFIED_TELEMETRY.LOG</span>
              <span className="win-code">READONLY</span>
            </Styled.WindowChromeBar>
            <Styled.TelemetryBody>
              <Styled.RegisterTable>
                <Styled.RegisterRow>
                  <dt>OPERATOR_ID</dt>
                  <dd>Radzi bin Zamri (zis3c)</dd>
                </Styled.RegisterRow>
                <Styled.RegisterRow>
                  <dt>DEGREE_BCSC</dt>
                  <dd>CGPA 3.83 (Dean&apos;s List Sem I-IV, USAS)</dd>
                </Styled.RegisterRow>
                <Styled.RegisterRow>
                  <dt>DIPLOMA_IT</dt>
                  <dd>CGPA 3.77 (Dean&apos;s List 4 Sems, USAS)</dd>
                </Styled.RegisterRow>
                <Styled.RegisterRow>
                  <dt>CTF_DIVISION</dt>
                  <dd>Dot Zero (U545) Secretary &amp; RE Trainer</dd>
                </Styled.RegisterRow>
                <Styled.RegisterRow>
                  <dt>CTF_RECORDS</dt>
                  <dd>21st RE:UN10N / 88th ApoorvCTF / 133rd 0xFun</dd>
                </Styled.RegisterRow>
                <Styled.RegisterRow>
                  <dt>CERTIFIED_01</dt>
                  <dd>Google Cybersecurity Professional (2026)</dd>
                </Styled.RegisterRow>
                <Styled.RegisterRow>
                  <dt>CERTIFIED_02</dt>
                  <dd>RE Bootcamp: Ghidra, IDA &amp; Linux x86_64</dd>
                </Styled.RegisterRow>
                <Styled.RegisterRow>
                  <dt>DEPLOYMENT</dt>
                  <dd>14-Wk Internship Ready (Feb 2027, Selangor/KL)</dd>
                </Styled.RegisterRow>
              </Styled.RegisterTable>
            </Styled.TelemetryBody>
          </Styled.TelemetryPanel>
        </Styled.HeroWorkbench>

        {/* Section 2: Mounted Repository Bay */}
        <Styled.DirectoryFrame id="simple-projects">
          <Styled.DirectoryHeaderBar>
            <Styled.SectionHeader>
              <Styled.SectionTitle>
                <span className="reg-prefix">DIR // 0x02</span>
                <span>Mounted Project Repositories</span>
              </Styled.SectionTitle>
              <Styled.SectionSubtitle>
                Production systems, hardware security firmware, async stress
                engines, and reverse engineering toolkits.
              </Styled.SectionSubtitle>
            </Styled.SectionHeader>
            <Styled.DirectoryCountBadge>
              MOUNTED: {String(filteredProjects.length).padStart(2, '0')} /{' '}
              {String(featuredProjects.length).padStart(2, '0')} MODULES
            </Styled.DirectoryCountBadge>
          </Styled.DirectoryHeaderBar>

          <Styled.FilterRow role="tablist" aria-label="Filter repositories">
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
            {filteredProjects.length === 0 ? (
              <Styled.EmptyStateBox>
                <p>No repository modules match the selected filter.</p>
                <button type="button" onClick={() => setProjectFilter('All')}>
                  Reset Filter to All
                </button>
              </Styled.EmptyStateBox>
            ) : (
              filteredProjects.map((project, index) => {
                const isFlagship =
                  projectFilter === 'All' && project.slot === '01';
                return (
                  <Styled.ProjectCard
                    key={project.name}
                    isFocused={index === focusedProjectIndex}
                    isFlagship={isFlagship}
                    onClick={() => setFocusedProjectIndex(index)}
                  >
                    <Styled.ProjectCardChrome
                      isFocused={index === focusedProjectIndex}
                    >
                      <span>
                        <span className="slot-id">[{project.slot}]</span> ::{' '}
                        {project.repoType.toUpperCase()}
                      </span>
                      <span className="slot-status">
                        {isFlagship ? 'FLAGSHIP FYP' : 'PUBLIC REPO'}
                      </span>
                    </Styled.ProjectCardChrome>

                    <Styled.ProjectCardBody isFlagship={isFlagship}>
                      <Styled.ProjectHeader>
                        <Styled.ProjectTopBar>
                          <Styled.ProjectIdentity>
                            <Styled.ProjectAvatar>
                              {project.icon}
                            </Styled.ProjectAvatar>
                            <Styled.ProjectMetaInfo>
                              <Styled.ProjectName>
                                {project.name}
                              </Styled.ProjectName>
                              <Styled.ProjectMetaRow>
                                <span className="repo-tag">
                                  <FaFolder /> {project.repoType}
                                </span>
                              </Styled.ProjectMetaRow>
                            </Styled.ProjectMetaInfo>
                          </Styled.ProjectIdentity>

                          <Styled.ProjectQuickGithub
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`GitHub repo for ${project.name}`}
                            title="Inspect Repository on GitHub"
                          >
                            <FaGithub />
                          </Styled.ProjectQuickGithub>
                        </Styled.ProjectTopBar>

                        <Styled.ProjectStackWrapper>
                          {project.stack.map((tech) => (
                            <Styled.TechBadge key={tech.name}>
                              <span className="tech-icon">{tech.icon}</span>
                              <span className="tech-name">{tech.name}</span>
                            </Styled.TechBadge>
                          ))}
                        </Styled.ProjectStackWrapper>

                        <Styled.ProjectSummary>
                          {project.summary}
                        </Styled.ProjectSummary>
                      </Styled.ProjectHeader>

                      <Styled.ProjectHighlights>
                        {project.highlights.map((highlight) => (
                          <Styled.ProjectHighlight
                            key={`${project.name}-${highlight}`}
                          >
                            {highlight}
                          </Styled.ProjectHighlight>
                        ))}
                      </Styled.ProjectHighlights>
                    </Styled.ProjectCardBody>

                    <Styled.ProjectActionRow>
                      <Styled.ProjectButtonGroup>
                        <Styled.ProjectOpenLink
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaGithub /> Inspect Repository
                        </Styled.ProjectOpenLink>
                        {project.demoLink && (
                          <Styled.ProjectDemoLink
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FiExternalLink />{' '}
                            {project.demoLabel || 'Live Deployment'}
                          </Styled.ProjectDemoLink>
                        )}
                      </Styled.ProjectButtonGroup>
                    </Styled.ProjectActionRow>
                  </Styled.ProjectCard>
                );
              })
            )}
          </Styled.ProjectsSection>
        </Styled.DirectoryFrame>

        {/* Section 3: Rack-Mount Technical Arsenal Matrix */}
        <Styled.ArsenalSection>
          <Styled.SectionHeader>
            <Styled.SectionTitle>
              <span className="reg-prefix">SYS // 0x03</span>
              <FiCpu />
              <span>Technical Arsenal &amp; Workstation Matrix</span>
            </Styled.SectionTitle>
            <Styled.SectionSubtitle>
              Hardware-indexed breakdown of reverse engineering disassemblers,
              dynamic instrumentation, languages, and defensive telemetry
              stacks.
            </Styled.SectionSubtitle>
          </Styled.SectionHeader>

          <Styled.ArsenalRack>
            <Styled.ArsenalRow>
              <Styled.ArsenalRowMeta>
                <span className="rack-addr">REG // 0x03A</span>
                <span className="rack-title">
                  <FiTerminal /> Reverse Engineering &amp; Binary Analysis
                </span>
                <span className="rack-desc">
                  Static decompilation, dynamic debugging, runtime API hooking,
                  and ELF/PE triage.
                </span>
              </Styled.ArsenalRowMeta>
              <Styled.ArsenalBadgeList>
                <Styled.ArsenalBadge>
                  <span className="badge-icon">
                    <SiKalilinux />
                  </span>
                  <span>Ghidra</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge>
                  <span className="badge-icon">
                    <SiLinux />
                  </span>
                  <span>IDA Pro</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge>
                  <span className="badge-icon">
                    <SiLinux />
                  </span>
                  <span>Binary Ninja</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge>
                  <span className="badge-icon">
                    <FiTerminal />
                  </span>
                  <span>Radare2 / Cutter</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge>
                  <span className="badge-icon">
                    <FiTerminal />
                  </span>
                  <span>x64dbg</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge>
                  <span className="badge-icon">
                    <FiTerminal />
                  </span>
                  <span>GDB + GEF</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge>
                  <span className="badge-icon">
                    <SiPython />
                  </span>
                  <span>Frida (DBI)</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge>
                  <span className="badge-icon">
                    <SiWireshark />
                  </span>
                  <span>Wireshark</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge>
                  <span className="badge-icon">
                    <SiLinux />
                  </span>
                  <span>PE-bear / DIE / CAPA</span>
                </Styled.ArsenalBadge>
              </Styled.ArsenalBadgeList>
            </Styled.ArsenalRow>

            <Styled.ArsenalRow>
              <Styled.ArsenalRowMeta>
                <span className="rack-addr">REG // 0x03B</span>
                <span className="rack-title">
                  <FaMicrochip /> Core Languages &amp; Firmware
                </span>
                <span className="rack-desc">
                  Systems programming, async automation engines, and embedded
                  ESP32-S3 development.
                </span>
              </Styled.ArsenalRowMeta>
              <Styled.ArsenalBadgeList>
                <Styled.ArsenalBadge>
                  <span className="badge-icon">
                    <SiPython />
                  </span>
                  <span>Python (AsyncIO / aiohttp)</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge>
                  <span className="badge-icon">
                    <SiCplusplus />
                  </span>
                  <span>C / C++ (ESP32-S3)</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge>
                  <span className="badge-icon">
                    <SiTypescript />
                  </span>
                  <span>TypeScript</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge>
                  <span className="badge-icon">
                    <SiPhp />
                  </span>
                  <span>PHP 8.3</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge>
                  <span className="badge-icon">
                    <SiDotnet />
                  </span>
                  <span>.NET 8</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge>
                  <span className="badge-icon">
                    <SiGnubash />
                  </span>
                  <span>Bash &amp; POSIX Shell</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge>
                  <span className="badge-icon">
                    <SiPostgresql />
                  </span>
                  <span>SQL</span>
                </Styled.ArsenalBadge>
              </Styled.ArsenalBadgeList>
            </Styled.ArsenalRow>

            <Styled.ArsenalRow>
              <Styled.ArsenalRowMeta>
                <span className="rack-addr">REG // 0x03C</span>
                <span className="rack-title">
                  <SiReact /> Web, Real-Time &amp; Telehealth
                </span>
                <span className="rack-desc">
                  Full-stack portals, encrypted video consultations, and
                  WebSocket event broadcasting.
                </span>
              </Styled.ArsenalRowMeta>
              <Styled.ArsenalBadgeList>
                <Styled.ArsenalBadge>
                  <span className="badge-icon">
                    <SiNextdotjs />
                  </span>
                  <span>Next.js</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge>
                  <span className="badge-icon">
                    <SiReact />
                  </span>
                  <span>React 18</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge>
                  <span className="badge-icon">
                    <SiLaravel />
                  </span>
                  <span>Laravel 13 &amp; Inertia</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge>
                  <span className="badge-icon">
                    <SiTailwindcss />
                  </span>
                  <span>Tailwind CSS</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge>
                  <span className="badge-icon">
                    <SiWebrtc />
                  </span>
                  <span>LiveKit WebRTC</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge>
                  <span className="badge-icon">
                    <SiRedis />
                  </span>
                  <span>Redis &amp; Reverb</span>
                </Styled.ArsenalBadge>
              </Styled.ArsenalBadgeList>
            </Styled.ArsenalRow>

            <Styled.ArsenalRow>
              <Styled.ArsenalRowMeta>
                <span className="rack-addr">REG // 0x03D</span>
                <span className="rack-title">
                  <FaShieldAlt /> Defensive SOC, Telemetry &amp; Cloud
                </span>
                <span className="rack-desc">
                  Honeypot ingestion, automated firewall containment, CI/CD
                  security, and Linux ops.
                </span>
              </Styled.ArsenalRowMeta>
              <Styled.ArsenalBadgeList>
                <Styled.ArsenalBadge>
                  <span className="badge-icon">
                    <SiKalilinux />
                  </span>
                  <span>Kali GNU/Linux</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge>
                  <span className="badge-icon">
                    <FaShieldAlt />
                  </span>
                  <span>HASSH &amp; MITRE ATT&amp;CK</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge>
                  <span className="badge-icon">
                    <SiPostgresql />
                  </span>
                  <span>ClickHouse &amp; PostgreSQL</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge>
                  <span className="badge-icon">
                    <SiDocker />
                  </span>
                  <span>Docker</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge>
                  <span className="badge-icon">
                    <SiDigitalocean />
                  </span>
                  <span>DigitalOcean</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge>
                  <span className="badge-icon">
                    <SiGithubactions />
                  </span>
                  <span>CodeQL / Semgrep / Gitleaks</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge>
                  <span className="badge-icon">
                    <SiTelegram />
                  </span>
                  <span>Telegram Bot Automation</span>
                </Styled.ArsenalBadge>
              </Styled.ArsenalBadgeList>
            </Styled.ArsenalRow>
          </Styled.ArsenalRack>
        </Styled.ArsenalSection>

        {/* Section 4: Direct Comms Terminal Footer */}
        <Styled.CommsTerminal id="simple-contact">
          <Styled.WindowChromeBar>
            <span>[0x04] // COM1_TRANSMISSION_PORT</span>
            <span className="win-code">STATUS: LISTENING</span>
          </Styled.WindowChromeBar>
          <Styled.CommsBody>
            <Styled.CommsInfo>
              <h3>Ready for Feb 2027 Cybersecurity Internship &amp; CTF</h3>
              <p>
                Available for a 14-week industrial placement starting February
                2027 across Selangor and Kuala Lumpur (SOC Monitoring, Incident
                Response, Threat Intelligence, or Penetration Testing).
              </p>
            </Styled.CommsInfo>
            <Styled.ProjectButtonGroup style={{ width: 'auto' }}>
              <Styled.ProjectOpenLink href="mailto:r.zradzizamri@gmail.com">
                <FaEnvelope /> r.zradzizamri@gmail.com
              </Styled.ProjectOpenLink>
              <Styled.ProjectDemoLink
                href="https://linkedin.com/in/radzizamri"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin /> Connect on LinkedIn
              </Styled.ProjectDemoLink>
            </Styled.ProjectButtonGroup>
          </Styled.CommsBody>
          <Styled.HotkeyBar>
            <span>
              <kbd>J</kbd>/<kbd>K</kbd> Scroll Viewport
            </span>
            <span>
              <kbd>&larr;</kbd>/<kbd>&rarr;</kbd> Select Module
            </span>
            <span>
              <kbd>Enter</kbd> Open Focused Repo
            </span>
            <span>
              <kbd>Ctrl+K</kbd> Command Palette
            </span>
          </Styled.HotkeyBar>
        </Styled.CommsTerminal>
      </Styled.Main>

      {isPaletteOpen && (
        <Styled.PaletteOverlay onClick={() => setIsPaletteOpen(false)}>
          <Styled.PalettePanel
            role="dialog"
            aria-modal="true"
            aria-label="Command Palette"
            onClick={(e) => e.stopPropagation()}
          >
            <Styled.PaletteTitle>
              SYS://COMMAND_PALETTE (USE UP/DOWN &amp; ENTER)
            </Styled.PaletteTitle>
            {paletteActions.map((action, index) => (
              <Styled.PaletteItem
                key={action.label}
                isActive={index === paletteIndex}
                onClick={() => {
                  action.run();
                  setIsPaletteOpen(false);
                }}
              >
                {action.label}
              </Styled.PaletteItem>
            ))}
          </Styled.PalettePanel>
        </Styled.PaletteOverlay>
      )}
    </Styled.Wrapper>
  );
};

export default PortfolioMode;

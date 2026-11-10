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
/*  Data (with Authentic Brand Icon Colors)                            */
/* ------------------------------------------------------------------ */

type TechItem = {
  name: string;
  icon: React.ReactNode;
  color?: string;
};

type FeaturedProject = {
  id: string;
  name: string;
  icon: React.ReactNode;
  iconColor: string;
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
    id: '01',
    name: 'CloudSentinel (FYP)',
    icon: <FaShieldAlt />,
    iconColor: '#EF4444',
    repoType: 'SSH Honeypot & Threat Detection',
    stack: [
      { name: 'Python', icon: <SiPython />, color: '#3776AB' },
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'Redis', icon: <SiRedis />, color: '#DC382D' },
      { name: 'DigitalOcean', icon: <SiDigitalocean />, color: '#0080FF' },
      { name: 'Linux', icon: <SiLinux />, color: '#EAB308' },
    ],
    summary:
      'High-interaction SSH honeypot and threat detection system deployed on DigitalOcean to capture brute-force sessions, attacker command streams, and automated scanner traffic in real time.',
    highlights: [
      'HASSH client fingerprinting paired with 20 MITRE ATT&CK classification rules',
      'Automated firewall IP blocking with <1ms median benchmark response time',
      'Next.js analytics dashboard backed by ClickHouse storage and Redis pub/sub',
    ],
    tags: ['Security', 'Web', 'Research'],
    link: 'https://github.com/zis3c/CloudSentinel',
  },
  {
    id: '02',
    name: 'RedLilyGO',
    icon: <FaMicrochip />,
    iconColor: '#F97316',
    repoType: 'ESP32-S3 Security Firmware',
    stack: [
      { name: 'C++', icon: <SiCplusplus />, color: '#00599C' },
      { name: '.NET 8', icon: <SiDotnet />, color: '#512BD4' },
      { name: 'Wireshark', icon: <SiWireshark />, color: '#1679A7' },
      { name: 'GitHub Actions', icon: <SiGithubactions />, color: '#2088FF' },
    ],
    summary:
      'Custom C++ security assessment firmware for the LILYGO T-Dongle-S3 USB hardware dongle, built for authorized USB HID testing and wireless packet capture.',
    highlights: [
      'Authorized USB HID keystroke automation and payload sequencing',
      'Onboard Wi-Fi PCAP packet capture managed via web UI and .NET 8 desktop app',
      'Automated CI security checks with CodeQL, Semgrep, and Gitleaks',
    ],
    tags: ['Security', 'Research', 'Automation'],
    link: 'https://github.com/zis3c/RedLilyGO',
  },
  {
    id: '03',
    name: 'JanjiCare',
    icon: <FaHospital />,
    iconColor: '#06B6D4',
    repoType: 'Clinic Web Appointment & Telehealth',
    stack: [
      { name: 'Laravel 13', icon: <SiLaravel />, color: '#FF2D20' },
      { name: 'PHP 8.3', icon: <SiPhp />, color: '#777BB4' },
      { name: 'React 18', icon: <SiReact />, color: '#00D8FF' },
      { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#38BDF8' },
      { name: 'WebRTC', icon: <SiWebrtc />, color: '#F59E0B' },
    ],
    summary:
      'Full-stack clinical appointment booking and telehealth video consultation platform with live queue updates.',
    highlights: [
      'Role-based portals separating Patient, Doctor, and Administrator workflows',
      'LiveKit WebRTC encrypted video calls secured by server-signed JWT tokens',
      'Real-time patient queue updates powered by Laravel Reverb WebSockets',
    ],
    tags: ['Web'],
    link: 'https://github.com/zis3c/Clinic-Web-Appointment',
  },
  {
    id: '04',
    name: 'Google Forms Spammer',
    icon: <FaBolt />,
    iconColor: '#EAB308',
    repoType: 'Async Stress Testing Tool',
    stack: [
      { name: 'Python', icon: <SiPython />, color: '#3776AB' },
      { name: 'aiohttp', icon: <SiPython />, color: '#FFD43B' },
      { name: 'Google Forms', icon: <SiGoogle />, color: '#4285F4' },
      { name: 'Rich CLI', icon: <SiGnubash />, color: '#4EAA25' },
    ],
    summary:
      'High-speed asynchronous stress-testing tool for Google Forms with multi-worker concurrency and automatic field detection.',
    highlights: [
      'Non-blocking aiohttp worker pool supporting high concurrent request bursts',
      'Smart HTTP 429 rate-limit backoff, user-agent rotation, and auto question parser',
      'Includes local web configurator UI and Rich terminal dashboard',
    ],
    tags: ['Automation', 'Security', 'Research'],
    link: 'https://github.com/zis3c/google-form-spammer',
  },
  {
    id: '05',
    name: 'Dot Zero CTF Pipeline & RE',
    icon: <FaFlag />,
    iconColor: '#8B5CF6',
    repoType: 'CTF Automation & Reverse Engineering',
    stack: [
      { name: 'Kali Linux', icon: <SiKalilinux />, color: '#367BF0' },
      { name: 'Python', icon: <SiPython />, color: '#3776AB' },
      { name: 'Bash', icon: <SiGnubash />, color: '#4EAA25' },
      { name: 'Reverse Eng', icon: <SiLinux />, color: '#EAB308' },
    ],
    summary:
      'CTFd competition automation CLI and hands-on Reverse Engineering training materials created for USAS CTF team Dot Zero (U545).',
    highlights: [
      'Automated CTFd challenge downloader, workspace setup, and write-up generator',
      'RE workshops: Ghidra and IDA Pro decompilation, x64dbg patching, and Frida hooks',
      'Binary crackme labs covering ELF/PE internals, GDB+GEF debugging, and anti-debug bypass',
    ],
    tags: ['Security', 'Automation'],
    link: 'https://ctftime.org/team/421634',
    demoLink: 'https://ctftime.org/team/421634',
    demoLabel: 'CTFtime Profile',
  },
  {
    id: '06',
    name: 'STEM Platform & Telebot',
    icon: <FaRobot />,
    iconColor: '#22C55E',
    repoType: 'Student Web Portal & Telegram Bot',
    stack: [
      { name: 'React', icon: <SiReact />, color: '#00D8FF' },
      { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
      { name: 'Python', icon: <SiPython />, color: '#3776AB' },
      { name: 'Telegram', icon: <SiTelegram />, color: '#26A5E4' },
      { name: 'Google Sheets', icon: <SiGoogle />, color: '#34A853' },
    ],
    summary:
      'Official student association portal and automated Telegram membership verification bot for STEM USAS.',
    highlights: [
      'Official STEM-USAS web portal live at stem.zis3c.dev',
      'Verified 62+ registered student members with automated digital receipts',
      'Real-time Google Sheets sync with admin and superadmin bot commands',
    ],
    tags: ['Web', 'Automation', 'Bot'],
    link: 'https://github.com/zis3c/STEM-Telebot',
    demoLink: 'https://stem.zis3c.dev',
    demoLabel: 'stem.zis3c.dev',
  },
  {
    id: '07',
    name: 'USAS Assignment Notifier & Timetable',
    icon: <FaBell />,
    iconColor: '#EC4899',
    repoType: 'LMS Deadline Tracker & Timetable Exporter',
    stack: [
      { name: 'Python', icon: <SiPython />, color: '#3776AB' },
      { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#4169E1' },
      { name: 'Telegram', icon: <SiTelegram />, color: '#26A5E4' },
      { name: 'React', icon: <SiReact />, color: '#00D8FF' },
    ],
    summary:
      'Automated campus LMS deadline tracker serving 50 students across 245 assignments, paired with a class timetable generator.',
    highlights: [
      'Automated LMS scraper sending proactive Telegram deadline reminders',
      'Class timetable builder at jadualkelas.zis3c.dev exporting PDFs and wallpapers',
      'PostgreSQL database with encrypted student credential management',
    ],
    tags: ['Automation', 'Bot', 'Web'],
    link: 'https://github.com/zis3c/USAS-Assignment-Notifier',
    demoLink: 'https://jadualkelas.zis3c.dev',
    demoLabel: 'jadualkelas.zis3c.dev',
  },
  {
    id: '08',
    name: 'Polyglot Files',
    icon: <FaFileCode />,
    iconColor: '#A855F7',
    repoType: 'File Format Security Research',
    stack: [
      { name: 'Python', icon: <SiPython />, color: '#3776AB' },
      { name: 'Linux', icon: <SiLinux />, color: '#EAB308' },
      { name: 'Binary Analysis', icon: <SiGnubash />, color: '#4EAA25' },
    ],
    summary:
      'Dual-format file generator combining valid JPEG/PNG and PDF structures to test file signature parsers and upload filters.',
    highlights: [
      'Generates valid hybrid JPEG+PDF and PNG+PDF polyglot files',
      'Demonstrates parser behavior across image viewers and PDF readers',
      'Built for file upload validation research and defensive filter testing',
    ],
    tags: ['Security', 'Research'],
    link: 'https://github.com/zis3c/Polyglot-File',
  },
  {
    id: '09',
    name: 'QRBot & Qrtendify',
    icon: <FaQrcode />,
    iconColor: '#3B82F6',
    repoType: 'QR Code & Attendance Automation',
    stack: [
      { name: 'Python', icon: <SiPython />, color: '#3776AB' },
      { name: 'Docker', icon: <SiDocker />, color: '#2496ED' },
      { name: 'Telegram', icon: <SiTelegram />, color: '#26A5E4' },
    ],
    summary:
      'Versatile QR code generator, scanner, and encrypted attendance check-in bot on Telegram.',
    highlights: [
      'Generates and decodes Text, Wi-Fi, vCard, and location QR codes',
      'Encrypted QR payload verification for student event attendance',
      'Dockerized setup for reliable cloud deployment',
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
    const actions = [
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
          setPaletteIndex((prev) => (prev + 1) % actions.length);
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setPaletteIndex(
            (prev) => (prev - 1 + actions.length) % actions.length
          );
        }
        if (e.key === 'Enter') {
          e.preventDefault();
          actions[paletteIndex].run();
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
      const targetTag = (e.target as HTMLElement | null)?.tagName;
      if (
        e.key === 'Enter' &&
        targetTag !== 'BUTTON' &&
        targetTag !== 'A' &&
        filteredProjects[focusedProjectIndex]
      ) {
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
      {/* Top Navigation Bar */}
      <Styled.Nav>
        <Styled.BrandGroup>
          <Styled.StatusLed title="Available for Feb 2027 Internship" />
          <Styled.Brand>
            <span>Radzi Zamri (zis3c)</span>
            <span className="role-tag">Cybersecurity &amp; CS Portfolio</span>
          </Styled.Brand>
        </Styled.BrandGroup>

        <Styled.NavActions>
          <Styled.PaletteTrigger
            type="button"
            onClick={() => setIsPaletteOpen(true)}
            aria-label="Open command palette"
            title="Quick Jump (Ctrl+K)"
          >
            <FiCommand />
            <span>Quick Jump</span>
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
            title={simpleTheme === 'terminal' ? 'Light Mode' : 'Dark Mode'}
          >
            {simpleTheme === 'terminal' ? <FiSun /> : <FiMoon />}
            <span className="btn-label">
              {simpleTheme === 'terminal' ? 'Light Mode' : 'Dark Mode'}
            </span>
          </Styled.ThemeToggle>

          <Styled.BackButton
            type="button"
            onClick={onBackToChooser}
            aria-label="Open system boot menu"
            title="Switch to Kali Desktop or Boot Menu"
          >
            <FiPower />
            <span className="btn-label">Boot Menu</span>
          </Styled.BackButton>
        </Styled.NavActions>
      </Styled.Nav>

      <Styled.Main>
        {/* Section 1: About & Academic Highlights */}
        <Styled.HeroWorkbench id="simple-about">
          <Styled.HeroSection>
            <Styled.WindowChromeBar>
              <span>About Radzi Zamri</span>
              <span className="window-dots">
                <span className="win-dot" />
                <span className="win-dot" />
                <span className="win-dot" />
              </span>
            </Styled.WindowChromeBar>

            <Styled.HeroBody>
              <Styled.HeroTitle>
                <GlitchText
                  words={[
                    'Cybersecurity Portfolio',
                    'Threat Detection & SOC',
                    'Reverse Engineering',
                    'Dot Zero CTF Team',
                  ]}
                />
              </Styled.HeroTitle>

              <Styled.HeroRoleSub>
                Computer Science Undergraduate (CGPA 3.83) · Purple Team &amp;
                Reverse Engineering Trainer
              </Styled.HeroRoleSub>

              <Styled.HeroText>
                Computer Science student at Universiti Sultan Azlan Shah (USAS)
                with practical experience in SSH honeypot threat detection,
                binary reverse engineering (Ghidra, IDA Pro, x64dbg, GDB+GEF,
                Frida), hardware security firmware, and full-stack web
                development. Secretary and Reverse Engineering Trainer for USAS
                CTF team Dot Zero, currently seeking a 14-week Cybersecurity
                Internship starting February 2027.
              </Styled.HeroText>

              <Styled.SocialGrid>
                <Styled.SocialButton
                  href="mailto:r.zradzizamri@gmail.com"
                  iconColor="#EA4335"
                >
                  <FaEnvelope /> Email
                </Styled.SocialButton>
                <Styled.SocialButton
                  href="https://github.com/zis3c"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub /> GitHub
                </Styled.SocialButton>
                <Styled.SocialButton
                  href="https://linkedin.com/in/radzizamri"
                  target="_blank"
                  rel="noopener noreferrer"
                  iconColor="#0A66C2"
                >
                  <FaLinkedin /> LinkedIn
                </Styled.SocialButton>
                <Styled.SocialButton
                  href="https://ctftime.org/team/421634"
                  target="_blank"
                  rel="noopener noreferrer"
                  iconColor="#EF4444"
                >
                  <FaFlag /> Dot Zero CTF
                </Styled.SocialButton>
                <Styled.SocialButton
                  href="https://www.youtube.com/@zis3c"
                  target="_blank"
                  rel="noopener noreferrer"
                  iconColor="#FF0000"
                >
                  <FaYoutube /> YouTube
                </Styled.SocialButton>
                <Styled.SocialButton
                  href="https://www.instagram.com/radz.z_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  iconColor="#E4405F"
                >
                  <FaInstagram /> Instagram
                </Styled.SocialButton>
              </Styled.SocialGrid>
            </Styled.HeroBody>
          </Styled.HeroSection>

          <Styled.TelemetryPanel aria-label="Profile and Academic Summary">
            <Styled.WindowChromeBar>
              <span>Profile &amp; Academic Summary</span>
              <span>Verified</span>
            </Styled.WindowChromeBar>
            <Styled.TelemetryBody>
              <Styled.RegisterTable>
                <Styled.RegisterRow>
                  <dt>Full Name</dt>
                  <dd>Radzi bin Zamri (zis3c)</dd>
                </Styled.RegisterRow>
                <Styled.RegisterRow>
                  <dt>University</dt>
                  <dd>Universiti Sultan Azlan Shah (USAS)</dd>
                </Styled.RegisterRow>
                <Styled.RegisterRow>
                  <dt>Bachelor&apos;s</dt>
                  <dd>Computer Science · CGPA 3.83 (Dean&apos;s List)</dd>
                </Styled.RegisterRow>
                <Styled.RegisterRow>
                  <dt>Diploma</dt>
                  <dd>Information Technology · CGPA 3.77</dd>
                </Styled.RegisterRow>
                <Styled.RegisterRow>
                  <dt>CTF Team</dt>
                  <dd>Dot Zero (U545) Secretary &amp; RE Trainer</dd>
                </Styled.RegisterRow>
                <Styled.RegisterRow>
                  <dt>CTF Results</dt>
                  <dd>21st RE:UN10N · 88th ApoorvCTF · 133rd 0xFun</dd>
                </Styled.RegisterRow>
                <Styled.RegisterRow>
                  <dt>Certificates</dt>
                  <dd>Google Cybersecurity · RE Bootcamp (Ghidra/IDA)</dd>
                </Styled.RegisterRow>
                <Styled.RegisterRow>
                  <dt>Internship</dt>
                  <dd>14 Weeks starting Feb 2027 (Selangor / KL)</dd>
                </Styled.RegisterRow>
              </Styled.RegisterTable>
            </Styled.TelemetryBody>
          </Styled.TelemetryPanel>
        </Styled.HeroWorkbench>

        {/* Section 2: Featured Projects */}
        <Styled.DirectoryFrame id="simple-projects">
          <Styled.DirectoryHeaderBar>
            <Styled.SectionHeader>
              <Styled.SectionTitle>Featured Projects</Styled.SectionTitle>
              <Styled.SectionSubtitle>
                Open-source security tools, custom hardware firmware, full-stack
                web platforms, and automation bots.
              </Styled.SectionSubtitle>
            </Styled.SectionHeader>
            <Styled.DirectoryCountBadge>
              Showing {filteredProjects.length} of {featuredProjects.length}{' '}
              projects
            </Styled.DirectoryCountBadge>
          </Styled.DirectoryHeaderBar>

          <Styled.FilterRow role="tablist" aria-label="Filter projects">
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
                <p>No projects match the selected category.</p>
                <button type="button" onClick={() => setProjectFilter('All')}>
                  Show All Projects
                </button>
              </Styled.EmptyStateBox>
            ) : (
              filteredProjects.map((project, index) => {
                const isFlagship =
                  projectFilter === 'All' && project.id === '01';
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
                      <span>{project.repoType}</span>
                      <span className="slot-status">
                        {isFlagship ? 'Featured FYP' : 'Open Source'}
                      </span>
                    </Styled.ProjectCardChrome>

                    <Styled.ProjectCardBody isFlagship={isFlagship}>
                      <Styled.ProjectHeader>
                        <Styled.ProjectTopBar>
                          <Styled.ProjectIdentity>
                            <Styled.ProjectAvatar iconColor={project.iconColor}>
                              {project.icon}
                            </Styled.ProjectAvatar>
                            <Styled.ProjectMetaInfo>
                              <Styled.ProjectName>
                                {project.name}
                              </Styled.ProjectName>
                              <Styled.ProjectMetaRow>
                                <span className="repo-tag">
                                  <FaFolder /> {project.tags.join(' · ')}
                                </span>
                              </Styled.ProjectMetaRow>
                            </Styled.ProjectMetaInfo>
                          </Styled.ProjectIdentity>

                          <Styled.ProjectQuickGithub
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`GitHub repo for ${project.name}`}
                            title="View on GitHub"
                          >
                            <FaGithub />
                          </Styled.ProjectQuickGithub>
                        </Styled.ProjectTopBar>

                        <Styled.ProjectStackWrapper>
                          {project.stack.map((tech) => (
                            <Styled.TechBadge
                              key={tech.name}
                              iconColor={tech.color}
                            >
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
                          <FaGithub /> View Repository
                        </Styled.ProjectOpenLink>
                        {project.demoLink && (
                          <Styled.ProjectDemoLink
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FiExternalLink />{' '}
                            {project.demoLabel || 'Live Website'}
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

        {/* Section 3: Technical Skills & Tooling */}
        <Styled.ArsenalSection>
          <Styled.SectionHeader>
            <Styled.SectionTitle>
              <FiCpu />
              <span>Technical Skills &amp; Tooling</span>
            </Styled.SectionTitle>
            <Styled.SectionSubtitle>
              Tools, programming languages, and frameworks used across my
              security research and software projects.
            </Styled.SectionSubtitle>
          </Styled.SectionHeader>

          <Styled.ArsenalRack>
            <Styled.ArsenalRow>
              <Styled.ArsenalRowMeta>
                <span className="rack-title">
                  <FiTerminal /> Reverse Engineering &amp; Security
                </span>
                <span className="rack-desc">
                  Static decompilation, dynamic debugging, runtime hooking, and
                  binary analysis.
                </span>
              </Styled.ArsenalRowMeta>
              <Styled.ArsenalBadgeList>
                <Styled.ArsenalBadge iconColor="#EF4444">
                  <span className="badge-icon">
                    <SiKalilinux />
                  </span>
                  <span>Ghidra</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge iconColor="#F59E0B">
                  <span className="badge-icon">
                    <SiLinux />
                  </span>
                  <span>IDA Pro</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge iconColor="#10B981">
                  <span className="badge-icon">
                    <SiLinux />
                  </span>
                  <span>Binary Ninja</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge iconColor="#8B5CF6">
                  <span className="badge-icon">
                    <FiTerminal />
                  </span>
                  <span>Radare2 / Cutter</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge iconColor="#EF4444">
                  <span className="badge-icon">
                    <FiTerminal />
                  </span>
                  <span>x64dbg</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge iconColor="#38BDF8">
                  <span className="badge-icon">
                    <FiTerminal />
                  </span>
                  <span>GDB + GEF</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge iconColor="#F97316">
                  <span className="badge-icon">
                    <SiPython />
                  </span>
                  <span>Frida (DBI)</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge iconColor="#1679A7">
                  <span className="badge-icon">
                    <SiWireshark />
                  </span>
                  <span>Wireshark</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge iconColor="#EAB308">
                  <span className="badge-icon">
                    <SiLinux />
                  </span>
                  <span>PE-bear / DIE / CAPA</span>
                </Styled.ArsenalBadge>
              </Styled.ArsenalBadgeList>
            </Styled.ArsenalRow>

            <Styled.ArsenalRow>
              <Styled.ArsenalRowMeta>
                <span className="rack-title">
                  <FaMicrochip /> Programming Languages
                </span>
                <span className="rack-desc">
                  Backend automation, embedded firmware, and full-stack
                  development.
                </span>
              </Styled.ArsenalRowMeta>
              <Styled.ArsenalBadgeList>
                <Styled.ArsenalBadge iconColor="#3776AB">
                  <span className="badge-icon">
                    <SiPython />
                  </span>
                  <span>Python (AsyncIO / aiohttp)</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge iconColor="#00599C">
                  <span className="badge-icon">
                    <SiCplusplus />
                  </span>
                  <span>C / C++ (ESP32-S3)</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge iconColor="#3178C6">
                  <span className="badge-icon">
                    <SiTypescript />
                  </span>
                  <span>TypeScript</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge iconColor="#777BB4">
                  <span className="badge-icon">
                    <SiPhp />
                  </span>
                  <span>PHP 8.3</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge iconColor="#512BD4">
                  <span className="badge-icon">
                    <SiDotnet />
                  </span>
                  <span>.NET 8</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge iconColor="#4EAA25">
                  <span className="badge-icon">
                    <SiGnubash />
                  </span>
                  <span>Bash &amp; Shell</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge iconColor="#4169E1">
                  <span className="badge-icon">
                    <SiPostgresql />
                  </span>
                  <span>SQL</span>
                </Styled.ArsenalBadge>
              </Styled.ArsenalBadgeList>
            </Styled.ArsenalRow>

            <Styled.ArsenalRow>
              <Styled.ArsenalRowMeta>
                <span className="rack-title">
                  <SiReact /> Web &amp; Application Frameworks
                </span>
                <span className="rack-desc">
                  Modern web applications, real-time queues, and telehealth
                  video systems.
                </span>
              </Styled.ArsenalRowMeta>
              <Styled.ArsenalBadgeList>
                <Styled.ArsenalBadge>
                  <span className="badge-icon">
                    <SiNextdotjs />
                  </span>
                  <span>Next.js</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge iconColor="#00D8FF">
                  <span className="badge-icon">
                    <SiReact />
                  </span>
                  <span>React 18</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge iconColor="#FF2D20">
                  <span className="badge-icon">
                    <SiLaravel />
                  </span>
                  <span>Laravel 13 &amp; Inertia</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge iconColor="#38BDF8">
                  <span className="badge-icon">
                    <SiTailwindcss />
                  </span>
                  <span>Tailwind CSS</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge iconColor="#F59E0B">
                  <span className="badge-icon">
                    <SiWebrtc />
                  </span>
                  <span>LiveKit WebRTC</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge iconColor="#DC382D">
                  <span className="badge-icon">
                    <SiRedis />
                  </span>
                  <span>Redis &amp; Reverb</span>
                </Styled.ArsenalBadge>
              </Styled.ArsenalBadgeList>
            </Styled.ArsenalRow>

            <Styled.ArsenalRow>
              <Styled.ArsenalRowMeta>
                <span className="rack-title">
                  <FaShieldAlt /> Cloud, Databases &amp; Defense
                </span>
                <span className="rack-desc">
                  Honeypot deployment, log analytics, containers, and CI/CD
                  security pipelines.
                </span>
              </Styled.ArsenalRowMeta>
              <Styled.ArsenalBadgeList>
                <Styled.ArsenalBadge iconColor="#367BF0">
                  <span className="badge-icon">
                    <SiKalilinux />
                  </span>
                  <span>Kali GNU/Linux</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge iconColor="#EF4444">
                  <span className="badge-icon">
                    <FaShieldAlt />
                  </span>
                  <span>HASSH &amp; MITRE ATT&amp;CK</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge iconColor="#4169E1">
                  <span className="badge-icon">
                    <SiPostgresql />
                  </span>
                  <span>ClickHouse &amp; PostgreSQL</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge iconColor="#2496ED">
                  <span className="badge-icon">
                    <SiDocker />
                  </span>
                  <span>Docker</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge iconColor="#0080FF">
                  <span className="badge-icon">
                    <SiDigitalocean />
                  </span>
                  <span>DigitalOcean</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge iconColor="#2088FF">
                  <span className="badge-icon">
                    <SiGithubactions />
                  </span>
                  <span>CodeQL / Semgrep / Gitleaks</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge iconColor="#26A5E4">
                  <span className="badge-icon">
                    <SiTelegram />
                  </span>
                  <span>Telegram Bot API</span>
                </Styled.ArsenalBadge>
              </Styled.ArsenalBadgeList>
            </Styled.ArsenalRow>
          </Styled.ArsenalRack>
        </Styled.ArsenalSection>

        {/* Section 4: Contact & Internship Availability */}
        <Styled.CommsTerminal id="simple-contact">
          <Styled.WindowChromeBar>
            <span>Contact &amp; Internship Availability</span>
            <span>Open for Feb 2027</span>
          </Styled.WindowChromeBar>
          <Styled.CommsBody>
            <Styled.CommsInfo>
              <h3>Looking for a Feb 2027 Cybersecurity Internship</h3>
              <p>
                Available for a 14-week internship starting February 2027 in
                Selangor or Kuala Lumpur (SOC Monitoring, Incident Response,
                Threat Intelligence, or Penetration Testing).
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
                <FaLinkedin /> LinkedIn Profile
              </Styled.ProjectDemoLink>
            </Styled.ProjectButtonGroup>
          </Styled.CommsBody>
          <Styled.HotkeyBar>
            <span>
              <kbd>J</kbd>/<kbd>K</kbd> Scroll Page
            </span>
            <span>
              <kbd>&larr;</kbd>/<kbd>&rarr;</kbd> Select Project
            </span>
            <span>
              <kbd>Enter</kbd> Open Selected Project
            </span>
            <span>
              <kbd>Ctrl+K</kbd> Quick Jump Menu
            </span>
          </Styled.HotkeyBar>
        </Styled.CommsTerminal>
      </Styled.Main>

      {isPaletteOpen && (
        <Styled.PaletteOverlay onClick={() => setIsPaletteOpen(false)}>
          <Styled.PalettePanel
            role="dialog"
            aria-modal="true"
            aria-label="Quick Jump Menu"
            onClick={(e) => e.stopPropagation()}
          >
            <Styled.PaletteTitle>
              Quick Jump (Use Up/Down &amp; Enter)
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

import React, { useState, useEffect } from 'react';
import {
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
  FaStar,
  FaCodeBranch,
  FaLock,
  FaDesktop,
  FaCalendarAlt,
  FaGamepad,
  FaCheckCircle,
  FaServer,
  FaWifi,
  FaChartBar,
  FaCogs,
  FaBookOpen,
  FaBrain,
  FaMobileAlt,
} from 'react-icons/fa';
import {
  SiPython,
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiLaravel,
  SiPhp,
  SiTailwindcss,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiDigitalocean,
  SiTelegram,
  SiC,
  SiCplusplus,
  SiDotnet,
  SiWebrtc,
  SiWireshark,
  SiKalilinux,
  SiGnubash,
  SiGoogle,
  SiGithubactions,
  SiLinux,
  SiRedux,
  SiArduino,
  SiOpenai,
  SiVisualstudiocode,
  SiPandas,
  SiAndroid,
  SiNodered,
  SiEclipsemosquitto,
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
/*  Data (Minimalist, Easy-to-Read & Authentic Brand Icon Colors)      */
/* ------------------------------------------------------------------ */

type TechItem = {
  name: string;
  icon: React.ReactNode;
  color?: string;
};

type FeaturedProject = {
  id: string;
  name: string;
  year: string;
  icon: React.ReactNode;
  iconColor: string;
  repoType: string;
  isPrivate?: boolean;
  stack: TechItem[];
  summary: string;
  tags: string[];
  link: string;
  demoLink?: string;
  demoLabel?: string;
};

type GithubRepoStat = {
  stars: number;
  forks: number;
};

const featuredProjects: FeaturedProject[] = [
  {
    id: '01',
    name: 'CloudSentinel (FYP)',
    year: '2026',
    icon: <FaShieldAlt />,
    iconColor: '#EF4444',
    repoType: 'Cloud Security & Threat Detection',
    isPrivate: true,
    stack: [
      { name: 'Python', icon: <SiPython />, color: '#3776AB' },
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'Redis', icon: <SiRedis />, color: '#DC382D' },
      { name: 'DigitalOcean', icon: <SiDigitalocean />, color: '#0080FF' },
      { name: 'Linux', icon: <SiLinux />, color: '#EAB308' },
    ],
    summary:
      'A cloud-based SSH honeypot that detects automated login attacks in real time, blocks malicious IPs within a second, and visualizes attack patterns on a live web dashboard.',
    tags: ['Security', 'Web', 'Research'],
    link: 'https://github.com/zis3c/CloudSentinel',
  },
  {
    id: '02',
    name: 'RedLilyGO',
    year: '2026',
    icon: <FaMicrochip />,
    iconColor: '#F97316',
    repoType: 'ESP32-S3 Hardware Firmware',
    stack: [
      { name: 'C++', icon: <SiCplusplus />, color: '#00599C' },
      { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E' },
      { name: '.NET 8', icon: <SiDotnet />, color: '#512BD4' },
      { name: 'Wireshark', icon: <SiWireshark />, color: '#1679A7' },
    ],
    summary:
      'Custom security firmware for the LilyGO T-Dongle-S3 USB device, combining automated keystroke scripts, wireless network auditing, packet logging, and a desktop control app.',
    tags: ['Security', 'Research', 'Automation'],
    link: 'https://github.com/zis3c/RedLilyGO',
  },
  {
    id: '03',
    name: 'Clinic-Web-Appointment (JanjiCare)',
    year: '2026',
    icon: <FaHospital />,
    iconColor: '#06B6D4',
    repoType: 'Clinic & Telehealth Web App',
    stack: [
      { name: 'Laravel', icon: <SiLaravel />, color: '#FF2D20' },
      { name: 'React', icon: <SiReact />, color: '#00D8FF' },
      { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
      { name: 'WebRTC', icon: <SiWebrtc />, color: '#F59E0B' },
      { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#38BDF8' },
    ],
    summary:
      'A full-stack clinic management system connecting admins, doctors, and patients with online appointment booking, digital prescriptions, live queue updates, and video consultations.',
    tags: ['Web'],
    link: 'https://github.com/zis3c/Clinic-Web-Appointment',
  },
  {
    id: '04',
    name: 'Google-Form-Spammer',
    year: '2025',
    icon: <FaBolt />,
    iconColor: '#EAB308',
    repoType: 'Form Load-Testing CLI',
    stack: [
      { name: 'Python', icon: <SiPython />, color: '#3776AB' },
      { name: 'AsyncIO', icon: <SiPython />, color: '#FFD43B' },
      { name: 'Google Forms', icon: <SiGoogle />, color: '#4285F4' },
      { name: 'CLI', icon: <SiGnubash />, color: '#4EAA25' },
    ],
    summary:
      'A fast command-line tool built with asynchronous Python to test how Google Forms handle high-volume concurrent submissions.',
    tags: ['Automation', 'Security', 'Research'],
    link: 'https://github.com/zis3c/Google-Form-Spammer',
  },
  {
    id: '05',
    name: 'Codex-notifier-vscode',
    year: '2025',
    icon: <FaBell />,
    iconColor: '#007ACC',
    repoType: 'VS Code Extension',
    stack: [
      { name: 'VS Code API', icon: <SiVisualstudiocode />, color: '#007ACC' },
      { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E' },
    ],
    summary:
      'A lightweight VS Code extension that plays an audio alert and shows a banner notification whenever background AI coding tasks finish.',
    tags: ['Automation', 'Web'],
    link: 'https://github.com/zis3c/Codex-notifier-vscode',
  },
  {
    id: '06',
    name: 'CTF-Pipeline',
    year: '2026',
    icon: <FaFlag />,
    iconColor: '#8B5CF6',
    repoType: 'CTF Competition Automation',
    stack: [
      { name: 'Python', icon: <SiPython />, color: '#3776AB' },
      { name: 'Kali Linux', icon: <SiKalilinux />, color: '#367BF0' },
      { name: 'Bash', icon: <SiGnubash />, color: '#4EAA25' },
    ],
    summary:
      'An automation tool that downloads Capture The Flag (CTF) challenges, organizes workspace folders by category, and checks that local security tools are ready.',
    tags: ['Security', 'Automation'],
    link: 'https://github.com/zis3c/CTF-Pipeline',
    demoLink: 'https://ctftime.org/team/421634',
    demoLabel: 'Dot Zero CTFtime',
  },
  {
    id: '07',
    name: 'Kali-XFCE-Portfolio',
    year: '2026',
    icon: <FaDesktop />,
    iconColor: '#367BF0',
    repoType: 'Interactive Web Portfolio',
    stack: [
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
      { name: 'Redux', icon: <SiRedux />, color: '#764ABC' },
      { name: 'Kali Linux', icon: <SiKalilinux />, color: '#367BF0' },
    ],
    summary:
      'This dual-mode portfolio website featuring both a clean minimalist view and a full Kali Linux desktop simulation in the browser.',
    tags: ['Web', 'Security'],
    link: 'https://github.com/zis3c/Kali-XFCE-Portfolio',
    demoLink: 'https://me.zis3c.dev',
    demoLabel: 'me.zis3c.dev',
  },
  {
    id: '08',
    name: 'STEM-Telebot',
    year: '2026',
    icon: <FaRobot />,
    iconColor: '#26A5E4',
    repoType: 'Telegram Membership Bot',
    stack: [
      { name: 'Python', icon: <SiPython />, color: '#3776AB' },
      { name: 'Telegram Bot', icon: <SiTelegram />, color: '#26A5E4' },
      { name: 'Google Sheets', icon: <SiGoogle />, color: '#34A853' },
    ],
    summary:
      'A Telegram bot for the STEM student society that verifies student memberships, generates digital ID cards, and syncs records with Google Sheets.',
    tags: ['Bot', 'Automation'],
    link: 'https://github.com/zis3c/STEM-Telebot',
  },
  {
    id: '09',
    name: 'STEM-USAS',
    year: '2026',
    icon: <FaCheckCircle />,
    iconColor: '#22C55E',
    repoType: 'Student Association Portal',
    stack: [
      { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
      { name: 'React', icon: <SiReact />, color: '#00D8FF' },
      { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#38BDF8' },
    ],
    summary:
      'The official website for the STEM student association at USAS, showcasing student programs, projects, and club registration.',
    tags: ['Web'],
    link: 'https://github.com/zis3c/STEM-USAS',
    demoLink: 'https://stem.zis3c.dev',
    demoLabel: 'stem.zis3c.dev',
  },
  {
    id: '10',
    name: 'USAS-Assignment-Notifier',
    year: '2026',
    icon: <FaBell />,
    iconColor: '#EC4899',
    repoType: 'Coursework Deadline Bot',
    stack: [
      { name: 'Python', icon: <SiPython />, color: '#3776AB' },
      { name: 'Telegram', icon: <SiTelegram />, color: '#26A5E4' },
      { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#4169E1' },
    ],
    summary:
      'An automated tracker that checks university course portals for new assignments and sends deadline reminders straight to Telegram.',
    tags: ['Automation', 'Bot'],
    link: 'https://github.com/zis3c/USAS-Assignment-Notifier',
  },
  {
    id: '11',
    name: 'USAS-Class-Timetable',
    year: '2026',
    icon: <FaCalendarAlt />,
    iconColor: '#38BDF8',
    repoType: 'Student Schedule Builder',
    stack: [
      { name: 'React', icon: <SiReact />, color: '#00D8FF' },
      { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
    ],
    summary:
      'A web portal that helps USAS students build their weekly class timetables, check for time clashes, and export schedules as PDFs or phone wallpapers.',
    tags: ['Web', 'Automation'],
    link: 'https://github.com/zis3c/USAS-Class-Timetable',
    demoLink: 'https://jadualkelas.zis3c.dev',
    demoLabel: 'jadualkelas.zis3c.dev',
  },
  {
    id: '12',
    name: 'LLM-API-Lab',
    year: '2025',
    icon: <FaBrain />,
    iconColor: '#10A37F',
    repoType: 'AI API Testing Playground',
    stack: [
      { name: 'OpenAI / LLMs', icon: <SiOpenai />, color: '#10A37F' },
      { name: 'HTML5', icon: <SiHtml5 />, color: '#E34F26' },
      { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E' },
    ],
    summary:
      'A browser playground for testing prompts and API responses across OpenAI, Anthropic, Mistral, and OpenRouter without any complex setup.',
    tags: ['Web', 'Research'],
    link: 'https://github.com/zis3c/LLM-API-Lab',
  },
  {
    id: '13',
    name: 'LilyGO-T-Dongle-S3-Firmware',
    year: '2025',
    icon: <FaMicrochip />,
    iconColor: '#00979D',
    repoType: 'Embedded Hardware Toolkit',
    stack: [
      { name: 'C', icon: <SiC />, color: '#A8B9CC' },
      { name: 'Arduino', icon: <SiArduino />, color: '#00979D' },
      { name: 'ESP32-S3', icon: <SiCplusplus />, color: '#00599C' },
    ],
    summary:
      'Base firmware, flashing scripts, and hardware test tools for the LilyGO T-Dongle-S3 microcontroller board.',
    tags: ['Security', 'Automation', 'Research'],
    link: 'https://github.com/zis3c/LilyGO-T-Dongle-S3-Firmware',
  },
  {
    id: '14',
    name: 'QRBot',
    year: '2025',
    icon: <FaQrcode />,
    iconColor: '#3B82F6',
    repoType: 'Telegram QR Code Utility',
    stack: [
      { name: 'Python', icon: <SiPython />, color: '#3776AB' },
      { name: 'Docker', icon: <SiDocker />, color: '#2496ED' },
      { name: 'Telegram Bot', icon: <SiTelegram />, color: '#26A5E4' },
    ],
    summary:
      'A Telegram bot that generates and scans QR codes for links, Wi-Fi login details, contact cards, and map locations.',
    tags: ['Bot', 'Security', 'Automation'],
    link: 'https://github.com/zis3c/QRBot',
  },
  {
    id: '15',
    name: 'MLBB-CounterDraft',
    year: '2025',
    icon: <FaGamepad />,
    iconColor: '#F59E0B',
    repoType: 'Game Draft Assistant',
    stack: [
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
      { name: 'React', icon: <SiReact />, color: '#00D8FF' },
    ],
    summary:
      'An interactive draft helper for Mobile Legends that suggests hero bans and counter-picks based on team composition and win rates.',
    tags: ['Web'],
    link: 'https://github.com/zis3c/MLBB-CounterDraft',
  },
  {
    id: '16',
    name: 'USAS-VC-Evaluation-Automator',
    year: '2025',
    icon: <FaCogs />,
    iconColor: '#F7DF1E',
    repoType: 'Browser Automation Script',
    stack: [
      { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E' },
      { name: 'HTML5', icon: <SiHtml5 />, color: '#E34F26' },
    ],
    summary:
      'A browser script that helps students complete end-of-semester course evaluation forms on the university portal in one click.',
    tags: ['Automation', 'Web'],
    link: 'https://github.com/zis3c/USAS-VC-Evaluation-Automator',
  },
  {
    id: '17',
    name: 'basic-iot-cloud-setup',
    year: '2025',
    icon: <FaServer />,
    iconColor: '#0080FF',
    repoType: 'IoT Cloud Server Setup',
    stack: [
      { name: 'Shell', icon: <SiGnubash />, color: '#4EAA25' },
      { name: 'Node-RED', icon: <SiNodered />, color: '#8F0000' },
      {
        name: 'Mosquitto MQTT',
        icon: <SiEclipsemosquitto />,
        color: '#3C5280',
      },
      { name: 'DigitalOcean', icon: <SiDigitalocean />, color: '#0080FF' },
    ],
    summary:
      'Automated setup scripts for deploying an IoT cloud server with MQTT messaging, Node-RED workflows, and sensor charts on DigitalOcean.',
    tags: ['Automation', 'Web'],
    link: 'https://github.com/zis3c/basic-iot-cloud-setup',
  },
  {
    id: '18',
    name: 'USAS-Launcher',
    year: '2025',
    icon: <FaWifi />,
    iconColor: '#10B981',
    repoType: 'Campus Wi-Fi Auto-Login',
    stack: [
      { name: 'Python', icon: <SiPython />, color: '#3776AB' },
      { name: 'Shell', icon: <SiGnubash />, color: '#4EAA25' },
    ],
    summary:
      'A one-click desktop script that automatically signs into the campus Wi-Fi network and opens student learning portals.',
    tags: ['Automation'],
    link: 'https://github.com/zis3c/USAS-Launcher',
  },
  {
    id: '19',
    name: 'Tgreactsort',
    year: '2025',
    icon: <FaChartBar />,
    iconColor: '#6366F1',
    repoType: 'Telegram Channel Analytics',
    stack: [
      { name: 'Python', icon: <SiPython />, color: '#3776AB' },
      { name: 'Pandas', icon: <SiPandas />, color: '#150458' },
      { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E' },
      { name: 'Telegram', icon: <SiTelegram />, color: '#26A5E4' },
    ],
    summary:
      'Fetches, ranks, and visualizes Telegram channel posts by reaction counts using a Python data pipeline and web dashboard.',
    tags: ['Automation', 'Bot', 'Research'],
    link: 'https://github.com/zis3c/Tgreactsort',
  },
  {
    id: '20',
    name: 'Polyglot-File',
    year: '2025',
    icon: <FaFileCode />,
    iconColor: '#A855F7',
    repoType: 'File Format Security Tool',
    stack: [
      { name: 'Python', icon: <SiPython />, color: '#3776AB' },
      { name: 'Linux', icon: <SiLinux />, color: '#EAB308' },
      { name: 'CLI', icon: <SiGnubash />, color: '#4EAA25' },
    ],
    summary:
      'A security research tool that combines two valid file formats (such as JPEG and PDF) into a single file to test upload filters.',
    tags: ['Security', 'Research'],
    link: 'https://github.com/zis3c/Polyglot-File',
  },
  {
    id: '21',
    name: 'Compilation-and-RE-Process',
    year: '2025',
    icon: <FaMicrochip />,
    iconColor: '#EC4899',
    repoType: 'Educational Visualizer',
    stack: [
      { name: 'Python', icon: <SiPython />, color: '#3776AB' },
      { name: 'C', icon: <SiC />, color: '#A8B9CC' },
      { name: 'Linux', icon: <SiLinux />, color: '#EAB308' },
    ],
    summary:
      'An educational tool created for university workshops to show how source code is compiled into binary instructions and decompiled back.',
    tags: ['Security', 'Research'],
    link: 'https://github.com/zis3c/Compilation-and-RE-Process',
  },
  {
    id: '22',
    name: 'CTF-Writeups',
    year: '2025',
    icon: <FaBookOpen />,
    iconColor: '#14B8A6',
    repoType: 'Security Learning Notes',
    stack: [
      { name: 'Kali Linux', icon: <SiKalilinux />, color: '#367BF0' },
      { name: 'Python', icon: <SiPython />, color: '#3776AB' },
    ],
    summary:
      'A collection of step-by-step solutions and notes from cybersecurity Capture The Flag competitions for students learning security.',
    tags: ['Security', 'Research'],
    link: 'https://github.com/zis3c/CTF-Writeups',
  },
  {
    id: '23',
    name: 'RE-App-UMC-Student-USAS',
    year: '2025',
    icon: <FaMobileAlt />,
    iconColor: '#3DDC84',
    repoType: 'Mobile App Security Study',
    isPrivate: true,
    stack: [
      { name: 'Android', icon: <SiAndroid />, color: '#3DDC84' },
      { name: 'Kali Linux', icon: <SiKalilinux />, color: '#367BF0' },
    ],
    summary:
      'Private mobile application security research focusing on Android app structure and defensive security practices in an isolated lab.',
    tags: ['Security', 'Research'],
    link: 'https://github.com/zis3c/RE-App-UMC-Student-USAS',
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
  const [isBootLoading, setIsBootLoading] = useState(true);
  const [repoStats, setRepoStats] = useState<Record<string, GithubRepoStat>>(
    {}
  );

  const filteredProjects = featuredProjects.filter((project) => {
    if (projectFilter === 'All') return true;
    return project.tags.includes(projectFilter);
  });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsBootLoading(false);
    }, 450);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    setFocusedProjectIndex(0);
  }, [projectFilter]);

  /* Fetch live stars & forks directly from GitHub public REST API */
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.fetch !== 'function') {
      return;
    }
    let isMounted = true;
    window
      .fetch('https://api.github.com/users/zis3c/repos?per_page=100')
      .then((res) => (res && res.ok ? res.json() : null))
      .then((data) => {
        if (!isMounted || !Array.isArray(data)) return;
        const nextStats: Record<string, GithubRepoStat> = {};
        data.forEach((repo: Record<string, unknown>) => {
          if (typeof repo.name === 'string') {
            nextStats[repo.name.toLowerCase()] = {
              stars:
                typeof repo.stargazers_count === 'number'
                  ? repo.stargazers_count
                  : 0,
              forks:
                typeof repo.forks_count === 'number' ? repo.forks_count : 0,
            };
          }
        });
        setRepoStats(nextStats);
      })
      .catch(() => {
        /* Fallback silently if GitHub API is rate-limited or offline */
      });
    return () => {
      isMounted = false;
    };
  }, []);

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
      {isBootLoading && (
        <Styled.BootLoaderOverlay onClick={() => setIsBootLoading(false)}>
          <Styled.BootLoaderCard>
            <div className="spinner-ring" aria-hidden="true" />
            <p className="spinner-title">Loading Portfolio Mode...</p>
            <p className="spinner-sub">Preparing projects and GitHub stats</p>
            <div className="spinner-bar" />
          </Styled.BootLoaderCard>
        </Styled.BootLoaderOverlay>
      )}

      {/* Top Navigation Bar */}
      <Styled.Nav>
        <Styled.BrandGroup>
          <Styled.StatusLed title="Online" />
          <Styled.Brand>
            <span>Radzi (zis3c)</span>
          </Styled.Brand>
        </Styled.BrandGroup>

        <Styled.ChapterNav aria-label="Portfolio sections">
          <button type="button" onClick={() => jumpTo('simple-about')}>
            About
          </button>
          <button type="button" onClick={() => jumpTo('simple-craft')}>
            What I Do
          </button>
          <button type="button" onClick={() => jumpTo('simple-projects')}>
            Projects
          </button>
          <button type="button" onClick={() => jumpTo('simple-journey')}>
            Experience
          </button>
          <button type="button" onClick={() => jumpTo('simple-skills')}>
            Skills
          </button>
          <button type="button" onClick={() => jumpTo('simple-contact')}>
            Contact
          </button>
        </Styled.ChapterNav>

        <Styled.NavActions>
          <Styled.PaletteTrigger
            type="button"
            onClick={() => setIsPaletteOpen(true)}
            aria-label="Open command palette"
            title="Command Palette (Ctrl+K)"
          >
            <FiCommand />
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
            title={
              simpleTheme === 'terminal'
                ? 'Switch to Light Theme'
                : 'Switch to Dark Theme'
            }
          >
            {simpleTheme === 'terminal' ? <FiSun /> : <FiMoon />}
          </Styled.ThemeToggle>

          <Styled.BackButton
            type="button"
            onClick={onBackToChooser}
            aria-label="Open system boot menu"
            title="Return to Boot Menu / Kali Linux"
          >
            <FiPower />
          </Styled.BackButton>
        </Styled.NavActions>
      </Styled.Nav>

      <Styled.Main>
        {/* Section 1: Minimalist Hero */}
        <Styled.HeroWorkbench id="simple-about">
          <Styled.HeroSection>
            <Styled.HeroTitle>
              <GlitchText
                words={[
                  'Hi, I am Radzi (zis3c).',
                  'Cybersecurity Researcher.',
                  'Full-Stack Web Developer.',
                  'Software & Bot Builder.',
                ]}
              />
            </Styled.HeroTitle>

            <Styled.HeroRoleSub>
              Computer Science Student · Security Researcher · Software
              Developer
            </Styled.HeroRoleSub>

            <Styled.HeroText>
              I am a Computer Science student based in Malaysia who enjoys
              building practical software and exploring how systems work under
              the hood. My work ranges from cloud security tools and hardware
              firmware to full-stack web applications and Telegram bots that
              solve everyday problems for students.
            </Styled.HeroText>

            <Styled.HeroText>
              Outside of building projects, I serve as Secretary and Reverse
              Engineering Trainer for our university Capture The Flag (CTF)
              team, Dot Zero, where I help run workshops and compete in
              cybersecurity competitions.
            </Styled.HeroText>

            <Styled.SocialGrid>
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
          </Styled.HeroSection>

          <Styled.QuickStatsGrid>
            <Styled.QuickStatCard>
              <span className="stat-label">Primary Focus</span>
              <span className="stat-value">
                Cybersecurity &amp; Web Development
              </span>
            </Styled.QuickStatCard>
            <Styled.QuickStatCard>
              <span className="stat-label">University Team</span>
              <span className="stat-value">
                Dot Zero CTF · Secretary &amp; Trainer
              </span>
            </Styled.QuickStatCard>
            <Styled.QuickStatCard>
              <span className="stat-label">Open Source</span>
              <span className="stat-value">
                23 Projects Across Web, Bots &amp; Security
              </span>
            </Styled.QuickStatCard>
            <Styled.QuickStatCard>
              <span className="stat-label">Based In</span>
              <span className="stat-value">Malaysia (UTC+8)</span>
            </Styled.QuickStatCard>
          </Styled.QuickStatsGrid>
        </Styled.HeroWorkbench>

        {/* Section 2: What I Do */}
        <Styled.StorySection id="simple-craft">
          <Styled.SectionHeader>
            <Styled.SectionTitle>What I Do</Styled.SectionTitle>
            <Styled.SectionSubtitle>
              A simple look at the three areas I spend most of my time building
              and learning in.
            </Styled.SectionSubtitle>
          </Styled.SectionHeader>

          <Styled.PillarGrid>
            <Styled.PillarCard iconColor="#EF4444">
              <div className="pillar-icon">
                <FaShieldAlt />
              </div>
              <h3>Security &amp; Threat Monitoring</h3>
              <p>
                I build security monitoring systems and honeypots to study how
                automated attacks happen on the internet and design faster ways
                to block them automatically.
              </p>
              <div className="pillar-tags">
                <span className="pillar-tag">Cloud Security</span>
                <span className="pillar-tag">Network Defense</span>
                <span className="pillar-tag">Automation</span>
              </div>
            </Styled.PillarCard>

            <Styled.PillarCard iconColor="#8B5CF6">
              <div className="pillar-icon">
                <FiTerminal />
              </div>
              <h3>Reverse Engineering &amp; CTFs</h3>
              <p>
                I analyze compiled programs and mobile apps to understand how
                they work internally, and lead introductory workshops for
                students in our university CTF team.
              </p>
              <div className="pillar-tags">
                <span className="pillar-tag">Binary Analysis</span>
                <span className="pillar-tag">Debugging</span>
                <span className="pillar-tag">CTF Workshops</span>
              </div>
            </Styled.PillarCard>

            <Styled.PillarCard iconColor="#06B6D4">
              <div className="pillar-icon">
                <FaDesktop />
              </div>
              <h3>Web Apps &amp; Automation Bots</h3>
              <p>
                I create modern web platforms, Telegram bots, and hardware tools
                that make daily tasks easier for university students, clinics,
                and developers.
              </p>
              <div className="pillar-tags">
                <span className="pillar-tag">Next.js &amp; React</span>
                <span className="pillar-tag">Laravel &amp; Python</span>
                <span className="pillar-tag">Telegram Bots</span>
              </div>
            </Styled.PillarCard>
          </Styled.PillarGrid>
        </Styled.StorySection>

        {/* Section 3: Projects Directory */}
        <Styled.DirectoryFrame id="simple-projects">
          <Styled.DirectoryHeaderBar>
            <Styled.SectionHeader style={{ marginBottom: 0 }}>
              <Styled.SectionTitle>Projects</Styled.SectionTitle>
              <Styled.SectionSubtitle>
                A complete list of my 23 projects across security, web apps,
                hardware, and bots. Star counts update live from GitHub.
              </Styled.SectionSubtitle>
            </Styled.SectionHeader>
            <Styled.DirectoryCountBadge>
              {filteredProjects.length} of {featuredProjects.length} projects
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
                const repoSlug =
                  project.link.split('/').pop()?.toLowerCase() || '';
                const liveStat = repoStats[repoSlug];

                return (
                  <Styled.ProjectCard
                    key={project.name}
                    isFocused={index === focusedProjectIndex}
                    onClick={() => setFocusedProjectIndex(index)}
                  >
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
                                {project.isPrivate ? <FaLock /> : <FaFolder />}{' '}
                                {project.year} · {project.repoType}
                              </span>
                              {liveStat && liveStat.stars > 0 && (
                                <span
                                  className="repo-tag"
                                  title="Live stars from GitHub API"
                                >
                                  <FaStar style={{ color: '#EAB308' }} />{' '}
                                  {liveStat.stars}
                                </span>
                              )}
                              {liveStat && liveStat.forks > 0 && (
                                <span
                                  className="repo-tag"
                                  title="Live forks from GitHub API"
                                >
                                  <FaCodeBranch /> {liveStat.forks}
                                </span>
                              )}
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

                      <Styled.ProjectSummary>
                        {project.summary}
                      </Styled.ProjectSummary>

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
                    </Styled.ProjectHeader>

                    <Styled.ProjectActionRow>
                      <Styled.ProjectButtonGroup>
                        <Styled.ProjectOpenLink
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaGithub /> View Code
                        </Styled.ProjectOpenLink>
                        {project.demoLink && (
                          <Styled.ProjectDemoLink
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FiExternalLink />{' '}
                            {project.demoLabel || 'Live Demo'}
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

        {/* Section 4: Experience & Achievements */}
        <Styled.StorySection id="simple-journey">
          <Styled.SectionHeader>
            <Styled.SectionTitle>Experience &amp; Journey</Styled.SectionTitle>
            <Styled.SectionSubtitle>
              Key milestones from my studies, university clubs, and security
              competitions.
            </Styled.SectionSubtitle>
          </Styled.SectionHeader>

          <Styled.TimelineWrap>
            <Styled.TimelineItem>
              <div className="time-period">
                <span>2026 · Present</span>
                <span className="time-sub">Final Year &amp; Research</span>
              </div>
              <div className="time-content">
                <h3 className="time-title">
                  Cloud Security &amp; Hardware Firmware Projects
                </h3>
                <p className="time-desc">
                  Developing CloudSentinel, a real-time SSH honeypot and threat
                  monitoring dashboard, alongside custom ESP32-S3 hardware
                  firmware for RedLilyGO.
                </p>
              </div>
            </Styled.TimelineItem>

            <Styled.TimelineItem>
              <div className="time-period">
                <span>2025 - 2026</span>
                <span className="time-sub">Dot Zero CTF Team</span>
              </div>
              <div className="time-content">
                <h3 className="time-title">
                  Team Secretary &amp; Reverse Engineering Trainer
                </h3>
                <p className="time-desc">
                  Organizing student training sessions, teaching hands-on
                  reverse engineering workshops, and competing with our
                  university team in international CTF events.
                </p>
              </div>
            </Styled.TimelineItem>

            <Styled.TimelineItem>
              <div className="time-period">
                <span>2024 - 2026</span>
                <span className="time-sub">Campus &amp; Open Source</span>
              </div>
              <div className="time-content">
                <h3 className="time-title">
                  Building Web Platforms &amp; Student Tools
                </h3>
                <p className="time-desc">
                  Created and launched web apps and Telegram bots for university
                  students, including the STEM-USAS portal, Class Timetable
                  builder, Assignment Notifier, and JanjiCare clinic system.
                </p>
              </div>
            </Styled.TimelineItem>

            <Styled.TimelineItem>
              <div className="time-period">
                <span>2021 - 2024</span>
                <span className="time-sub">Foundations</span>
              </div>
              <div className="time-content">
                <h3 className="time-title">
                  Linux, Networking &amp; Software Development
                </h3>
                <p className="time-desc">
                  Built a strong foundation in Linux systems, networking,
                  databases, and web programming through coursework and personal
                  projects.
                </p>
              </div>
            </Styled.TimelineItem>
          </Styled.TimelineWrap>

          <Styled.RecognitionGrid>
            <Styled.RecognitionCard>
              <div className="rec-top">
                <span>CTF Competition · 2026</span>
                <span className="rec-badge">21st / 316 Teams</span>
              </div>
              <h4>RE:UN10N CTF · Dot Zero</h4>
              <p>
                Placed 21st internationally with our university CTF team,
                focusing on reverse engineering challenges.
              </p>
            </Styled.RecognitionCard>

            <Styled.RecognitionCard>
              <div className="rec-top">
                <span>International CTFs · 2026</span>
                <span className="rec-badge">Top 15%</span>
              </div>
              <h4>ApoorvCTF (#88) &amp; 0xFun CTF (#133)</h4>
              <p>
                Finished 88th out of 620 teams in ApoorvCTF and 133rd out of 975
                teams in 0xFun CTF.
              </p>
            </Styled.RecognitionCard>

            <Styled.RecognitionCard>
              <div className="rec-top">
                <span>Certificates</span>
                <span className="rec-badge">Completed</span>
              </div>
              <h4>Google Cybersecurity &amp; RE Bootcamp</h4>
              <p>
                Completed the Google Cybersecurity Certificate and hands-on
                Reverse Engineering training.
              </p>
            </Styled.RecognitionCard>
          </Styled.RecognitionGrid>
        </Styled.StorySection>

        {/* Section 5: Technical Skills */}
        <Styled.ArsenalSection id="simple-skills">
          <Styled.SectionHeader>
            <Styled.SectionTitle>
              <FiCpu />
              <span>Skills &amp; Tools</span>
            </Styled.SectionTitle>
            <Styled.SectionSubtitle>
              The languages, frameworks, and security tools I use regularly.
            </Styled.SectionSubtitle>
          </Styled.SectionHeader>

          <Styled.ArsenalRack>
            <Styled.ArsenalRow>
              <Styled.ArsenalRowMeta>
                <span className="rack-title">
                  <FiTerminal /> Security &amp; Reverse Engineering
                </span>
                <span className="rack-desc">
                  Tools for analyzing binaries, debugging, and inspecting
                  network traffic.
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
                  <span>GDB</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge iconColor="#F97316">
                  <span className="badge-icon">
                    <SiPython />
                  </span>
                  <span>Frida</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge iconColor="#1679A7">
                  <span className="badge-icon">
                    <SiWireshark />
                  </span>
                  <span>Wireshark</span>
                </Styled.ArsenalBadge>
              </Styled.ArsenalBadgeList>
            </Styled.ArsenalRow>

            <Styled.ArsenalRow>
              <Styled.ArsenalRowMeta>
                <span className="rack-title">
                  <FaMicrochip /> Programming Languages
                </span>
                <span className="rack-desc">
                  Languages for backend scripts, firmware, and web apps.
                </span>
              </Styled.ArsenalRowMeta>
              <Styled.ArsenalBadgeList>
                <Styled.ArsenalBadge iconColor="#3776AB">
                  <span className="badge-icon">
                    <SiPython />
                  </span>
                  <span>Python</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge iconColor="#3178C6">
                  <span className="badge-icon">
                    <SiTypescript />
                  </span>
                  <span>TypeScript</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge iconColor="#F7DF1E">
                  <span className="badge-icon">
                    <SiJavascript />
                  </span>
                  <span>JavaScript</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge iconColor="#00599C">
                  <span className="badge-icon">
                    <SiCplusplus />
                  </span>
                  <span>C / C++</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge iconColor="#777BB4">
                  <span className="badge-icon">
                    <SiPhp />
                  </span>
                  <span>PHP</span>
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
                  <span>Bash</span>
                </Styled.ArsenalBadge>
              </Styled.ArsenalBadgeList>
            </Styled.ArsenalRow>

            <Styled.ArsenalRow>
              <Styled.ArsenalRowMeta>
                <span className="rack-title">
                  <SiReact /> Web Frameworks
                </span>
                <span className="rack-desc">
                  Frontend and backend tools for building modern web platforms.
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
                  <span>React</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge iconColor="#FF2D20">
                  <span className="badge-icon">
                    <SiLaravel />
                  </span>
                  <span>Laravel</span>
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
                  <span>WebRTC</span>
                </Styled.ArsenalBadge>
              </Styled.ArsenalBadgeList>
            </Styled.ArsenalRow>

            <Styled.ArsenalRow>
              <Styled.ArsenalRowMeta>
                <span className="rack-title">
                  <FaShieldAlt /> Cloud &amp; Infrastructure
                </span>
                <span className="rack-desc">
                  Databases, Linux environments, and deployment tools.
                </span>
              </Styled.ArsenalRowMeta>
              <Styled.ArsenalBadgeList>
                <Styled.ArsenalBadge iconColor="#367BF0">
                  <span className="badge-icon">
                    <SiKalilinux />
                  </span>
                  <span>Kali Linux</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge iconColor="#4169E1">
                  <span className="badge-icon">
                    <SiPostgresql />
                  </span>
                  <span>PostgreSQL</span>
                </Styled.ArsenalBadge>
                <Styled.ArsenalBadge iconColor="#DC382D">
                  <span className="badge-icon">
                    <SiRedis />
                  </span>
                  <span>Redis</span>
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
                  <span>GitHub Actions</span>
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

        {/* Section 6: Contact */}
        <Styled.ContactSection id="simple-contact">
          <Styled.CommsTerminal>
            <Styled.CommsBody>
              <Styled.CommsInfo>
                <h3>Get in Touch</h3>
                <p>
                  Interested in collaborating, talking about cybersecurity, or
                  checking out my code? Feel free to connect with me on GitHub
                  or LinkedIn.
                </p>
              </Styled.CommsInfo>
              <Styled.ProjectButtonGroup style={{ width: 'auto' }}>
                <Styled.ProjectOpenLink
                  href="https://github.com/zis3c"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub /> GitHub (@zis3c)
                </Styled.ProjectOpenLink>
                <Styled.ProjectDemoLink
                  href="https://linkedin.com/in/radzizamri"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin /> LinkedIn
                </Styled.ProjectDemoLink>
              </Styled.ProjectButtonGroup>
            </Styled.CommsBody>
            <Styled.HotkeyBar>
              <span>
                <kbd>J</kbd>/<kbd>K</kbd> Scroll
              </span>
              <span>
                <kbd>&larr;</kbd>/<kbd>&rarr;</kbd> Select Project
              </span>
              <span>
                <kbd>Enter</kbd> Open Project
              </span>
              <span>
                <kbd>Ctrl+K</kbd> Quick Menu
              </span>
            </Styled.HotkeyBar>
          </Styled.CommsTerminal>
        </Styled.ContactSection>
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

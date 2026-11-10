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
/*  Data (with Authentic Brand Icon Colors & Real Project Previews)    */
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
  role: string;
  icon: React.ReactNode;
  iconColor: string;
  repoType: string;
  statusLabel?: string;
  isPrivate?: boolean;
  previewImage?: string;
  galleryImages?: { label: string; src: string }[];
  stack: TechItem[];
  summary: string;
  highlights: string[];
  tags: string[];
  link: string;
  demoLink?: string;
  demoLabel?: string;
};

type GithubRepoStat = {
  stars: number;
  forks: number;
};

type ShowcaseSlide = {
  id: string;
  title: string;
  category: string;
  image: string;
  summary: string;
  repoLink: string;
  liveLink?: string;
  liveLabel?: string;
};

const showcaseSlides: ShowcaseSlide[] = [
  {
    id: '01',
    title: 'RedLilyGO · ESP32-S3 Security Firmware',
    category: '2026 · Embedded Hardware & BadUSB',
    image: '/assets/projects/redlilygo-features.png',
    summary:
      'Custom ESP32-S3 firmware for the LilyGO T-Dongle-S3 combining DuckyScript BadUSB injection, Wi-Fi/BLE Marauder auditing, MicroSD PCAP packet capture, VNC remote control, and a hardware killswitch.',
    repoLink: 'https://github.com/zis3c/RedLilyGO',
  },
  {
    id: '02',
    title: 'JanjiCare · Clinic & WebRTC Telehealth',
    category: '2026 · Full-Stack Healthcare Platform',
    image: '/assets/projects/janjicare-dashboard.png',
    summary:
      'Role-based clinic management system built with Laravel 13, React, TypeScript, and WebRTC. Connects administrators, doctors, and patients with real-time queue check-in and browser video consultations.',
    repoLink: 'https://github.com/zis3c/Clinic-Web-Appointment',
  },
  {
    id: '03',
    title: 'Kali-XFCE-Portfolio · Desktop OS Simulation',
    category: '2026 · Interactive Web Desktop',
    image: '/about/2.png',
    summary:
      'Dual-boot portfolio environment simulating a Kali Linux XFCE desktop with window management, interactive terminal emulator, virtual filesystem, and this editorial Portfolio Mode.',
    repoLink: 'https://github.com/zis3c/Kali-XFCE-Portfolio',
    liveLink: 'https://me.zis3c.dev',
    liveLabel: 'me.zis3c.dev',
  },
  {
    id: '04',
    title: 'STEM-Telebot · Digital ID & Verification',
    category: '2026 · Telegram Bot & Database Automation',
    image: '/assets/projects/stem-telebot.png',
    summary:
      'Official Telegram bot for the STEM USAS student society automating membership verification, digital membership pass generation, faculty broadcasts, and two-way database sync.',
    repoLink: 'https://github.com/zis3c/STEM-Telebot',
  },
  {
    id: '05',
    title: 'USAS-Assignment-Notifier (DueBot)',
    category: '2026 · Moodle LMS Deadline Bridge',
    image: '/assets/projects/usas-notifier.png',
    summary:
      'Automated deadline monitoring bridge between USAS Moodle LMS and Telegram. Scans coursework hourly, verifies submission state, and stores student credentials with Fernet AES-128 encryption.',
    repoLink: 'https://github.com/zis3c/USAS-Assignment-Notifier',
  },
  {
    id: '06',
    title: 'USAS-Class-Timetable Portal',
    category: '2026 · Student Schedule & Utility Suite',
    image: '/assets/projects/usas-timetable.png',
    summary:
      'Student timetable portal featuring weekly schedule building, QR attendance, exam schedule lookup, Google/Apple Calendar sync, and high-resolution PDF/wallpaper export.',
    repoLink: 'https://github.com/zis3c/USAS-Class-Timetable',
    liveLink: 'https://jadualkelas.zis3c.dev',
    liveLabel: 'jadualkelas.zis3c.dev',
  },
  {
    id: '07',
    title: 'MLBB-CounterDraft · Draft Simulator',
    category: '2025 · Real-Time Recommendation Engine',
    image: '/assets/projects/mlbb-counterdraft.png',
    summary:
      'Competitive draft assistant with live hero data sync, priority ban/pick scoring, lane/role filtering, and synergy calculations built with Next.js and TypeScript.',
    repoLink: 'https://github.com/zis3c/MLBB-CounterDraft',
  },
  {
    id: '08',
    title: 'STEM-USAS · Official Association Portal',
    category: '2026 · Campus Community Web Platform',
    image: '/assets/projects/stem-usas.png',
    summary:
      'Official bilingual web portal for Persatuan Sains Teknologi & Multimedia (STEM USAS), showcasing student programs, open-source initiatives, and free student project hosting.',
    repoLink: 'https://github.com/zis3c/STEM-USAS',
    liveLink: 'https://stem.zis3c.dev',
    liveLabel: 'stem.zis3c.dev',
  },
];

const featuredProjects: FeaturedProject[] = [
  {
    id: '01',
    name: 'CloudSentinel (FYP)',
    year: '2026',
    role: 'Creator & Security Researcher',
    icon: <FaShieldAlt />,
    iconColor: '#EF4444',
    repoType: 'SSH Honeypot & SOAR Threat Detection',
    statusLabel: 'Featured FYP · Private',
    isPrivate: true,
    stack: [
      { name: 'Python', icon: <SiPython />, color: '#3776AB' },
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'Redis', icon: <SiRedis />, color: '#DC382D' },
      { name: 'DigitalOcean', icon: <SiDigitalocean />, color: '#0080FF' },
      { name: 'Linux', icon: <SiLinux />, color: '#EAB308' },
    ],
    summary:
      'An event-driven, cloud-native SSH honeypot with active SOAR auto-blocking under 1 second, HASSH cryptographic fingerprinting, and automated MITRE ATT&CK v18 mapping.',
    highlights: [
      'HASSH cryptographic client fingerprinting with automated MITRE ATT&CK v18 mapping',
      'Active SOAR firewall auto-blocking under 1 second (<1ms median local benchmark)',
      'Real-time Next.js telemetry dashboard backed by ClickHouse storage and Redis streams',
    ],
    tags: ['Security', 'Web', 'Research'],
    link: 'https://github.com/zis3c/CloudSentinel',
  },
  {
    id: '02',
    name: 'RedLilyGO',
    year: '2026',
    role: 'Creator & Firmware Engineer',
    icon: <FaMicrochip />,
    iconColor: '#F97316',
    repoType: 'ESP32-S3 Security Firmware',
    previewImage: '/assets/projects/redlilygo-features.png',
    galleryImages: [
      { label: 'Architecture', src: '/assets/projects/redlilygo-features.png' },
      {
        label: 'Dongle Hardware',
        src: '/assets/projects/redlilygo-hardware.png',
      },
      { label: 'Web Console', src: '/assets/projects/redlilygo-dashboard.png' },
    ],
    stack: [
      { name: 'ESP32-S3 C++', icon: <SiCplusplus />, color: '#00599C' },
      { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E' },
      { name: '.NET 8', icon: <SiDotnet />, color: '#512BD4' },
      { name: 'Wireshark PCAP', icon: <SiWireshark />, color: '#1679A7' },
    ],
    summary:
      'ESP32-S3 firmware for LilyGO T-Dongle-S3 combining USB HID injection (DuckyScript), ESP32 Marauder Wi-Fi/BLE auditing with SD PCAP logging, local SoftAP web console, and a serial .NET 8 companion app.',
    highlights: [
      'DuckyScript USB HID keystroke injection and local SoftAP web management console',
      'ESP32 Marauder Wi-Fi and BLE auditing with onboard SD card PCAP packet logging',
      'Serial .NET 8 desktop companion app and CI security checks (CodeQL, Semgrep, Gitleaks)',
    ],
    tags: ['Security', 'Research', 'Automation'],
    link: 'https://github.com/zis3c/RedLilyGO',
  },
  {
    id: '03',
    name: 'Clinic-Web-Appointment (JanjiCare)',
    year: '2026',
    role: 'Full-Stack Developer',
    icon: <FaHospital />,
    iconColor: '#06B6D4',
    repoType: 'Clinic Management & WebRTC Telehealth',
    previewImage: '/assets/projects/janjicare-dashboard.png',
    galleryImages: [
      { label: 'Admin Queue', src: '/assets/projects/janjicare-dashboard.png' },
      { label: 'Landing Page', src: '/assets/projects/janjicare-landing.png' },
      {
        label: 'System Bento',
        src: '/assets/projects/janjicare-infographic.png',
      },
      {
        label: 'WebRTC Room',
        src: '/assets/projects/janjicare-telehealth.png',
      },
    ],
    stack: [
      { name: 'Laravel', icon: <SiLaravel />, color: '#FF2D20' },
      { name: 'React', icon: <SiReact />, color: '#00D8FF' },
      { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
      { name: 'WebRTC', icon: <SiWebrtc />, color: '#F59E0B' },
      { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#38BDF8' },
    ],
    summary:
      'A clinic management system designed to connect admins, doctors, and patients, featuring appointment booking, digital prescriptions, and WebRTC telehealth.',
    highlights: [
      'Role-based portals connecting Administrators, Doctors, and Patients',
      'Appointment scheduling, digital prescriptions, and real-time WebSocket queue updates',
      'Encrypted WebRTC telehealth video consultations built into the browser',
    ],
    tags: ['Web'],
    link: 'https://github.com/zis3c/Clinic-Web-Appointment',
  },
  {
    id: '04',
    name: 'Google-Form-Spammer',
    year: '2025',
    role: 'Creator & Maintainer',
    icon: <FaBolt />,
    iconColor: '#EAB308',
    repoType: 'Async Stress-Testing CLI',
    previewImage: '/assets/projects/gform-spammer.png',
    stack: [
      { name: 'Python', icon: <SiPython />, color: '#3776AB' },
      { name: 'aiohttp / asyncio', icon: <SiPython />, color: '#FFD43B' },
      { name: 'Google Forms', icon: <SiGoogle />, color: '#4285F4' },
      { name: 'CLI', icon: <SiGnubash />, color: '#4EAA25' },
    ],
    summary:
      'A high-performance, asynchronous Google Forms spammer and stress-testing CLI built with Python asyncio and aiohttp.',
    highlights: [
      'Asynchronous aiohttp worker pool for high-concurrency form submission testing',
      'Automatic form field parser with HTTP 429 rate-limit backoff and user-agent rotation',
      'Interactive terminal progress output for educational load and stress testing',
    ],
    tags: ['Automation', 'Security', 'Research'],
    link: 'https://github.com/zis3c/Google-Form-Spammer',
  },
  {
    id: '05',
    name: 'Codex-notifier-vscode',
    year: '2025',
    role: 'Extension Author',
    icon: <FaBell />,
    iconColor: '#007ACC',
    repoType: 'VS Code Extension',
    stack: [
      { name: 'VS Code API', icon: <SiVisualstudiocode />, color: '#007ACC' },
      { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E' },
    ],
    summary:
      'VS Code extension that notifies developers with sound and status/banner alerts when Codex responses finish.',
    highlights: [
      'Audio cues and VS Code status bar/banner notifications when long AI tasks complete',
      'Adopted by community developers (stars and forks tracked live via GitHub)',
      'Lightweight zero-dependency extension workflow for VS Code',
    ],
    tags: ['Automation', 'Web'],
    link: 'https://github.com/zis3c/Codex-notifier-vscode',
  },
  {
    id: '06',
    name: 'CTF-Pipeline',
    year: '2026',
    role: 'Creator · Dot Zero (U545)',
    icon: <FaFlag />,
    iconColor: '#8B5CF6',
    repoType: 'Multi-CTF Pipeline & Toolchain',
    stack: [
      { name: 'Python', icon: <SiPython />, color: '#3776AB' },
      { name: 'Kali Linux', icon: <SiKalilinux />, color: '#367BF0' },
      { name: 'Bash', icon: <SiGnubash />, color: '#4EAA25' },
    ],
    summary:
      'Portable multi-CTF pipeline for syncing CTFd challenges, downloading attachments, organizing solver workspaces, and validating local CTF toolchains.',
    highlights: [
      'Syncs CTFd challenges and attachments automatically into structured category folders',
      'Validates local Reverse Engineering and Pwn toolchains (Ghidra, x64dbg, GDB+GEF, Frida)',
      'Built for university CTF team Dot Zero (U545) competition workflows',
    ],
    tags: ['Security', 'Automation'],
    link: 'https://github.com/zis3c/CTF-Pipeline',
    demoLink: 'https://ctftime.org/team/421634',
    demoLabel: 'Dot Zero CTFtime',
  },
  {
    id: '07',
    name: 'Kali-XFCE-Portfolio',
    year: '2026',
    role: 'Creator & Designer',
    icon: <FaDesktop />,
    iconColor: '#367BF0',
    repoType: 'Kali Linux Desktop Simulation',
    previewImage: '/about/2.png',
    stack: [
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
      { name: 'Redux', icon: <SiRedux />, color: '#764ABC' },
      { name: 'Kali Linux', icon: <SiKalilinux />, color: '#367BF0' },
    ],
    summary:
      'Interactive portfolio simulating a Kali Linux XFCE desktop with window management, terminal emulator, virtual filesystem, and dual boot session flow.',
    highlights: [
      'Full XFCE desktop simulation with interactive Terminal, File Manager, and apps',
      'BIOS dual-boot chooser switching between Portfolio Mode and Kali Linux Mode',
      'Keyboard-driven navigation, command palette (Ctrl+K), and light/dark themes',
    ],
    tags: ['Web', 'Security'],
    link: 'https://github.com/zis3c/Kali-XFCE-Portfolio',
    demoLink: 'https://me.zis3c.dev',
    demoLabel: 'me.zis3c.dev',
  },
  {
    id: '08',
    name: 'STEM-Telebot',
    year: '2026',
    role: 'Lead Developer',
    icon: <FaRobot />,
    iconColor: '#26A5E4',
    repoType: 'Membership Verification Bot',
    previewImage: '/assets/projects/stem-telebot.png',
    stack: [
      { name: 'Python', icon: <SiPython />, color: '#3776AB' },
      { name: 'Telegram Bot', icon: <SiTelegram />, color: '#26A5E4' },
      { name: 'Google Sheets API', icon: <SiGoogle />, color: '#34A853' },
    ],
    summary:
      'STEM membership verification Telegram bot backed by Google Sheets, with admin tools, broadcasts, and web dashboards.',
    highlights: [
      'Automated student membership verification and digital receipt generation',
      'Real-time two-way sync with Google Sheets and admin broadcast tools',
      'Role-based bot commands for student association administrators',
    ],
    tags: ['Bot', 'Automation'],
    link: 'https://github.com/zis3c/STEM-Telebot',
  },
  {
    id: '09',
    name: 'STEM-USAS',
    year: '2026',
    role: 'Lead Web Developer',
    icon: <FaCheckCircle />,
    iconColor: '#22C55E',
    repoType: 'Official STEM USAS Portal',
    previewImage: '/assets/projects/stem-usas.png',
    stack: [
      { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
      { name: 'React', icon: <SiReact />, color: '#00D8FF' },
      { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#38BDF8' },
    ],
    summary:
      'Official web portal for the STEM student association at Universiti Sultan Azlan Shah (USAS), showcasing programs, leadership, and registration links.',
    highlights: [
      'Production web portal deployed at stem.zis3c.dev for STEM students',
      'Responsive layout presenting club activities, announcements, and committee directory',
      'Integrated with the STEM-Telebot verification workflow',
    ],
    tags: ['Web'],
    link: 'https://github.com/zis3c/STEM-USAS',
    demoLink: 'https://stem.zis3c.dev',
    demoLabel: 'stem.zis3c.dev',
  },
  {
    id: '10',
    name: 'USAS-Assignment-Notifier',
    year: '2026',
    role: 'Creator & Backend Developer',
    icon: <FaBell />,
    iconColor: '#EC4899',
    repoType: 'Automated Assignment Tracker',
    previewImage: '/assets/projects/usas-notifier.png',
    stack: [
      { name: 'Python', icon: <SiPython />, color: '#3776AB' },
      { name: 'Telegram', icon: <SiTelegram />, color: '#26A5E4' },
      { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#4169E1' },
    ],
    summary:
      'Automated USAS assignment tracker that syncs VirtualCampus course deadlines and sends real-time Telegram alerts.',
    highlights: [
      'Tracks course assignments and upcoming submission deadlines automatically',
      'Scheduled scraper syncing Moodle/VirtualCampus deadlines with Telegram notifications',
      'Fernet AES-128 encrypted credential storage and submission-state verification',
    ],
    tags: ['Automation', 'Bot'],
    link: 'https://github.com/zis3c/USAS-Assignment-Notifier',
  },
  {
    id: '11',
    name: 'USAS-Class-Timetable',
    year: '2026',
    role: 'Creator & Frontend Engineer',
    icon: <FaCalendarAlt />,
    iconColor: '#38BDF8',
    repoType: 'Student Timetable Portal',
    previewImage: '/assets/projects/usas-timetable.png',
    stack: [
      { name: 'React', icon: <SiReact />, color: '#00D8FF' },
      { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
    ],
    summary:
      'The timetable portal for USAS students to manage, view, and export their class schedules.',
    highlights: [
      'Interactive schedule builder live at jadualkelas.zis3c.dev for university students',
      'Exports clean PDF timetables, QR attendance, and lockscreen wallpapers',
      'Conflict detection and course slot search across university faculties',
    ],
    tags: ['Web', 'Automation'],
    link: 'https://github.com/zis3c/USAS-Class-Timetable',
    demoLink: 'https://jadualkelas.zis3c.dev',
    demoLabel: 'jadualkelas.zis3c.dev',
  },
  {
    id: '12',
    name: 'LLM-API-Lab',
    year: '2025',
    role: 'Creator',
    icon: <FaBrain />,
    iconColor: '#10A37F',
    repoType: 'Multi-Provider LLM Playground',
    stack: [
      { name: 'OpenAI / LLM APIs', icon: <SiOpenai />, color: '#10A37F' },
      { name: 'HTML5', icon: <SiHtml5 />, color: '#E34F26' },
      { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E' },
    ],
    summary:
      'Lightweight static playground for testing LLM provider integrations. Multi-provider support with OpenAPI contract, browser dashboard, and zero build step.',
    highlights: [
      'Supports OpenAI, Anthropic, Mistral, and OpenRouter endpoints in one dashboard',
      'Includes OpenAPI specification contract and latency/token response inspector',
      'Zero build step static architecture for rapid API key and prompt testing',
    ],
    tags: ['Web', 'Research'],
    link: 'https://github.com/zis3c/LLM-API-Lab',
  },
  {
    id: '13',
    name: 'LilyGO-T-Dongle-S3-Firmware',
    year: '2025',
    role: 'Embedded Firmware Maintainer',
    icon: <FaMicrochip />,
    iconColor: '#00979D',
    repoType: 'ESP32-S3 Board Matrix & Validation',
    previewImage: '/assets/projects/lilygo-dongle-s3.png',
    stack: [
      { name: 'C', icon: <SiC />, color: '#A8B9CC' },
      { name: 'Arduino', icon: <SiArduino />, color: '#00979D' },
      { name: 'ESP32-S3', icon: <SiCplusplus />, color: '#00599C' },
    ],
    summary:
      'LilyGO T-Dongle-S3 firmware with board matrix, flash helper, smoke test, docs, and release validation.',
    highlights: [
      'Hardware board matrix configuration for ESP32-S3 T-Dongle variants',
      'Automated flash helper scripts and post-flash hardware smoke tests',
      'Release validation pipeline ensuring reliable firmware builds',
    ],
    tags: ['Security', 'Automation', 'Research'],
    link: 'https://github.com/zis3c/LilyGO-T-Dongle-S3-Firmware',
  },
  {
    id: '14',
    name: 'QRBot',
    year: '2025',
    role: 'Creator',
    icon: <FaQrcode />,
    iconColor: '#3B82F6',
    repoType: 'Telegram QR Generator & Scanner',
    previewImage: '/assets/projects/qrbot.png',
    stack: [
      { name: 'Python', icon: <SiPython />, color: '#3776AB' },
      { name: 'Docker', icon: <SiDocker />, color: '#2496ED' },
      { name: 'Telegram Bot', icon: <SiTelegram />, color: '#26A5E4' },
    ],
    summary:
      'A versatile Telegram bot for generating and scanning QR codes like Text, WiFi, vCard, Geo and Encoded.',
    highlights: [
      'Generates and decodes Text, Wi-Fi credentials, vCard contacts, and Geo QR codes',
      'Supports encoded payload inspection straight from Telegram chat photos',
      'Containerized with Docker for one-command cloud deployment',
    ],
    tags: ['Bot', 'Security', 'Automation'],
    link: 'https://github.com/zis3c/QRBot',
  },
  {
    id: '15',
    name: 'MLBB-CounterDraft',
    year: '2025',
    role: 'Creator & Full-Stack Developer',
    icon: <FaGamepad />,
    iconColor: '#F59E0B',
    repoType: 'Draft Recommendation Engine',
    previewImage: '/assets/projects/mlbb-counterdraft.png',
    stack: [
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
      { name: 'React', icon: <SiReact />, color: '#00D8FF' },
    ],
    summary:
      'Mobile Legends draft helper with live sync, hero catalog hygiene, and counter-pick scoring logic.',
    highlights: [
      'Real-time counter-pick recommendation engine with weighted synergy scoring',
      'Automated hero catalog data validation and role filtering',
      'Responsive draft simulator built with Next.js and TypeScript',
    ],
    tags: ['Web'],
    link: 'https://github.com/zis3c/MLBB-CounterDraft',
  },
  {
    id: '16',
    name: 'USAS-VC-Evaluation-Automator',
    year: '2025',
    role: 'Creator',
    icon: <FaCogs />,
    iconColor: '#F7DF1E',
    repoType: 'VirtualCampus Userscript Tool',
    stack: [
      { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E' },
      { name: 'DOM Automation', icon: <SiHtml5 />, color: '#E34F26' },
    ],
    summary:
      'A lightweight JavaScript automation tool and userscript designed to quickly fill out the Course Teaching Evaluation Form on the USAS VirtualCampus portal.',
    highlights: [
      'One-click completion for repetitive multi-page VirtualCampus evaluation forms',
      'Runs directly in the browser as a lightweight userscript with zero external deps',
      'Saves student time during end-of-semester course evaluations',
    ],
    tags: ['Automation', 'Web'],
    link: 'https://github.com/zis3c/USAS-VC-Evaluation-Automator',
  },
  {
    id: '17',
    name: 'basic-iot-cloud-setup',
    year: '2025',
    role: 'Infrastructure Author',
    icon: <FaServer />,
    iconColor: '#0080FF',
    repoType: 'IoT Cloud Infrastructure (KSC6493)',
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
      'Basic IoT cloud infrastructure for KSC6493. An automated lab setup featuring Traefik, Node-RED, Mosquitto (MQTT), and time-series data visualization on DigitalOcean.',
    highlights: [
      'Automated provisioning script deploying Traefik reverse proxy with TLS',
      'Integrates Eclipse Mosquitto MQTT broker with Node-RED flow automation',
      'Time-series sensor telemetry dashboard hosted on DigitalOcean',
    ],
    tags: ['Automation', 'Web'],
    link: 'https://github.com/zis3c/basic-iot-cloud-setup',
  },
  {
    id: '18',
    name: 'USAS-Launcher',
    year: '2025',
    role: 'Creator',
    icon: <FaWifi />,
    iconColor: '#10B981',
    repoType: 'Campus Wi-Fi & Portal Auto-Login',
    previewImage: '/assets/projects/usas-launcher.png',
    stack: [
      { name: 'Python', icon: <SiPython />, color: '#3776AB' },
      { name: 'Automation', icon: <SiGnubash />, color: '#4EAA25' },
    ],
    summary:
      'An automated tool that instantly connects to the USAS campus WiFi and logs into your student portals with one click.',
    highlights: [
      'Automates captive portal authentication on the campus Wi-Fi network',
      'One-click login launcher for student academic portals',
      'Cross-platform Python script designed for daily campus convenience',
    ],
    tags: ['Automation'],
    link: 'https://github.com/zis3c/USAS-Launcher',
  },
  {
    id: '19',
    name: 'Tgreactsort',
    year: '2025',
    role: 'Creator',
    icon: <FaChartBar />,
    iconColor: '#6366F1',
    repoType: 'Telegram Reaction Analytics',
    previewImage: '/assets/projects/tgreactsort.png',
    stack: [
      { name: 'Python', icon: <SiPython />, color: '#3776AB' },
      { name: 'Pandas', icon: <SiPandas />, color: '#150458' },
      { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E' },
      { name: 'Telegram', icon: <SiTelegram />, color: '#26A5E4' },
    ],
    summary:
      'Fetch, sort and visualize Telegram channel messages by reaction count using CLI and web dashboard.',
    highlights: [
      'Extracts and ranks Telegram channel posts by reaction engagement metrics',
      'Data processing pipeline powered by Python and Pandas',
      'Includes both a fast CLI sorter and an interactive browser chart dashboard',
    ],
    tags: ['Automation', 'Bot', 'Research'],
    link: 'https://github.com/zis3c/Tgreactsort',
  },
  {
    id: '20',
    name: 'Polyglot-File',
    year: '2025',
    role: 'Security Researcher',
    icon: <FaFileCode />,
    iconColor: '#A855F7',
    repoType: 'Multi-Format File Generator',
    stack: [
      { name: 'Python', icon: <SiPython />, color: '#3776AB' },
      { name: 'Linux', icon: <SiLinux />, color: '#EAB308' },
      { name: 'Binary Analysis', icon: <SiGnubash />, color: '#4EAA25' },
    ],
    summary:
      'A security tool to generate valid multi-format files (JPEG+PDF) for steganography and file parser research.',
    highlights: [
      'Constructs valid dual-signature JPEG+PDF and PNG+PDF polyglot binaries',
      'Tests magic-byte parser differentials across image viewers and PDF readers',
      'Used for file upload validation research and defensive filter testing',
    ],
    tags: ['Security', 'Research'],
    link: 'https://github.com/zis3c/Polyglot-File',
  },
  {
    id: '21',
    name: 'Compilation-and-RE-Process',
    year: '2025',
    role: 'RE Workshop Author',
    icon: <FaMicrochip />,
    iconColor: '#EC4899',
    repoType: 'Code-to-Binary & RE Visualizer',
    stack: [
      { name: 'Python', icon: <SiPython />, color: '#3776AB' },
      { name: 'C / Assembly', icon: <SiC />, color: '#A8B9CC' },
      { name: 'Reverse Eng', icon: <SiLinux />, color: '#EAB308' },
    ],
    summary:
      'Visualizing the lifecycle of code from source to binary and back again.',
    highlights: [
      'Interactive simulator showing preprocessing, compilation, assembly, and linking stages',
      'Demonstrates how C, Java, and Python map to machine instructions and decompiler output',
      'Created as a visual teaching aid for Dot Zero Reverse Engineering workshops',
    ],
    tags: ['Security', 'Research'],
    link: 'https://github.com/zis3c/Compilation-and-RE-Process',
  },
  {
    id: '22',
    name: 'CTF-Writeups',
    year: '2025',
    role: 'Author · Dot Zero (U545)',
    icon: <FaBookOpen />,
    iconColor: '#14B8A6',
    repoType: 'CTF Solutions & Security Notes',
    stack: [
      { name: 'Kali Linux', icon: <SiKalilinux />, color: '#367BF0' },
      { name: 'Python', icon: <SiPython />, color: '#3776AB' },
    ],
    summary:
      'Collection of CTF write-ups and solutions for learning and reference.',
    highlights: [
      'Step-by-step walkthroughs covering Reverse Engineering, Forensics, and Web challenges',
      'Includes solver scripts and binary analysis notes from university and international CTFs',
      'Maintained as an open learning resource for cybersecurity students',
    ],
    tags: ['Security', 'Research'],
    link: 'https://github.com/zis3c/CTF-Writeups',
  },
  {
    id: '23',
    name: 'RE-App-UMC-Student-USAS',
    year: '2025',
    role: 'Mobile Security Researcher',
    icon: <FaMobileAlt />,
    iconColor: '#3DDC84',
    repoType: 'Mobile App Security Review',
    statusLabel: 'Private Research',
    isPrivate: true,
    stack: [
      { name: 'Android Smali', icon: <SiAndroid />, color: '#3DDC84' },
      { name: 'Static Analysis', icon: <SiKalilinux />, color: '#367BF0' },
    ],
    summary:
      'Private Android mobile security research focusing on high-level Smali static analysis and mobile application hardening concepts.',
    highlights: [
      'High-level APK structure and Smali bytecode review in an isolated lab environment',
      'Focused on defensive mobile security patterns and OWASP Mobile Top 10 awareness',
      'Private repository: sensitive application internals and details are kept confidential',
    ],
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
  const [activeShowcaseIdx, setActiveShowcaseIdx] = useState(0);
  const [cardImageIdx, setCardImageIdx] = useState<Record<string, number>>({});
  const [repoStats, setRepoStats] = useState<Record<string, GithubRepoStat>>(
    {}
  );

  const filteredProjects = featuredProjects.filter((project) => {
    if (projectFilter === 'All') return true;
    return project.tags.includes(projectFilter);
  });

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

  const currentShowcase =
    showcaseSlides[activeShowcaseIdx] || showcaseSlides[0];

  return (
    <Styled.Wrapper themeMode={simpleTheme}>
      {/* Top Navigation Bar */}
      <Styled.Nav>
        <Styled.BrandGroup>
          <Styled.StatusLed title="Active Portfolio · Malaysia (UTC+8)" />
          <Styled.Brand>
            <span>Radzi (zis3c)</span>
            <span className="role-tag">
              MY · UTC+8 · Security &amp; Software
            </span>
          </Styled.Brand>
        </Styled.BrandGroup>

        <Styled.ChapterNav aria-label="Portfolio sections">
          <button type="button" onClick={() => jumpTo('simple-about')}>
            <span className="chap-num">01</span>Index
          </button>
          <button type="button" onClick={() => jumpTo('simple-showcase')}>
            <span className="chap-num">02</span>Showcase
          </button>
          <button type="button" onClick={() => jumpTo('simple-projects')}>
            <span className="chap-num">03</span>Work (23)
          </button>
          <button type="button" onClick={() => jumpTo('simple-journey')}>
            <span className="chap-num">04</span>Field Log
          </button>
          <button type="button" onClick={() => jumpTo('simple-skills')}>
            <span className="chap-num">05</span>Toolkit
          </button>
          <button type="button" onClick={() => jumpTo('simple-contact')}>
            <span className="chap-num">06</span>Connect
          </button>
        </Styled.ChapterNav>

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
        {/* Chapter 1: Introduction & Editorial Identity */}
        <Styled.HeroWorkbench id="simple-about">
          <Styled.HeroSection>
            <Styled.WindowChromeBar>
              <span>01 · Editorial Index &amp; Story</span>
              <span className="window-dots">
                <span className="win-dot" />
                <span className="win-dot" />
                <span className="win-dot" />
              </span>
            </Styled.WindowChromeBar>

            <Styled.HeroBody>
              <Styled.IdentityStrip>
                <Styled.AvatarThumb
                  src="/assets/avatars/memoji-zi.jpg"
                  alt="Radzi (zis3c) avatar"
                />
                <Styled.IdentityMeta>
                  <span className="id-name">Radzi (@zis3c)</span>
                  <span className="id-coords">
                    MALAYSIA (UTC+8) · DOT ZERO CTF (U545) · SECURITY &amp;
                    FULL-STACK
                  </span>
                </Styled.IdentityMeta>
              </Styled.IdentityStrip>

              <Styled.ChapterEyebrow>
                Chapter 01 · Who I Am
              </Styled.ChapterEyebrow>
              <Styled.HeroTitle>
                <GlitchText
                  words={[
                    'Hi, I am Radzi (zis3c).',
                    'Threat Detection Builder.',
                    'Binary Reverse Engineer.',
                    'Full-Stack Software Maker.',
                  ]}
                />
              </Styled.HeroTitle>

              <Styled.HeroRoleSub>
                Cybersecurity Researcher · Reverse Engineering Trainer ·
                Full-Stack Developer
              </Styled.HeroRoleSub>

              <Styled.HeroText>
                I am a Computer Science student and security researcher who
                learns best by taking systems apart and building defenses from
                the ground up. Whether I am deploying an SSH honeypot to observe
                how automated scanners behave in the wild, dissecting compiled
                binaries in Ghidra and x64dbg, or flashing custom C++ firmware
                onto an ESP32-S3 USB dongle, I enjoy working close to how
                software, packets, and hardware actually operate.
              </Styled.HeroText>

              <Styled.HeroText>
                Alongside security research, I build full-stack web platforms
                and Telegram automation bots that solve everyday problems for
                students and communities, while mentoring peers as Secretary and
                Reverse Engineering Trainer for our university CTF team, Dot
                Zero.
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
            </Styled.HeroBody>
          </Styled.HeroSection>

          <Styled.TelemetryPanel aria-label="Quick Snapshot">
            <Styled.WindowChromeBar>
              <span>Field Dossier</span>
              <span>zis3c</span>
            </Styled.WindowChromeBar>
            <Styled.TelemetryBody>
              <Styled.RegisterTable>
                <Styled.RegisterRow>
                  <dt>Handle</dt>
                  <dd>Radzi · zis3c</dd>
                </Styled.RegisterRow>
                <Styled.RegisterRow>
                  <dt>Discipline</dt>
                  <dd>Computer Science &amp; Information Technology</dd>
                </Styled.RegisterRow>
                <Styled.RegisterRow>
                  <dt>Core Focus</dt>
                  <dd>Threat Detection, Reverse Engineering &amp; Web</dd>
                </Styled.RegisterRow>
                <Styled.RegisterRow>
                  <dt>CTF Team</dt>
                  <dd>Dot Zero (U545) · Secretary &amp; RE Trainer</dd>
                </Styled.RegisterRow>
                <Styled.RegisterRow>
                  <dt>RE Workflow</dt>
                  <dd>Ghidra, IDA Pro, x64dbg, GDB+GEF &amp; Frida</dd>
                </Styled.RegisterRow>
                <Styled.RegisterRow>
                  <dt>Flagship Work</dt>
                  <dd>CloudSentinel Honeypot &amp; RedLilyGO ESP32-S3</dd>
                </Styled.RegisterRow>
                <Styled.RegisterRow>
                  <dt>Public &amp; Lab</dt>
                  <dd>23 Repositories (Live GitHub API Sync)</dd>
                </Styled.RegisterRow>
              </Styled.RegisterTable>
            </Styled.TelemetryBody>
          </Styled.TelemetryPanel>
        </Styled.HeroWorkbench>

        {/* Three Core Pillars */}
        <Styled.StorySection id="simple-craft">
          <Styled.PillarGrid>
            <Styled.PillarCard iconColor="#EF4444">
              <div className="pillar-icon">
                <FaShieldAlt />
              </div>
              <h3>01 · Threat Detection &amp; Purple Team</h3>
              <p>
                To defend a system effectively, you need visibility into how
                real attackers operate. I build cloud-native honeypots like
                CloudSentinel to capture live brute-force sessions, fingerprint
                clients using HASSH, map commands to MITRE ATT&amp;CK, and
                automate sub-second firewall containment.
              </p>
              <div className="pillar-tags">
                <span className="pillar-tag">SSH Honeypots</span>
                <span className="pillar-tag">HASSH &amp; MITRE ATT&amp;CK</span>
                <span className="pillar-tag">SOAR Auto-Blocking</span>
              </div>
            </Styled.PillarCard>

            <Styled.PillarCard iconColor="#8B5CF6">
              <div className="pillar-icon">
                <FiTerminal />
              </div>
              <h3>02 · Reverse Engineering &amp; Binary Triage</h3>
              <p>
                When source code is unavailable, the compiled binary tells the
                real story. I combine static decompilation (Ghidra, IDA Pro)
                with dynamic debugging and runtime instrumentation (x64dbg,
                GDB+GEF, Frida) to inspect ELF/PE/APK internals and lead
                hands-on workshops for the Dot Zero CTF team.
              </p>
              <div className="pillar-tags">
                <span className="pillar-tag">Ghidra &amp; IDA Pro</span>
                <span className="pillar-tag">x64dbg &amp; GDB+GEF</span>
                <span className="pillar-tag">Frida DBI</span>
              </div>
            </Styled.PillarCard>

            <Styled.PillarCard iconColor="#F97316">
              <div className="pillar-icon">
                <FaMicrochip />
              </div>
              <h3>03 · Full-Stack &amp; Hardware Firmware</h3>
              <p>
                I love turning ideas into complete, usable products. That ranges
                from C++ firmware on ESP32-S3 USB dongles (RedLilyGO) to Laravel
                + React WebRTC telehealth platforms (JanjiCare) and automated
                Telegram bots that simplify campus life for students.
              </p>
              <div className="pillar-tags">
                <span className="pillar-tag">Next.js &amp; React</span>
                <span className="pillar-tag">Laravel &amp; Python</span>
                <span className="pillar-tag">ESP32-S3 Firmware</span>
              </div>
            </Styled.PillarCard>
          </Styled.PillarGrid>
        </Styled.StorySection>

        <Styled.ChapterDivider>
          <span className="divider-left">
            CHAPTER 01 -&gt; 02 · BUILT FROM LINUX TERMINALS, PACKET CAPTURES
            &amp; HARDWARE INTERFACES
          </span>
          <span className="divider-right">VISUAL ARCHIVE · REAL BUILDS</span>
        </Styled.ChapterDivider>

        {/* Chapter 2: Interactive Visual Showcase Reel (Real Images from project io) */}
        <Styled.StorySection id="simple-showcase">
          <Styled.SectionHeader>
            <Styled.ChapterEyebrow>
              Chapter 02 · Visual Showcase
            </Styled.ChapterEyebrow>
            <Styled.SectionTitle>
              Inside the Interfaces, Firmware &amp; Platforms
            </Styled.SectionTitle>
            <Styled.SectionSubtitle>
              A visual walkthrough of real dashboards, hardware architectures,
              and student platforms built across my projects. Select any preview
              below to inspect the build.
            </Styled.SectionSubtitle>
          </Styled.SectionHeader>

          <Styled.ShowcaseStage>
            <Styled.WindowChromeBar>
              <span>
                Visual Preview · {currentShowcase.id} / 08 ·{' '}
                {currentShowcase.title}
              </span>
              <span>{currentShowcase.category}</span>
            </Styled.WindowChromeBar>

            <Styled.ShowcaseMainGrid>
              <Styled.ShowcaseViewport>
                <Styled.PreviewImg
                  src={currentShowcase.image}
                  alt={currentShowcase.title}
                />
              </Styled.ShowcaseViewport>

              <Styled.ShowcaseCaptionPanel>
                <div>
                  <span className="showcase-index">
                    EXHIBIT {currentShowcase.id} OF 08
                  </span>
                  <h3>{currentShowcase.title}</h3>
                  <span className="showcase-sub">
                    {currentShowcase.category}
                  </span>
                  <p>{currentShowcase.summary}</p>
                </div>

                <Styled.ProjectButtonGroup>
                  <Styled.ProjectOpenLink
                    href={currentShowcase.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub /> View Source
                  </Styled.ProjectOpenLink>
                  {currentShowcase.liveLink && (
                    <Styled.ProjectDemoLink
                      href={currentShowcase.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FiExternalLink />{' '}
                      {currentShowcase.liveLabel || 'Live Demo'}
                    </Styled.ProjectDemoLink>
                  )}
                </Styled.ProjectButtonGroup>
              </Styled.ShowcaseCaptionPanel>
            </Styled.ShowcaseMainGrid>

            <Styled.ShowcaseThumbRow aria-label="Visual showcase thumbnails">
              {showcaseSlides.map((slide, idx) => (
                <Styled.ShowcaseThumbBtn
                  key={slide.id}
                  type="button"
                  isActive={idx === activeShowcaseIdx}
                  onClick={() => setActiveShowcaseIdx(idx)}
                >
                  <Styled.PreviewImg src={slide.image} alt={slide.title} />
                  <span className="thumb-label">
                    {slide.id} · {slide.title.split(' · ')[0]}
                  </span>
                </Styled.ShowcaseThumbBtn>
              ))}
            </Styled.ShowcaseThumbRow>
          </Styled.ShowcaseStage>
        </Styled.StorySection>

        <Styled.ChapterDivider>
          <span className="divider-left">
            CHAPTER 02 -&gt; 03 · COMPLETE REPOSITORY INDEX (23 PROJECTS · LIVE
            GITHUB API)
          </span>
          <span className="divider-right">
            SECURITY · FIRMWARE · FULL-STACK · BOTS
          </span>
        </Styled.ChapterDivider>

        {/* Chapter 3: Featured Projects Directory (All 23 Repositories) */}
        <Styled.DirectoryFrame id="simple-projects">
          <Styled.DirectoryHeaderBar>
            <Styled.SectionHeader>
              <Styled.ChapterEyebrow>
                Chapter 03 · Selected Works &amp; Archive
              </Styled.ChapterEyebrow>
              <Styled.SectionTitle>
                Projects, Firmware &amp; Security Research
              </Styled.SectionTitle>
              <Styled.SectionSubtitle>
                All 23 repositories across defensive security, ESP32-S3
                hardware, full-stack web platforms, and Telegram automation.
                Stars and forks are fetched live from the GitHub API.
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
                const repoSlug =
                  project.link.split('/').pop()?.toLowerCase() || '';
                const liveStat = repoStats[repoSlug];
                const gallery = project.galleryImages;
                const activeSlideIdx = cardImageIdx[project.id] || 0;
                const activePreviewSrc =
                  gallery && gallery[activeSlideIdx]
                    ? gallery[activeSlideIdx].src
                    : project.previewImage;

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
                      <span className="chrome-left">
                        <span className="chrome-index">{project.id}</span>
                        <span>
                          {project.year} · {project.repoType}
                        </span>
                      </span>
                      <span className="slot-status">
                        {project.statusLabel ||
                          (isFlagship ? 'Featured FYP' : project.role)}
                      </span>
                    </Styled.ProjectCardChrome>

                    {activePreviewSrc && (
                      <Styled.ProjectPreviewFrame>
                        <Styled.PreviewImg
                          src={activePreviewSrc}
                          alt={`${project.name} preview`}
                          loading="lazy"
                        />
                        {gallery && gallery.length > 1 && (
                          <Styled.PreviewGalleryBar
                            onClick={(e) => e.stopPropagation()}
                          >
                            {gallery.map((imgItem, gIdx) => (
                              <button
                                key={imgItem.label}
                                type="button"
                                className={
                                  gIdx === activeSlideIdx ? 'active-slide' : ''
                                }
                                onClick={() =>
                                  setCardImageIdx((prev) => ({
                                    ...prev,
                                    [project.id]: gIdx,
                                  }))
                                }
                              >
                                {imgItem.label}
                              </button>
                            ))}
                          </Styled.PreviewGalleryBar>
                        )}
                      </Styled.ProjectPreviewFrame>
                    )}

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
                                  {project.isPrivate ? (
                                    <FaLock />
                                  ) : (
                                    <FaFolder />
                                  )}{' '}
                                  {project.tags.join(' · ')}
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

        <Styled.ChapterDivider>
          <span className="divider-left">
            CHAPTER 03 -&gt; 04 · FIELD LOGS, CTF COMPETITIONS &amp; TECHNICAL
            MENTORSHIP
          </span>
          <span className="divider-right">
            DOT ZERO (U545) · CERTIFICATIONS
          </span>
        </Styled.ChapterDivider>

        {/* Chapter 4: The Journey & CTF Recognition Ledger */}
        <Styled.StorySection id="simple-journey">
          <Styled.SectionHeader>
            <Styled.ChapterEyebrow>
              Chapter 04 · Experience &amp; Field Log
            </Styled.ChapterEyebrow>
            <Styled.SectionTitle>
              Journey, CTF Leadership &amp; Recognition
            </Styled.SectionTitle>
            <Styled.SectionSubtitle>
              How my path evolved from Linux and web development into threat
              detection, hardware firmware, and training peers in Reverse
              Engineering.
            </Styled.SectionSubtitle>
          </Styled.SectionHeader>

          <Styled.TimelineWrap>
            <Styled.TimelineItem>
              <span className="time-index">01</span>
              <div className="time-period">
                <span>2026 · Present</span>
                <span className="time-sub">Security Research &amp; FYP</span>
              </div>
              <div className="time-content">
                <h3 className="time-title">
                  CloudSentinel Honeypot &amp; RedLilyGO Hardware Firmware
                </h3>
                <p className="time-desc">
                  Architected CloudSentinel, an event-driven SSH honeypot with
                  active SOAR auto-blocking, ClickHouse analytics, and MITRE
                  ATT&amp;CK mapping, while developing custom ESP32-S3 security
                  assessment firmware and a .NET 8 companion app for RedLilyGO.
                </p>
              </div>
            </Styled.TimelineItem>

            <Styled.TimelineItem>
              <span className="time-index">02</span>
              <div className="time-period">
                <span>2025 - 2026</span>
                <span className="time-sub">Dot Zero CTF Team (U545)</span>
              </div>
              <div className="time-content">
                <h3 className="time-title">
                  Team Secretary &amp; Reverse Engineering Trainer
                </h3>
                <p className="time-desc">
                  Co-organized internal training sessions and hands-on binary
                  reverse engineering workshops (Ghidra, x64dbg, GDB+GEF,
                  Frida), built the CTF-Pipeline workspace automation tool, and
                  competed alongside Dot Zero in international CTFs.
                </p>
              </div>
            </Styled.TimelineItem>

            <Styled.TimelineItem>
              <span className="time-index">03</span>
              <div className="time-period">
                <span>2024 - 2026</span>
                <span className="time-sub">Campus &amp; Open-Source</span>
              </div>
              <div className="time-content">
                <h3 className="time-title">
                  Shipping Campus Platforms, Telehealth &amp; Developer Tools
                </h3>
                <p className="time-desc">
                  Built and launched web portals and automation tools used by
                  students and developers, including the STEM-USAS portal,
                  STEM-Telebot, USAS Class Timetable generator, Assignment
                  Notifier, JanjiCare WebRTC clinic platform, and the Codex
                  Notifier VS Code extension.
                </p>
              </div>
            </Styled.TimelineItem>

            <Styled.TimelineItem>
              <span className="time-index">04</span>
              <div className="time-period">
                <span>2021 - 2024</span>
                <span className="time-sub">Core Foundations</span>
              </div>
              <div className="time-content">
                <h3 className="time-title">
                  Linux Systems, Networking &amp; Software Engineering
                </h3>
                <p className="time-desc">
                  Built a strong foundation in Linux environments, computer
                  networking, relational databases, and full-stack programming,
                  sparking a lasting interest in how software can be both
                  engineered and secured.
                </p>
              </div>
            </Styled.TimelineItem>
          </Styled.TimelineWrap>

          <Styled.RecognitionGrid>
            <Styled.RecognitionCard>
              <div className="rec-top">
                <span>CTF COMPETITION · 2026</span>
                <span className="rec-badge">#21 / 316 Teams</span>
              </div>
              <h4>RE:UN10N CTF · Dot Zero (U545)</h4>
              <p>
                Placed 21st internationally with university CTF team Dot Zero,
                focusing on Reverse Engineering and binary analysis challenges.
              </p>
            </Styled.RecognitionCard>

            <Styled.RecognitionCard>
              <div className="rec-top">
                <span>INTERNATIONAL CTFS · 2026</span>
                <span className="rec-badge">Top 15% Finishes</span>
              </div>
              <h4>ApoorvCTF (#88) &amp; 0xFun CTF (#133)</h4>
              <p>
                Placed 88th of 620 teams in ApoorvCTF and 133rd of 975 teams in
                0xFun CTF alongside Dot Zero teammates.
              </p>
            </Styled.RecognitionCard>

            <Styled.RecognitionCard>
              <div className="rec-top">
                <span>CREDENTIALS &amp; TRAINING</span>
                <span className="rec-badge">Verified</span>
              </div>
              <h4>Google Cybersecurity &amp; RE Bootcamp</h4>
              <p>
                Completed the Google Cybersecurity Professional Certificate and
                hands-on Reverse Engineering binary analysis training.
              </p>
            </Styled.RecognitionCard>
          </Styled.RecognitionGrid>
        </Styled.StorySection>

        <Styled.ChapterDivider>
          <span className="divider-left">
            CHAPTER 04 -&gt; 05 · DISASSEMBLERS, DEBUGGERS, LANGUAGES &amp;
            CLOUD INFRASTRUCTURE
          </span>
          <span className="divider-right">30+ TOOLS ACROSS 4 DISCIPLINES</span>
        </Styled.ChapterDivider>

        {/* Chapter 5: Technical Skills & Tooling */}
        <Styled.ArsenalSection id="simple-skills">
          <Styled.SectionHeader>
            <Styled.ChapterEyebrow>
              Chapter 05 · Technical Toolkit
            </Styled.ChapterEyebrow>
            <Styled.SectionTitle>
              <FiCpu />
              <span>Tools, Languages &amp; Frameworks</span>
            </Styled.SectionTitle>
            <Styled.SectionSubtitle>
              The disassemblers, debuggers, languages, and infrastructure tools
              I use across my security research and development workflow.
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

        {/* Chapter 6: Connect */}
        <Styled.CommsTerminal id="simple-contact">
          <Styled.WindowChromeBar>
            <span>06 · Let&apos;s Connect</span>
            <span>zis3c · Malaysia (UTC+8)</span>
          </Styled.WindowChromeBar>
          <Styled.CommsBody>
            <Styled.CommsInfo>
              <h3>Want to Collaborate or Talk Security?</h3>
              <p>
                Always open to connecting with fellow security researchers, CTF
                players, and developers. Explore my latest repositories or reach
                out directly via GitHub and LinkedIn.
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

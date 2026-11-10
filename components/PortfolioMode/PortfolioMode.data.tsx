import React from 'react';
import { FcLinux } from 'react-icons/fc';
import {
  FaBell,
  FaBolt,
  FaBookOpen,
  FaCalendarAlt,
  FaChartBar,
  FaCheckCircle,
  FaCogs,
  FaDesktop,
  FaFileCode,
  FaFlag,
  FaGamepad,
  FaHospital,
  FaMicrochip,
  FaMobileAlt,
  FaQrcode,
  FaRobot,
  FaServer,
  FaShieldAlt,
  FaWifi,
} from 'react-icons/fa';
import {
  SiAndroid,
  SiArduino,
  SiC,
  SiCplusplus,
  SiDigitalocean,
  SiDocker,
  SiDotnet,
  SiEclipsemosquitto,
  SiGnubash,
  SiGoogle,
  SiHtml5,
  SiJavascript,
  SiKalilinux,
  SiLaravel,
  SiNextdotjs,
  SiNodered,
  SiOpenai,
  SiPandas,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiRedux,
  SiTailwindcss,
  SiTelegram,
  SiTypescript,
  SiVisualstudiocode,
  SiWebrtc,
  SiWireshark,
} from 'react-icons/si';

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
      { name: 'Linux', icon: <FcLinux />, color: 'inherit' },
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
    icon: <SiOpenai />,
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
      { name: 'Linux', icon: <FcLinux />, color: 'inherit' },
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
      { name: 'Linux', icon: <FcLinux />, color: 'inherit' },
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

export interface CtfCompetition {
  id: string;
  name: string;
  year: number;
  position: number;
  level: 'National' | 'International';
  type: 'Dot Zero' | 'Solo';
}

export const ctfCompetitions: CtfCompetition[] = [
  // National (Malaysia)
  {
    id: 'c-1',
    name: 'TAMiNG iCTFF8 UiTM',
    year: 2026,
    position: 4,
    level: 'National',
    type: 'Dot Zero',
  },
  {
    id: 'c-2',
    name: 'NERACA 3.0',
    year: 2025,
    position: 5,
    level: 'National',
    type: 'Dot Zero',
  },
  {
    id: 'c-3',
    name: '3108CTF: WARISAN TAKHTA 2026',
    year: 2026,
    position: 12,
    level: 'National',
    type: 'Solo',
  },
  {
    id: 'c-4',
    name: 'CURTIN CTF V3.0',
    year: 2025,
    position: 18,
    level: 'National',
    type: 'Dot Zero',
  },
  {
    id: 'c-5',
    name: 'RE:UN10N CTF',
    year: 2025,
    position: 21,
    level: 'National',
    type: 'Dot Zero',
  },

  // International (CTFtime)
  {
    id: 'c-6',
    name: 'BearcatCTF 2026 - Setting Sail',
    year: 2026,
    position: 39,
    level: 'International',
    type: 'Dot Zero',
  },
  {
    id: 'c-7',
    name: 'WATCHLIST',
    year: 2026,
    position: 57,
    level: 'International',
    type: 'Dot Zero',
  },
  {
    id: 'c-8',
    name: '0xL4ugh CTF v5',
    year: 2026,
    position: 80,
    level: 'International',
    type: 'Dot Zero',
  },
  {
    id: 'c-9',
    name: 'ApoorvCTF 2026',
    year: 2026,
    position: 88,
    level: 'International',
    type: 'Dot Zero',
  },
  {
    id: 'c-10',
    name: 'Kaspersky CTF 2026',
    year: 2026,
    position: 93,
    level: 'International',
    type: 'Solo',
  },
  {
    id: 'c-11',
    name: 'KnightCTF 2026',
    year: 2026,
    position: 100,
    level: 'International',
    type: 'Dot Zero',
  },
  {
    id: 'c-12',
    name: 'Midnight Flag CTF - EXECUTION',
    year: 2026,
    position: 107,
    level: 'International',
    type: 'Dot Zero',
  },
  {
    id: 'c-13',
    name: 'GPN CTF 2026',
    year: 2026,
    position: 124,
    level: 'International',
    type: 'Dot Zero',
  },
  {
    id: 'c-14',
    name: '0xFUN CTF 2026',
    year: 2026,
    position: 133,
    level: 'International',
    type: 'Dot Zero',
  },
  {
    id: 'c-15',
    name: 'UniVsThreats 26 Quals CTF',
    year: 2026,
    position: 141,
    level: 'International',
    type: 'Dot Zero',
  },
  {
    id: 'c-16',
    name: 'UTCTF 2026',
    year: 2026,
    position: 147,
    level: 'International',
    type: 'Dot Zero',
  },
  {
    id: 'c-17',
    name: 'L3akCTF 2026',
    year: 2026,
    position: 154,
    level: 'International',
    type: 'Dot Zero',
  },
  {
    id: 'c-18',
    name: 'SunshineCTF 2026',
    year: 2026,
    position: 155,
    level: 'International',
    type: 'Dot Zero',
  },
  {
    id: 'c-19',
    name: 'DiceCTF 2026 Quals',
    year: 2026,
    position: 164,
    level: 'International',
    type: 'Dot Zero',
  },
  {
    id: 'c-20',
    name: 'UMDCTF 2026',
    year: 2026,
    position: 190,
    level: 'International',
    type: 'Dot Zero',
  },
  {
    id: 'c-21',
    name: 'BITSCTF 2026',
    year: 2026,
    position: 203,
    level: 'International',
    type: 'Dot Zero',
  },
  {
    id: 'c-22',
    name: 'K17 CTF 2026',
    year: 2026,
    position: 217,
    level: 'International',
    type: 'Dot Zero',
  },
  {
    id: 'c-23',
    name: 'PascalCTF 2026',
    year: 2026,
    position: 222,
    level: 'International',
    type: 'Dot Zero',
  },
  {
    id: 'c-24',
    name: 'TAMUctf 2026',
    year: 2026,
    position: 249,
    level: 'International',
    type: 'Dot Zero',
  },
  {
    id: 'c-25',
    name: 'H7CTF 2026 Quals',
    year: 2026,
    position: 554,
    level: 'International',
    type: 'Dot Zero',
  },
];

export { featuredProjects, PROJECT_FILTERS };
export type {
  TechItem,
  FeaturedProject,
  GithubRepoStat,
  ProjectFilter,
  SimpleTheme,
};

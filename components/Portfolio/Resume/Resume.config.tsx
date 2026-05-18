export const keyTechSkills: { text: string; iconUrl: string }[] = [
  {
    text: 'Python',
    iconUrl: '/assets/portfolio/skills/javascript-original.svg',
  },
  {
    text: 'JavaScript',
    iconUrl: '/assets/portfolio/skills/javascript-original.svg',
  },
  {
    text: 'TypeScript',
    iconUrl: '/assets/portfolio/skills/typescript-original.svg',
  },
  {
    text: 'Penetration Testing',
    iconUrl: '/assets/portfolio/skills/linux-original.svg',
  },
  {
    text: 'Network Security',
    iconUrl: '/assets/portfolio/skills/linux-original.svg',
  },
  {
    text: 'React / Next.js',
    iconUrl: '/assets/portfolio/skills/react-original.svg',
  },
  {
    text: 'Docker',
    iconUrl: '/assets/portfolio/skills/linux-original.svg',
  },
  {
    text: 'Linux / Bash',
    iconUrl: '/assets/portfolio/skills/linux-original.svg',
  },
];

export const otherSkills: { text: string; iconUrl: string }[] = [
  {
    text: 'OWASP Top 10',
    iconUrl: '/assets/portfolio/skills/developer.png',
  },
  {
    text: 'Burp Suite',
    iconUrl: '/assets/portfolio/skills/developer.png',
  },
  {
    text: 'Nmap / Wireshark',
    iconUrl: '/assets/portfolio/skills/developer.png',
  },
  {
    text: 'Metasploit',
    iconUrl: '/assets/portfolio/skills/developer.png',
  },
  {
    text: 'SIEM / Log Analysis',
    iconUrl: '/assets/portfolio/skills/developer.png',
  },
  {
    text: 'GitHub / Git',
    iconUrl: '/assets/portfolio/skills/github-original.svg',
  },
  {
    text: 'FastAPI / Express',
    iconUrl: '/assets/portfolio/skills/express-original.svg',
  },
  {
    text: 'PostgreSQL / MongoDB',
    iconUrl: '/assets/portfolio/skills/developer.png',
  },
  {
    text: 'Telegram Bot Dev',
    iconUrl: '/assets/portfolio/skills/developer.png',
  },
  {
    text: 'Async I/O',
    iconUrl: '/assets/portfolio/skills/developer.png',
  },
  {
    text: 'CI/CD',
    iconUrl: '/assets/portfolio/skills/developer.png',
  },
  {
    text: 'Reverse Engineering',
    iconUrl: '/assets/portfolio/skills/developer.png',
  },
];

export const professionalExperience: IProfessionalExperience[] = [
  {
    variant: 'withResponsibilities',
    company: 'Cybersecurity Projects',
    companyImg: '/assets/portfolio/skills/linux-original.svg',
    role: 'Purple Team Operator / Security Researcher',
    shortSummary:
      'Active in both offensive and defensive security research. Builds custom security tools, participates in CTF competitions, and conducts penetration testing labs on platforms like HackTheBox and TryHackMe.',
    timeFrame: '2024-Present',
    responsibilities: [
      {
        text: 'Built Polyglot-File — multi-format file generator for security research',
        iconUrl: '/assets/portfolio/check.svg',
        url: 'https://github.com/zis3c/Polyglot-File',
      },
      {
        text: 'CTF competition write-ups and solutions repository',
        iconUrl: '/assets/portfolio/check.svg',
        url: 'https://github.com/zis3c/CTF-Writeups',
      },
      {
        text: 'Compilation & Reverse Engineering process visualization tool',
        iconUrl: '/assets/portfolio/check.svg',
        url: 'https://github.com/zis3c/Compilation-and-RE-Process',
      },
      {
        text: 'Google Forms stress-testing CLI for authorized security audits',
        iconUrl: '/assets/portfolio/check.svg',
        url: 'https://github.com/zis3c/Google-Form-Spammer',
      },
    ],
  },
  {
    variant: 'withResponsibilities',
    company: 'Application Projects',
    companyImg: '/assets/portfolio/skills/react-original.svg',
    role: 'Builder',
    shortSummary:
      'Builds practical apps from curiosity and hobby exploration with secure coding in mind. Focused on solving real problems and learning by shipping.',
    timeFrame: '2025-Present',
    responsibilities: [
      {
        text: 'FinVault — AI-powered crypto wallet simulator with Gemini fraud insights',
        iconUrl: '/assets/portfolio/check.svg',
        url: 'https://github.com/zis3c/Finvault',
      },
      {
        text: 'Certclaim — Certificate claim portal with admin dashboard and QR access',
        iconUrl: '/assets/portfolio/check.svg',
        url: 'https://github.com/zis3c/Certclaim',
      },
      {
        text: 'Interactive Kali Linux portfolio OS (this site)',
        iconUrl: '/assets/portfolio/check.svg',
      },
    ],
  },
  {
    variant: 'withResponsibilities',
    company: 'Automation & Bots',
    companyImg: '/assets/portfolio/skills/developer.png',
    role: 'Automation Developer',
    shortSummary:
      'Creates Telegram bots and automation tools for student organizations and productivity. Leverages async Python patterns and cloud APIs.',
    timeFrame: '2024-Present',
    responsibilities: [
      {
        text: 'STEM-Telebot — Student membership verification bot with Google Sheets integration',
        iconUrl: '/assets/portfolio/check.svg',
        url: 'https://github.com/zis3c/STEM-Telebot',
      },
      {
        text: 'QRBot — Multi-format QR code generator and scanner Telegram bot',
        iconUrl: '/assets/portfolio/check.svg',
        url: 'https://github.com/zis3c/QRBot',
      },
      {
        text: 'USAS-Launcher — Campus WiFi auto-login automation tool',
        iconUrl: '/assets/portfolio/check.svg',
        url: 'https://github.com/zis3c/USAS-Launcher',
      },
      {
        text: 'USAS-Assignment-Notifier — Deadline tracking with Telegram alerts',
        iconUrl: '/assets/portfolio/check.svg',
        url: 'https://github.com/zis3c/USAS-Assignment-Notifier',
      },
    ],
  },
];

export type IProfessionalExperience =
  | {
      variant: 'withResponsibilities';
      company: string;
      companyImg: string;
      role: string;
      timeFrame: string;
      shortSummary: string;
      responsibilities: { text: string; iconUrl: string; url?: string }[];
    }
  | {
      variant: 'simple';
      role: string;
      company: string;
      companyImg: string;
      timeFrame: string;
      shortSummary: string;
    };

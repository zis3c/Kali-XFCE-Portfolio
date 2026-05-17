import React from 'react';
import {
  SiDocker,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTypescript,
} from 'react-icons/si';
import { IHighlightedProject } from '../../../types/portfolio';

export const useHighlightedProjectsData = (): {
  highlightedProjects: IHighlightedProject[];
} => {
  const highlightedProjects: IHighlightedProject[] = [
    {
      slideNumberImg: '/assets/portfolio/1.svg',
      projectTitle: 'FinVault',
      projectDescription:
        'AI-powered crypto wallet simulator built with Next.js, PostgreSQL, and Gemini-assisted fraud insights. Features a modern dark dashboard with real-time portfolio tracking and transaction analysis.',
      slideHeight: '100vh',
      projectImg: '/assets/portfolio/orcl/orcl.png',
      projectMobileImg: '/assets/portfolio/orcl/oracle-cpq.webp',
      githubLink: 'https://github.com/zis3c/Finvault',
      projectTechnologies: [
        'Next.js',
        'TypeScript',
        'PostgreSQL',
        'Gemini API',
        'Tailwind CSS',
      ],

      slideBgColor: '#010606',
      technologyIcons: [
        <SiTypescript key={1} className={'tech-icon'} />,
        <SiNextdotjs key={2} className={'tech-icon'} />,
        <SiPostgresql key={3} className={'tech-icon'} />,
        <SiNodedotjs key={4} className={'tech-icon'} />,
      ],
    },
    {
      slideNumberImg: '/assets/portfolio/2.svg',
      projectTitle: 'Certclaim',
      projectDescription:
        'A secure certificate claim portal with admin dashboard, QR code access, attendance tracking, and Google Sheets integration. Built for event organizers to manage and distribute certificates.',
      slideHeight: '100vh',
      projectImg: '/assets/portfolio/orcl/orclcloud.png',
      projectMobileImg: '/assets/portfolio/orcl/cxcloud.webp',
      githubLink: 'https://github.com/zis3c/Certclaim',
      liveLink: 'https://cert-management-five.vercel.app',
      projectTechnologies: [
        'Next.js',
        'FastAPI',
        'PostgreSQL',
        'QR Code',
        'Google Sheets',
      ],

      slideBgColor: '#010606',
      technologyIcons: [
        <SiTypescript key={1} className={'tech-icon'} />,
        <SiNextdotjs key={2} className={'tech-icon'} />,
        <SiPython key={3} className={'tech-icon'} />,
        <SiPostgresql key={4} className={'tech-icon'} />,
      ],
    },
    {
      slideNumberImg: '/assets/portfolio/3.svg',
      projectTitle: 'STEM-Telebot',
      projectDescription:
        'A Telegram Bot to manage and verify student memberships using Google Sheets. Features async processing, membership card generation, and automated verification workflows.',
      slideHeight: '100vh',
      projectImg: '/assets/portfolio/projectOne/SneakerManiacs.png',
      projectMobileImg: '/assets/portfolio/projectOne/sneakerManiacsPhone.png',
      githubLink: 'https://github.com/zis3c/STEM-Telebot',
      projectTechnologies: [
        'Python',
        'Aiogram',
        'Google Sheets API',
        'Docker',
      ],

      slideBgColor: '#010606',
      technologyIcons: [
        <SiPython key={1} className={'tech-icon'} />,
        <SiDocker key={2} className={'tech-icon'} />,
        <SiJavascript key={3} className={'tech-icon'} />,
      ],
    },
    {
      slideNumberImg: '/assets/portfolio/4.svg',
      projectTitle: 'Polyglot-File & Security Tools',
      projectDescription:
        'A collection of cybersecurity research tools. Polyglot-File generates valid multi-format files (JPEG+PDF) for security research. Google-Form-Spammer is a high-performance async stress testing CLI. CTF-Writeups documents competition solutions.',
      slideHeight: '100vh',
      projectImg: '/assets/portfolio/projectTwo/vpsFullHd.png',
      projectMobileImg: '/assets/portfolio/projectTwo/vpsMobile.png',
      githubLink: 'https://github.com/zis3c/Polyglot-File',
      projectTechnologies: ['Python', 'Security', 'Steganography', 'CLI'],

      slideBgColor: '#4831d4',
      technologyIcons: [
        <SiPython key={1} className={'tech-icon'} />,
        <SiReact key={2} className={'tech-icon'} />,
        <SiNodedotjs key={3} className={'tech-icon'} />,
      ],
    },
  ];
  return {
    highlightedProjects,
  };
};

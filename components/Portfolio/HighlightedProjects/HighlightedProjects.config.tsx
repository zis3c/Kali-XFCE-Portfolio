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
        'Fintech-style wallet simulator built with Next.js, TypeScript, and PostgreSQL. Focused on transaction flows, balance modeling, and practical app-building from curiosity.',
      slideHeight: '100vh',
      projectImg: '/assets/portfolio/orcl/orcl.png',
      projectMobileImg: '/assets/portfolio/orcl/oracle-cpq.webp',
      githubLink: 'https://github.com/zis3c/Finvault',
      liveLink: 'https://me.zis3c.dev/',
      projectTechnologies: [
        'Next.js',
        'TypeScript',
        'PostgreSQL',
        'Prisma',
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
        'Certificate claim and verification portal with admin workflow. Designed for event operators to process submissions, validate records, and manage issuance.',
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
      projectTitle: 'STEM Telebot',
      projectDescription:
        'Bilingual Telegram membership automation bot using Google Sheets sync. Built with admin and superadmin controls for student organization operations.',
      slideHeight: '100vh',
      projectImg: '/assets/portfolio/projectOne/SneakerManiacs.png',
      projectMobileImg: '/assets/portfolio/projectOne/sneakerManiacsPhone.png',
      githubLink: 'https://github.com/zis3c/STEM-Telebot',
      liveLink: 'https://github.com/zis3c/STEM-Telebot',
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
      projectTitle: 'QRBot, Qrtendify & Polyglot Files',
      projectDescription:
        'Integrated security and automation project set: QRBot for QR generate/decode workflows, Qrtendify for attendance/session management, and Polyglot Files for multi-format file research.',
      slideHeight: '100vh',
      projectImg: '/assets/portfolio/projectTwo/vpsFullHd.png',
      projectMobileImg: '/assets/portfolio/projectTwo/vpsMobile.png',
      githubLink: 'https://github.com/zis3c/Polyglot-File',
      liveLink: 'https://github.com/zis3c/QRBot',
      projectTechnologies: ['Python', 'Django', 'Security Research', 'Telegram Bot API'],

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

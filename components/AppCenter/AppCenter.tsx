import React, { useEffect, useState } from 'react';
import * as Styled from './AppCenter.styles';
import Image from 'next/image';
import { useActions } from '../../hooks/useActions';
import {
  TerminalIcon,
  FileManagerIcon,
  UserIcon,
  FolderIcon,
  CodeIcon,
  MailIcon,
  SettingsIcon,
  StarIcon,
  SearchIcon,
  TextFileIcon,
  DesktopIcon,
  NetworkIcon,
} from '../icons/KaliIcons';
import Terminal from '../Apps/Terminal/Terminal';
import FileManager from '../Apps/FileManager/FileManager';
import TextViewer from '../Apps/TextViewer/TextViewer';
import GoogleSearch from '../Apps/GoogleSearch/GoogleSearch';
import { readFile } from '../../utils/filesystem';

interface MenuApp {
  id: number;
  name: string;
  icon: React.ReactNode;
  windowIcon: string;
  category: string[];
  action: () => void;
}

const AppCenter = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('Favorites');
  const [activeAppIndex, setActiveAppIndex] = useState<number>(0);
  const { openWindow, toggleAppCenterModal } = useActions();

  const iconColor = 'rgba(180,185,190,0.7)';

  const categories = [
    { name: 'Favorites', icon: <StarIcon size={12} color={iconColor} /> },
    { name: 'Recently Used', icon: <FolderIcon size={12} color={iconColor} /> },
    { name: 'Development', icon: <CodeIcon size={12} color={iconColor} /> },
    { name: 'Internet', icon: <NetworkIcon size={12} color={iconColor} /> },
    { name: 'System', icon: <SettingsIcon size={12} color={iconColor} /> },
    { name: 'Settings', icon: <DesktopIcon size={12} color={iconColor} /> },
    { name: 'Security', icon: <UserIcon size={12} color={iconColor} /> },
  ];

  const openApp = (
    name: string,
    content: React.ReactNode,
    windowIcon: string
  ) => {
    openWindow({
      windowName: name,
      isOpen: true,
      windowIcon,
      size: {
        width: 0.55 * (typeof window !== 'undefined' ? window.innerWidth : 700),
        height: 0.6 * (typeof window !== 'undefined' ? window.innerHeight : 500),
      },
      windowContent: content,
    });
    toggleAppCenterModal();
  };

  const menuApps: MenuApp[] = [
    {
      id: 1,
      name: 'Terminal Emulator',
      icon: <TerminalIcon size={16} color={iconColor} />,
      windowIcon: 'KALI_TERMINAL',
      category: ['Favorites', 'System', 'Recently Used'],
      action: () =>
        openApp('Terminal - zis3c@kali:~', <Terminal />, 'KALI_TERMINAL'),
    },
    {
      id: 2,
      name: 'Thunar File Manager',
      icon: <FileManagerIcon size={16} color={iconColor} />,
      windowIcon: 'KALI_FILEMANAGER',
      category: ['Favorites', 'System', 'Recently Used'],
      action: () =>
        openApp(
          'File Manager - /home/zis3c',
          <FileManager />,
          'KALI_FILEMANAGER'
        ),
    },
    {
      id: 3,
      name: 'Mousepad',
      icon: <TextFileIcon size={16} color={iconColor} />,
      windowIcon: 'KALI_TEXTFILE',
      category: ['Favorites', 'Development'],
      action: () => {
        const aboutContent = readFile('/home/zis3c/about.txt') || '';
        openApp(
          'about.txt - Mousepad',
          <TextViewer
            content={aboutContent}
            filename="about.txt"
            filepath="/home/zis3c/about.txt"
          />,
          'KALI_TEXTFILE'
        );
      },
    },
    {
      id: 4,
      name: 'Google Chrome',
      icon: (
        <Image
          src="/assets/icons/startmenu/chrome.svg"
          alt="Chrome"
          width={16}
          height={16}
        />
      ),
      windowIcon: '/assets/icons/startmenu/chrome.svg',
      category: ['Favorites', 'Internet'],
      action: () =>
        openApp(
          'Google Chrome',
          <GoogleSearch />,
          '/assets/icons/startmenu/chrome.svg'
        ),
    },
    {
      id: 5,
      name: 'Projects',
      icon: <FolderIcon size={16} color={iconColor} />,
      windowIcon: 'KALI_FOLDER',
      category: ['Favorites', 'Development', 'Recently Used'],
      action: () =>
        openApp(
          'File Manager - ~/Projects',
          <FileManager startPath="/home/zis3c/Projects" />,
          'KALI_FOLDER'
        ),
    },
    {
      id: 6,
      name: 'Skills',
      icon: <CodeIcon size={16} color={iconColor} />,
      windowIcon: 'KALI_TEXTFILE',
      category: ['Development'],
      action: () => {
        const skillsContent = readFile('/home/zis3c/skills.txt') || '';
        openApp(
          'skills.txt - Mousepad',
          <TextViewer
            content={skillsContent}
            filename="skills.txt"
            filepath="/home/zis3c/skills.txt"
          />,
          'KALI_TEXTFILE'
        );
      },
    },
    {
      id: 7,
      name: 'Contact',
      icon: <MailIcon size={16} color={iconColor} />,
      windowIcon: 'KALI_TEXTFILE',
      category: ['Favorites'],
      action: () => {
        const contactContent = readFile('/home/zis3c/contact.txt') || '';
        openApp(
          'contact.txt - Mousepad',
          <TextViewer
            content={contactContent}
            filename="contact.txt"
            filepath="/home/zis3c/contact.txt"
          />,
          'KALI_TEXTFILE'
        );
      },
    },
    {
      id: 8,
      name: 'Settings Manager',
      icon: <SettingsIcon size={16} color={iconColor} />,
      windowIcon: 'KALI_SETTINGS',
      category: ['System', 'Settings'],
      action: () => {
        return;
      },
    },
  ];

  const filteredApps = menuApps.filter((app) => {
    const matchesCategory = app.category.includes(activeCategory);
    const matchesSearch = searchTerm
      ? app.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    setActiveAppIndex(0);
  }, [searchTerm, activeCategory]);

  const handleSearchNavigation = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!filteredApps.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveAppIndex((prev) => (prev + 1) % filteredApps.length);
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveAppIndex(
        (prev) => (prev - 1 + filteredApps.length) % filteredApps.length
      );
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      filteredApps[activeAppIndex].action();
    }
  };

  return (
    <Styled.Container>
      <Styled.SearchBarWrapper>
        <Styled.SearchIconWrapper>
          <SearchIcon size={12} color="rgba(130,140,150,0.5)" />
        </Styled.SearchIconWrapper>
        <Styled.SearchInput
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearchNavigation}
          autoFocus
        />
      </Styled.SearchBarWrapper>

      <Styled.MenuBody>
        <Styled.CategorySidebar>
          {categories.map((cat) => (
            <Styled.CategoryItem
              key={cat.name}
              isActive={activeCategory === cat.name}
              onClick={() => setActiveCategory(cat.name)}
            >
              {cat.icon}
              <span>{cat.name}</span>
            </Styled.CategoryItem>
          ))}
        </Styled.CategorySidebar>

        <Styled.AppList>
          {filteredApps.map((app, index) => (
            <Styled.AppItem
              key={app.id}
              onClick={app.action}
              isActive={index === activeAppIndex}
            >
              <Styled.AppIcon>{app.icon}</Styled.AppIcon>
              <Styled.AppName>{app.name}</Styled.AppName>
            </Styled.AppItem>
          ))}
          {filteredApps.length === 0 && (
            <Styled.NoResults>No applications found</Styled.NoResults>
          )}
        </Styled.AppList>
      </Styled.MenuBody>

      <Styled.MenuFooter>
        <Styled.FooterUser>zis3c</Styled.FooterUser>
      </Styled.MenuFooter>
    </Styled.Container>
  );
};
export default AppCenter;

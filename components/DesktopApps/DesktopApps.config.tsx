import React from 'react';
import { IDesktopApp } from '../../types/ui/desktop-app';
import Terminal from '../Apps/Terminal/Terminal';
import FileManager from '../Apps/FileManager/FileManager';
import TextViewer from '../Apps/TextViewer/TextViewer';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { readFile } from '../../utils/filesystem';

export const useDesktopApps = (): {
  sortedAlphabetically: IDesktopApp[];
  sortedByDate: IDesktopApp[];
  sortedBySize: IDesktopApp[];
  appsInTrashBin: IDesktopApp[];
} => {
  const { removedApps, compressedApps } = useTypedSelector((state) => state.ui);

  // Read file content from the simulated filesystem
  const aboutContent = readFile('/home/zis3c/about.txt') || '';
  const contactContent = readFile('/home/zis3c/contact.txt') || '';

  return React.useMemo(() => {
    const initialDesktopAppsList: IDesktopApp[] = [
      {
        id: 1,
        text: 'Home',
        willOpenWindowWith: <FileManager />,
        variant: 'desktop',
        iconSrc: '/assets/icons/Desktop/user-folder.png',
        iconSize: { width: 32, height: 32 },
        action: null,
      },
      {
        id: 2,
        text: 'Terminal',
        willOpenWindowWith: <Terminal />,
        variant: 'desktop',
        iconSrc: '/assets/icons/taskbar/bash.png',
        iconSize: { width: 32, height: 32 },
        action: null,
      },
      {
        id: 3,
        text: 'about.txt',
        willOpenWindowWith: (
          <TextViewer
            content={aboutContent}
            filename="about.txt"
            filepath="/home/zis3c/about.txt"
          />
        ),
        variant: 'desktop',
        iconSrc: '/assets/icons/Desktop/comments.png',
        iconSize: { width: 32, height: 32 },
        action: null,
      },
      {
        id: 4,
        text: 'projects',
        willOpenWindowWith: <FileManager startPath="/home/zis3c/Projects" />,
        variant: 'desktop',
        iconSrc: '/assets/icons/Desktop/user-folder.png',
        iconSize: { width: 32, height: 32 },
        action: null,
      },
      {
        id: 5,
        text: 'contact.txt',
        willOpenWindowWith: (
          <TextViewer
            content={contactContent}
            filename="contact.txt"
            filepath="/home/zis3c/contact.txt"
          />
        ),
        variant: 'desktop',
        iconSrc: '/assets/icons/Desktop/comment.png',
        iconSize: { width: 32, height: 32 },
        action: null,
      },
      {
        id: 6,
        text: 'Trash',
        willOpenWindowWith: (
          <FileManager startPath="/home/zis3c/.local/share/Trash" />
        ),
        variant: 'desktop',
        iconSrc: '/assets/icons/Desktop/recycle-bin-empty.png',
        iconSize: { width: 32, height: 32 },
        action: null,
      },
    ];

    const compressedAppsList = [...initialDesktopAppsList]
      .filter((app) => compressedApps.includes(app.text))
      .map((compressedApp) => ({
        ...compressedApp,
        text: compressedApp.text + '.tar.gz',
        iconSrc: '/assets/icons/Desktop/zip.png',
        willOpenWindowWith: null,
        action: null,
        id: compressedApp.id + 777,
      }));

    const desktopAppsList = [
      ...initialDesktopAppsList,
      ...compressedAppsList,
    ].filter((app) => !removedApps.includes(app.text));

    const appsInTrashBin = [...initialDesktopAppsList].filter((app) =>
      removedApps.includes(app.text)
    );

    const sortedAlphabetically = [...desktopAppsList].sort((a, b) =>
      a.text.toLowerCase().localeCompare(b.text.toLowerCase())
    );
    const sortedBySize = [...desktopAppsList];
    const sortedByDate = [...desktopAppsList].sort((a, b) => b.id - a.id);

    return {
      sortedAlphabetically,
      sortedByDate,
      sortedBySize,
      appsInTrashBin,
    };
  }, [aboutContent, compressedApps, contactContent, removedApps]);
};

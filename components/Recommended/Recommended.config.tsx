import React, { ReactNode } from 'react';
import Terminal from '../Apps/Terminal/Terminal';
import FileManager from '../Apps/FileManager/FileManager';
import TextViewer from '../Apps/TextViewer/TextViewer';
import { readFile } from '../../utils/filesystem';

/**
 * Custom hook that returns prepared recommended apps config
 *@function useRecommendedConfig
 *@returns {IRecommendedFile[]} recommendedFiles - objects to be mapped into list of recommended files and apps
 */
export const useRecommendedConfig = (): {
  recommendedFiles: IRecommendedFile[];
} => {
  const aboutContent = readFile('/home/zis3c/about.txt') || '';

  const recommendedFiles: IRecommendedFile[] = [
    {
      id: 1,
      fileName: 'LinkedIn',
      details: 'Connect on Linkedin',
      icon: '/assets/icons/recommended/linkedin.svg',
      action: () => window.open('https://www.linkedin.com/in/radzizamri/', '_blank'),
      iconSize: { height: 44, width: 44 },
      willOpenWindowWith: null,
    },
    {
      id: 2,
      fileName: 'about.txt',
      details: 'Personal info',
      icon: '/assets/icons/recommended/word.png',
      action: null,
      iconSize: { height: 40, width: 40 },
      willOpenWindowWith: <TextViewer content={aboutContent} filename="about.txt" />,
    },
    {
      id: 3,
      fileName: 'Projects',
      details: 'GitHub repositories',
      icon: '/assets/icons/recommended/power-point.png',
      action: null,
      iconSize: { height: 40, width: 40 },
      willOpenWindowWith: <FileManager startPath="/home/zis3c/Projects" />,
    },
    {
      id: 4,
      fileName: 'Instagram',
      details: 'Connect on Instagram',
      icon: '/assets/icons/recommended/twitter.svg',
      action: () => window.open('https://www.instagram.com/radz.z_/', '_blank'),
      iconSize: { height: 40, width: 40 },
      willOpenWindowWith: null,
    },
    {
      id: 5,
      fileName: 'Terminal',
      details: 'Recently added',
      icon: '/assets/icons/recommended/terminal.png',
      action: null,
      iconSize: { height: 38, width: 38 },
      willOpenWindowWith: <Terminal />,
    },
  ];

  return {
    recommendedFiles,
  };
};

interface IRecommendedFile {
  id: number;
  fileName: string;
  details: string;
  icon: string;
  action: (() => void) | null;
  iconSize: { height: number; width: number };
  willOpenWindowWith: null | ReactNode;
}

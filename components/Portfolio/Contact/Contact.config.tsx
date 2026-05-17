import React, { ReactNode } from 'react';
import { FiGithub, FiInstagram, FiLinkedin } from 'react-icons/fi';

/**
 * Custom hook to get contact info data
 *@function useContactConfig
 *@returns {IMyContact[]} myContacts - the hook returns array of social contacts with id, icon, text and href of social platform
 */
export const useContactConfig = (): { myContacts: IMyContact[] } => {
  const myContacts: IMyContact[] = [
    {
      id: 1,
      icon: <FiGithub className={'contact-icon'} />,
      text: 'GitHub',
      href: 'https://github.com/zis3c',
    },
    {
      id: 2,
      icon: <FiLinkedin className={'contact-icon'} />,
      text: 'LinkedIn',
      href: 'https://www.linkedin.com/in/radzizamri/',
    },
    {
      id: 3,
      icon: <FiInstagram className={'contact-icon'} />,
      text: 'Instagram',
      href: 'https://www.instagram.com/radz.z_/',
    },
  ];

  return { myContacts };
};

export interface IMyContact {
  id: number;
  icon: ReactNode;
  text: string;
  href: string;
}

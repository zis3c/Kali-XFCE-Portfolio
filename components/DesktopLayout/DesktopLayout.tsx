import React, { FC } from 'react';
import * as Styled from './DesktopLayout.styles';
import Head from 'next/head';
import SystemTray from '../SystemTray/SystemTray';
import OpenedWindows from '../OpenedWindows/OpenedWindows';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import NotificationDaemon from '../NotificationDaemon/NotificationDaemon';

export interface Props {
  title: string;
  entranceAnimationDelay: number;
}

/**
 *Renders wrapper for Kali Linux Xfce desktop with top panel
 *@function DesktopLayout
 *@param {string} title - title to be added to meta description
 *@param {ReactNode} children - content of layout
 *@returns {JSX.Element} - Rendered DesktopLayout component
 */
const DesktopLayout: FC<Props> = ({
  children,
  title,
  entranceAnimationDelay,
}): JSX.Element => {
  const { isInNightLightMode, screenBrightness } = useTypedSelector(
    (state) => state.ui
  );

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#0e0e1a" />
        <title>Radzi Zamri</title>
        <meta
          name="description"
          content="zis3c Portfolio — Kali Linux Xfce Desktop Experience"
        />
      </Head>
      <Styled.Container
        isInNightLightMode={isInNightLightMode}
        screenBrightness={screenBrightness}
        animationDelay={entranceAnimationDelay}
      >
        {/* Xfce Panel at top */}
        <SystemTray />
        {/* Desktop content below panel */}
        {children}
        {/* Opened windows rendered on top */}
        <OpenedWindows />
        <NotificationDaemon />
      </Styled.Container>
    </>
  );
};

export default DesktopLayout;

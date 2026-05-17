import React, { useEffect, useState, useRef } from 'react';
import * as Styled from './Loader.styles';

export interface Props {
  isOnScreen: boolean;
  loadingDuration: number;
  onBootComplete: () => void;
}

/**
 *Renders realistic Linux boot sequence
 *@function Loader
 */
const Loader = ({
  isOnScreen,
  loadingDuration,
  onBootComplete,
}: Props): JSX.Element => {
  const [bootLines, setBootLines] = useState<string[]>([]);
  const bootRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const bootSequence = [
    '[0.000000] Linux version 6.8.11-amd64',
    '[0.018392] Command line: BOOT_IMAGE=/boot/vmlinuz root=/dev/sda1 quiet',
    '[  OK  ] Started Load Kernel Modules.',
    '[  OK  ] Mounted /home.',
    '[  OK  ] Started udev Kernel Device Manager.',
    '[  OK  ] Started Network Manager.',
    '[  OK  ] Started Accounts Service.',
    '[  OK  ] Started D-Bus System Message Bus.',
    '[  OK  ] Started Light Display Manager.',
    '[  OK  ] Reached target Graphical Interface.',
    'Starting Kali GNU/Linux...',
    'Initializing xfce4-session...',
    'Loading profile: zis3c',
    'Starting display manager...'
  ];

  useEffect(() => {
    if (!isOnScreen) return;

    const handleSkip = (e: KeyboardEvent | MouseEvent) => {
      if (e.type === 'keydown' && (e as KeyboardEvent).key !== 'Enter') return;
      onBootComplete();
    };
    window.addEventListener('keydown', handleSkip);
    window.addEventListener('click', handleSkip);

    const lineDelay = (loadingDuration - 400) / bootSequence.length;
    const timeouts: NodeJS.Timeout[] = [];

    bootSequence.forEach((line, index) => {
      const t = setTimeout(() => {
        setBootLines((prev) => [...prev, line]);
        if (bootRef.current) {
          bootRef.current.scrollTop = bootRef.current.scrollHeight;
        }
      }, index * lineDelay);
      timeouts.push(t);
    });

    const finishT = setTimeout(() => {
      onBootComplete();
    }, loadingDuration);
    timeouts.push(finishT);

    return () => {
      window.removeEventListener('keydown', handleSkip);
      window.removeEventListener('click', handleSkip);
      timeouts.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnScreen]);

  if (!isOnScreen) return <></>;

  return (
    <Styled.Container>
      <Styled.BootScreen ref={bootRef}>
        {bootLines.map((line, index) => {
          if (line.startsWith('[  OK  ]')) {
            const rest = line.slice(8);
            return (
              <Styled.BootLine key={index}>
                [  <Styled.OkToken>OK</Styled.OkToken>  ]{rest}
              </Styled.BootLine>
            );
          }
          return <Styled.BootLine key={index}>{line}</Styled.BootLine>;
        })}
      </Styled.BootScreen>
    </Styled.Container>
  );
};

export default Loader;

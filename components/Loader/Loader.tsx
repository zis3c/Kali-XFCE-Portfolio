import React, { useEffect, useState, useRef } from 'react';
import * as Styled from './Loader.styles';

const BOOT_SEQUENCE = [
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
  'Starting display manager...',
];

interface Props {
  isOnScreen: boolean;
  loadingDuration: number;
  onBootComplete: () => void;
}

/**
 * Renders realistic Linux boot sequence with a modern loading spinner UI
 * @function Loader
 */
const Loader = ({
  isOnScreen,
  loadingDuration,
  onBootComplete,
}: Props): JSX.Element => {
  const [bootLines, setBootLines] = useState<string[]>([]);
  const bootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOnScreen) return;

    const handleSkip = (e: KeyboardEvent | MouseEvent) => {
      if (e.type === 'keydown' && (e as KeyboardEvent).key !== 'Enter') return;
      onBootComplete();
    };
    window.addEventListener('keydown', handleSkip);
    window.addEventListener('click', handleSkip);

    const lineDelay = (loadingDuration - 400) / BOOT_SEQUENCE.length;
    const timeouts: NodeJS.Timeout[] = [];

    BOOT_SEQUENCE.forEach((line, index) => {
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
  }, [isOnScreen, loadingDuration, onBootComplete]);

  if (!isOnScreen) return <></>;

  return (
    <Styled.Container>
      <Styled.LoaderCard>
        <Styled.SpinnerRow>
          <Styled.SpinnerRing aria-hidden="true" />
          <Styled.SpinnerMeta>
            <h2>Starting Kali Linux XFCE Desktop...</h2>
            <p>Initializing system services · Press Enter or click to skip</p>
          </Styled.SpinnerMeta>
        </Styled.SpinnerRow>
        <Styled.ProgressTrack />
        <Styled.BootScreen ref={bootRef}>
          {bootLines.map((line, index) => {
            if (line.startsWith('[  OK  ]')) {
              const rest = line.slice(8);
              return (
                <Styled.BootLine key={index}>
                  [ <Styled.OkToken>OK</Styled.OkToken> ]{rest}
                </Styled.BootLine>
              );
            }
            return <Styled.BootLine key={index}>{line}</Styled.BootLine>;
          })}
        </Styled.BootScreen>
      </Styled.LoaderCard>
    </Styled.Container>
  );
};

export default Loader;

import type { NextPage } from 'next';
import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Desktop from '../components/Desktop/Desktop';
import DesktopLayout from '../components/DesktopLayout/DesktopLayout';
import { wrapper } from '../store';
import { loadLatestNews } from '../store/action-creators/news-action-creators';
import Loader from '../components/Loader/Loader';
import LoginScreen from '../components/LoginScreen/LoginScreen';
import { SESSION_ACTION_EVENT, SessionAction } from '../utils/session-actions';
import BootChooser from '../components/BootChooser/BootChooser';
import PortfolioMode from '../components/PortfolioMode/PortfolioMode';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ServerProps {
  title: string;
}

type AppPhase = 'boot' | 'login' | 'desktop';
type ExperienceMode = 'chooser' | 'kali' | 'portfolio';

/* ------------------------------------------------------------------ */
/*  Home                                                               */
/* ------------------------------------------------------------------ */

const Home: NextPage<ServerProps> = ({ title }) => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState<ExperienceMode>('chooser');
  const [phase, setPhase] = useState<AppPhase>('boot');
  const [bootCycle, setBootCycle] = useState(0);
  const [selectedBootIndex, setSelectedBootIndex] = useState(0);
  const [bootHint, setBootHint] = useState('Use up/down and Enter to choose.');

  useEffect(() => {
    void dispatch(loadLatestNews());
  }, [dispatch]);

  const handleBootComplete = useCallback(() => {
    setPhase('login');
  }, []);

  const handleLoginComplete = useCallback(() => {
    setPhase('desktop');
  }, []);

  /* ---- Session actions (lock / logout / restart) ---- */

  useEffect(() => {
    const onSessionAction = (event: Event) => {
      if (mode !== 'kali') return;
      const action = (event as CustomEvent<SessionAction>).detail;

      if (action === 'lock' || action === 'logout') {
        setPhase('login');
      }

      if (action === 'restart') {
        setBootCycle((prev) => prev + 1);
        setMode('chooser');
        setPhase('boot');
      }
    };

    window.addEventListener(
      SESSION_ACTION_EVENT,
      onSessionAction as EventListener
    );
    return () =>
      window.removeEventListener(
        SESSION_ACTION_EVENT,
        onSessionAction as EventListener
      );
  }, [mode]);

  /* ---- Boot menu keyboard navigation ---- */

  useEffect(() => {
    if (mode !== 'chooser') return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedBootIndex((prev) => (prev - 1 + 2) % 2);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedBootIndex((prev) => (prev + 1) % 2);
      }
      if (e.key === 'F2') {
        e.preventDefault();
        setBootHint('F2: BIOS setup is protected in this demo.');
      }
      if (e.key === 'F8') {
        e.preventDefault();
        setBootHint('F8: Advanced boot options opened (simulated).');
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mode]);

  /* ---- Handlers passed to BootChooser ---- */

  const handleSelectBootIndex = (index: number) => setSelectedBootIndex(index);

  const handleLaunchPortfolio = () => setMode('portfolio');

  const handleLaunchKali = () => {
    setMode('kali');
    setPhase('boot');
    setBootCycle((prev) => prev + 1);
  };

  /* ---- Return to chooser from portfolio ---- */

  const handleBackToChooser = () => {
    setMode('chooser');
    setBootHint('Use up/down and Enter to choose.');
  };

  /* ---- Render ---- */

  return (
    <>
      {mode === 'chooser' && (
        <BootChooser
          bootHint={bootHint}
          selectedBootIndex={selectedBootIndex}
          onSelectBootIndex={handleSelectBootIndex}
          onLaunchPortfolio={handleLaunchPortfolio}
          onLaunchKali={handleLaunchKali}
        />
      )}

      {mode === 'kali' && (
        <ErrorBoundary>
          <Loader
            key={`boot-${bootCycle}`}
            isOnScreen={phase === 'boot'}
            loadingDuration={3200}
            onBootComplete={handleBootComplete}
          />
          <LoginScreen
            isVisible={phase === 'login'}
            onLoginComplete={handleLoginComplete}
          />
          {phase === 'desktop' && (
            <DesktopLayout title={title} entranceAnimationDelay={0}>
              <Desktop />
            </DesktopLayout>
          )}
        </ErrorBoundary>
      )}

      {mode === 'portfolio' && (
        <PortfolioMode onBackToChooser={handleBackToChooser} />
      )}
    </>
  );
};

/* ------------------------------------------------------------------ */
/*  Data fetching                                                      */
/* ------------------------------------------------------------------ */

export const getStaticProps = wrapper.getStaticProps(() => async () => ({
  props: {
    title: 'zis3c@kali',
  },
  revalidate: 3600,
}));

export default Home;

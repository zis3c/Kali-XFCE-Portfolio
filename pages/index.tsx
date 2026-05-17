import type { GetStaticProps, NextPage } from 'next';
import React, { useState, useCallback, useEffect } from 'react';
import Desktop from '../components/Desktop/Desktop';
import DesktopLayout from '../components/DesktopLayout/DesktopLayout';
import { wrapper } from '../store';
import { loadLatestNews } from '../store/action-creators/news-action-creators';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Loader from '../components/Loader/Loader';
import LoginScreen from '../components/LoginScreen/LoginScreen';
import { SESSION_ACTION_EVENT, SessionAction } from '../utils/session-actions';

interface ServerProps {
  title: string;
}

type AppPhase = 'boot' | 'login' | 'desktop';

/**
 * Startup flow: Boot terminal → LightDM login → Xfce desktop
 */
const Home: NextPage<ServerProps> = ({ title }) => {
  const [phase, setPhase] = useState<AppPhase>('boot');
  const [bootCycle, setBootCycle] = useState(0);

  const handleBootComplete = useCallback(() => {
    setPhase('login');
  }, []);

  const handleLoginComplete = useCallback(() => {
    setPhase('desktop');
  }, []);

  useEffect(() => {
    const onSessionAction = (event: Event) => {
      const action = (event as CustomEvent<SessionAction>).detail;

      if (action === 'lock' || action === 'logout') {
        setPhase('login');
      }

      if (action === 'restart') {
        setBootCycle((prev) => prev + 1);
        setPhase('boot');
      }
    };

    window.addEventListener(SESSION_ACTION_EVENT, onSessionAction as EventListener);
    return () =>
      window.removeEventListener(
        SESSION_ACTION_EVENT,
        onSessionAction as EventListener
      );
  }, []);

  return (
    <>
      {/* Phase 1: Boot terminal */}
      <Loader
        key={`boot-${bootCycle}`}
        isOnScreen={phase === 'boot'}
        loadingDuration={3200}
        onBootComplete={handleBootComplete}
      />

      {/* Phase 2: LightDM login */}
      <LoginScreen
        isVisible={phase === 'login'}
        onLoginComplete={handleLoginComplete}
      />

      {/* Phase 3: Xfce desktop */}
      {phase === 'desktop' && (
        <DesktopLayout title={title} entranceAnimationDelay={0}>
          <Desktop />
        </DesktopLayout>
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async () => {
    await store.dispatch(loadLatestNews());

    return {
      props: {
        title: 'zis3c@kali',
      },
      revalidate: 3600,
    };
  }
);

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    news: bindActionCreators(loadLatestNews, dispatch),
  };
};
export default connect(null, mapDispatchToProps)(Home);

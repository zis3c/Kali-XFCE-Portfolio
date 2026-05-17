import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  DESKTOP_NOTIFICATION_EVENT,
  DesktopNotificationPayload,
} from '../../utils/notifications';

const NotificationDaemon = (): JSX.Element => {
  const [queue, setQueue] = useState<DesktopNotificationPayload[]>([]);

  useEffect(() => {
    const onNotify = (event: Event) => {
      const payload = (event as CustomEvent<DesktopNotificationPayload>).detail;
      setQueue((prev) => [...prev, payload]);
      setTimeout(() => {
        setQueue((prev) => prev.slice(1));
      }, 3200);
    };
    window.addEventListener(DESKTOP_NOTIFICATION_EVENT, onNotify as EventListener);
    return () =>
      window.removeEventListener(
        DESKTOP_NOTIFICATION_EVENT,
        onNotify as EventListener
      );
  }, []);

  const active = queue[0];
  if (!active) return <></>;

  return (
    <Toast>
      <Title>{active.title}</Title>
      <Message>{active.message}</Message>
    </Toast>
  );
};

export default NotificationDaemon;

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Toast = styled.div`
  position: fixed;
  top: 34px;
  right: 8px;
  min-width: 220px;
  max-width: 320px;
  padding: 8px 10px;
  background: linear-gradient(180deg, #2a2d33 0%, #23262d 100%);
  border: 1px solid rgba(6, 8, 12, 0.92);
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.5);
  z-index: 9999;
  animation: ${slideIn} 0.18s ease-out;
`;

const Title = styled.div`
  font-size: 11px;
  color: rgba(220, 226, 234, 0.96);
`;

const Message = styled.div`
  margin-top: 2px;
  font-size: 10px;
  color: rgba(175, 184, 194, 0.92);
`;


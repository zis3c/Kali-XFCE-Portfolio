export interface DesktopNotificationPayload {
  title: string;
  message: string;
}

export const DESKTOP_NOTIFICATION_EVENT = 'desktop-notification';

export const notifyDesktop = (payload: DesktopNotificationPayload) => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(DESKTOP_NOTIFICATION_EVENT, { detail: payload }));
};


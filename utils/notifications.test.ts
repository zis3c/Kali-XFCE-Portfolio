import { DESKTOP_NOTIFICATION_EVENT, notifyDesktop } from './notifications';

describe('notifyDesktop', () => {
  it('dispatches a desktop notification event with the payload', () => {
    const listener = jest.fn();
    window.addEventListener(DESKTOP_NOTIFICATION_EVENT, listener);

    notifyDesktop({ title: 'Thunar', message: 'Folder created' });

    expect(listener).toHaveBeenCalledTimes(1);
    const event = listener.mock.calls[0][0] as CustomEvent;
    expect(event.detail).toEqual({
      title: 'Thunar',
      message: 'Folder created',
    });

    window.removeEventListener(DESKTOP_NOTIFICATION_EVENT, listener);
  });
});

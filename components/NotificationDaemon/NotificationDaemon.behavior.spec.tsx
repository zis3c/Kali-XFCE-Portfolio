import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react';
import NotificationDaemon from './NotificationDaemon';
import { notifyDesktop } from '../../utils/notifications';

describe('NotificationDaemon behavior', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it('renders a toast for desktop notifications and removes it', () => {
    const wrap = mount(<NotificationDaemon />);
    expect(wrap.html()).toBeNull();

    act(() => {
      notifyDesktop({ title: 'Thunar', message: 'Folder created' });
    });
    wrap.update();

    expect(wrap.text()).toContain('Thunar');
    expect(wrap.text()).toContain('Folder created');

    act(() => {
      jest.advanceTimersByTime(3200);
    });
    wrap.update();

    expect(wrap.html()).toBeNull();
  });
});

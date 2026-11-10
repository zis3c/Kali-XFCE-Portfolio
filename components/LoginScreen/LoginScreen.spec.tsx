import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react';
import LoginScreen from './LoginScreen';

describe('LoginScreen', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv, NEXT_PUBLIC_DEMO_PASSWORD: '1234' };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('renders nothing when hidden', () => {
    const wrap = mount(
      <LoginScreen isVisible={false} onLoginComplete={jest.fn()} />
    );

    expect(wrap.html()).toBeNull();
  });

  it('renders the login prompt for the demo user', () => {
    const wrap = mount(
      <LoginScreen isVisible={true} onLoginComplete={jest.fn()} />
    );

    expect(wrap.text()).toContain('zis3c');
    expect(wrap.find('input[type="password"]').length).toBe(1);
  });

  it('rejects an incorrect password', () => {
    const wrap = mount(
      <LoginScreen isVisible={true} onLoginComplete={jest.fn()} />
    );

    wrap
      .find('input')
      .simulate('change', { target: { value: 'wrong-password' } });
    wrap.find('form').simulate('submit', { preventDefault: jest.fn() });

    expect(wrap.text()).toContain('Authentication failed');
  });

  it('completes the login sequence with the demo password', () => {
    jest.useFakeTimers();
    const onLoginComplete = jest.fn();
    const wrap = mount(
      <LoginScreen isVisible={true} onLoginComplete={onLoginComplete} />
    );

    wrap.find('input').simulate('change', { target: { value: '1234' } });
    wrap.find('form').simulate('submit', { preventDefault: jest.fn() });

    expect(wrap.text()).toContain('Authenticating');

    act(() => {
      jest.advanceTimersByTime(700);
    });
    wrap.update();
    expect(wrap.text()).toContain('Starting Xfce session');

    act(() => {
      jest.advanceTimersByTime(900);
    });
    expect(onLoginComplete).toHaveBeenCalledTimes(1);

    jest.useRealTimers();
  });

  it('clears the error as soon as the user types again', () => {
    const wrap = mount(
      <LoginScreen isVisible={true} onLoginComplete={jest.fn()} />
    );

    wrap.find('input').simulate('change', { target: { value: 'wrong' } });
    wrap.find('form').simulate('submit', { preventDefault: jest.fn() });
    expect(wrap.text()).toContain('Authentication failed');

    wrap.find('input').simulate('change', { target: { value: '1' } });
    expect(wrap.text()).not.toContain('Authentication failed');
  });
});

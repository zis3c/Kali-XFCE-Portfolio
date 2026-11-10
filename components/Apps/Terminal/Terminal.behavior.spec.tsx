import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react';
import { withReduxAndStyledProviders } from '../../../test/testUtils';
import Terminal from './Terminal';
import * as Styled from './Terminal.styles';

const setup = () => {
  window.localStorage.clear();
  return mount(withReduxAndStyledProviders(<Terminal />));
};

const submit = async (
  wrap: ReturnType<typeof mount>,
  value: string,
  advanceMs = 400
) => {
  wrap.find(Styled.Input).simulate('change', { target: { value } });
  await act(async () => {
    wrap.find('form').simulate('submit', { preventDefault: jest.fn() });
    jest.advanceTimersByTime(advanceMs);
    await Promise.resolve();
    await Promise.resolve();
  });
  wrap.update();
};

describe('Terminal behavior', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
    window.localStorage.clear();
  });

  it('shows the boot banner', () => {
    const wrap = setup();

    expect(wrap.text()).toContain('Last login');
    expect(wrap.text()).toContain("Type 'help' for available commands.");
    expect(wrap.text()).toContain('zis3c@kali');
  });

  it('runs whoami', async () => {
    const wrap = setup();

    await submit(wrap, 'whoami');

    expect(wrap.text()).toContain('zis3c');
  });

  it('runs an unknown command and reports an error', async () => {
    const wrap = setup();

    await submit(wrap, 'definitely-not-a-command');

    expect(wrap.text()).toContain('definitely-not-a-command');
  });

  it('clears the screen with the clear command', async () => {
    const wrap = setup();
    expect(wrap.text()).toContain('Last login');

    await submit(wrap, 'clear');

    expect(wrap.text()).not.toContain('Last login');
  });

  it('autocompletes a command with Tab', () => {
    const wrap = setup();

    wrap.find(Styled.Input).simulate('change', { target: { value: 'whoam' } });
    wrap
      .find(Styled.Input)
      .simulate('keydown', { key: 'Tab', preventDefault: jest.fn() });

    expect(wrap.find(Styled.Input).prop('value')).toBe('whoami ');
  });

  it('clears the screen with Ctrl+L', () => {
    const wrap = setup();

    wrap.find(Styled.Input).simulate('keydown', {
      key: 'l',
      ctrlKey: true,
      preventDefault: jest.fn(),
    });

    expect(wrap.text()).not.toContain('Last login');
  });

  it('switches terminal themes', () => {
    const wrap = setup();

    wrap
      .find(Styled.ThemeSelect)
      .simulate('change', { target: { value: 'Green Phosphor' } });

    expect(wrap.find(Styled.ThemeSelect).prop('value')).toBe('Green Phosphor');
  });

  it('adds a new tab', () => {
    const wrap = setup();

    wrap.find(Styled.AddTabButton).simulate('click');
    wrap.update();

    expect(wrap.find(Styled.TabButton)).toHaveLength(2);
  });

  it('enters a root shell with the sudo password and exits', async () => {
    const wrap = setup();

    await submit(wrap, 'sudo');
    expect(wrap.text()).toContain('[sudo] password for zis3c');

    ['1', '2', '3', '4'].forEach((key) => {
      wrap.find(Styled.Input).simulate('keydown', {
        key,
        preventDefault: jest.fn(),
      });
    });

    await submit(wrap, '', 400);
    expect(wrap.text()).toContain('root shell activated');

    await submit(wrap, 'exit');
    expect(wrap.text()).toContain('logout');
  });

  it('recalls previous commands with the arrow keys', async () => {
    const wrap = setup();

    await submit(wrap, 'whoami');

    wrap
      .find(Styled.Input)
      .simulate('keydown', { key: 'ArrowUp', preventDefault: jest.fn() });

    expect(wrap.find(Styled.Input).prop('value')).toBe('whoami');
  });

  it('cancels the current line with Ctrl+C', () => {
    const wrap = setup();

    wrap.find(Styled.Input).simulate('change', { target: { value: 'ls' } });
    wrap.find(Styled.Input).simulate('keydown', {
      key: 'c',
      ctrlKey: true,
      preventDefault: jest.fn(),
    });

    expect(wrap.find(Styled.Input).prop('value')).toBe('');
    expect(wrap.text()).toContain('ls^C');
  });
});

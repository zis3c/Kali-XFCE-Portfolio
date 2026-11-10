import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react';
import { withReduxAndStyledProviders } from '../../../test/testUtils';
import Terminal from './Terminal';
import * as Styled from './Terminal.styles';

const TAB_META_KEY = 'kali_terminal_tabs_v1';
const STATE_KEY = 'kali_terminal_state_v1_tab_';

const setup = () => mount(withReduxAndStyledProviders(<Terminal />));

const run = async (wrap: ReturnType<typeof mount>, value: string) => {
  wrap.find(Styled.Input).simulate('change', { target: { value } });
  await act(async () => {
    wrap.find('form').simulate('submit', { preventDefault: jest.fn() });
    for (let i = 0; i < 10; i += 1) {
      jest.advanceTimersByTime(500);
      await Promise.resolve();
    }
  });
  wrap.update();
};

const typeKey = (wrap: ReturnType<typeof mount>, key: string) => {
  act(() => {
    wrap
      .find(Styled.Input)
      .simulate('keydown', { key, preventDefault: jest.fn() });
  });
  wrap.update();
};

describe('Terminal coverage', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    window.localStorage.clear();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
    window.localStorage.clear();
  });

  it('restores persisted tabs and terminal state', () => {
    window.localStorage.setItem(
      TAB_META_KEY,
      JSON.stringify([{ id: 2, label: 'Restored' }])
    );
    window.localStorage.setItem(
      `${STATE_KEY}2`,
      JSON.stringify({
        history: [{ type: 'output', content: 'RESTORED' }],
        commandHistory: ['pwd'],
        currentPath: '/root',
        isRoot: true,
        selectedTheme: 'Light Console',
        previousUserPath: '~',
      })
    );

    const wrap = setup();

    expect(wrap.text()).toContain('Restored');
    expect(wrap.text()).toContain('RESTORED');
    expect(wrap.text()).toContain('root@kali');
    expect(wrap.find(Styled.ThemeSelect).prop('value')).toBe('Light Console');
  });

  it('resets when persisted tabs are corrupt', () => {
    window.localStorage.setItem(TAB_META_KEY, 'not-json');

    const wrap = setup();

    expect(wrap.text()).toContain('Last login');
  });

  it('resets when a persisted tab payload is corrupt', () => {
    window.localStorage.setItem(
      TAB_META_KEY,
      JSON.stringify([{ id: 1, label: 'Tab 1' }])
    );
    window.localStorage.setItem(`${STATE_KEY}1`, 'not-json');

    const wrap = setup();

    expect(wrap.text()).toContain('Last login');
  });

  it('streams heavy command output', async () => {
    const wrap = setup();

    await run(wrap, 'nmap --version');

    expect(wrap.text().toLowerCase()).toContain('nmap');
  });

  it('blocks root-only paths for non-root users', async () => {
    const wrap = setup();

    await run(wrap, 'cat /etc/shadow');
    expect(wrap.text()).toContain('Permission denied');

    await run(wrap, 'ls /root');
    expect(wrap.text()).toContain("cannot access '/root'");

    await run(wrap, 'cd /root');
    expect(wrap.text()).toContain("cannot access '/root'");
  });

  it('prints the command history', async () => {
    const wrap = setup();

    await run(wrap, 'whoami');
    await run(wrap, 'cat ~/.bash_history');

    expect(wrap.text()).toContain('1  whoami');
  });

  it('handles wrong and correct sudo passwords', async () => {
    const wrap = setup();

    await run(wrap, 'sudo');
    typeKey(wrap, 'Enter');
    typeKey(wrap, '9');
    await run(wrap, '');

    expect(wrap.text()).toContain('Sorry, try again.');

    await run(wrap, 'sudo');
    typeKey(wrap, '1');
    typeKey(wrap, '2');
    typeKey(wrap, '3');
    typeKey(wrap, '4');
    typeKey(wrap, 'Backspace');
    typeKey(wrap, '4');
    await run(wrap, '');

    expect(wrap.text()).toContain('root shell activated');

    await run(wrap, 'exit');
    expect(wrap.text()).toContain('logout');
  });

  it('echoes empty commands and handles !! history', async () => {
    const wrap = setup();

    await run(wrap, '');
    await run(wrap, '!!');

    expect(wrap.text()).toContain('bash: !!: event not found');

    await run(wrap, 'whoami');
    await run(wrap, '!!');

    expect(wrap.text()).toContain('zis3c@kali');
  });

  it('runs chained commands and clear chains', async () => {
    const wrap = setup();

    await run(wrap, 'whoami; pwd');
    expect(wrap.text()).toContain('/home/zis3c');

    await run(wrap, 'whoami; clear');
    expect(wrap.text()).not.toContain('Last login');

    await run(wrap, 'whoami;;pwd');
    expect(wrap.text()).toContain('zis3c');
  });

  it('supports line editing keyboard shortcuts', () => {
    const wrap = setup();
    const input = wrap.find(Styled.Input);
    const node = input.getDOMNode() as HTMLInputElement;
    const rangeSpy = jest.spyOn(node, 'setSelectionRange');

    input.simulate('change', { target: { value: 'abcdef' } });
    node.setSelectionRange(3, 3);
    input.simulate('keydown', {
      key: 'u',
      ctrlKey: true,
      preventDefault: jest.fn(),
    });
    expect(wrap.find(Styled.Input).prop('value')).toBe('def');

    input.simulate('change', { target: { value: 'one two' } });
    node.setSelectionRange(7, 7);
    input.simulate('keydown', {
      key: 'w',
      ctrlKey: true,
      preventDefault: jest.fn(),
    });
    expect(wrap.find(Styled.Input).prop('value')).toBe('one');

    input.simulate('change', { target: { value: 'abcdef' } });
    node.setSelectionRange(3, 3);
    input.simulate('keydown', {
      key: 'k',
      ctrlKey: true,
      preventDefault: jest.fn(),
    });
    expect(wrap.find(Styled.Input).prop('value')).toBe('abc');

    input.simulate('keydown', {
      key: 'a',
      ctrlKey: true,
      preventDefault: jest.fn(),
    });
    input.simulate('keydown', {
      key: 'e',
      ctrlKey: true,
      preventDefault: jest.fn(),
    });
    expect(rangeSpy).toHaveBeenCalled();
  });

  it('recalls commands with arrows and resets on ArrowDown', async () => {
    const wrap = setup();
    await run(wrap, 'whoami');

    wrap.find(Styled.Input).simulate('keydown', {
      key: 'ArrowUp',
      preventDefault: jest.fn(),
    });
    expect(wrap.find(Styled.Input).prop('value')).toBe('whoami');

    wrap.find(Styled.Input).simulate('keydown', {
      key: 'ArrowDown',
      preventDefault: jest.fn(),
    });
    expect(wrap.find(Styled.Input).prop('value')).toBe('');
  });

  it('lists multiple command matches after repeated Tab', () => {
    const wrap = setup();

    wrap.find(Styled.Input).simulate('change', { target: { value: 'c' } });
    act(() => {
      wrap
        .find(Styled.Input)
        .simulate('keydown', { key: 'Tab', preventDefault: jest.fn() });
    });
    wrap.update();
    act(() => {
      wrap
        .find(Styled.Input)
        .simulate('keydown', { key: 'Tab', preventDefault: jest.fn() });
    });
    wrap.update();

    expect(wrap.text()).toContain('clear  cd  cat');

    wrap
      .find(Styled.Input)
      .simulate('keydown', { key: 'x', preventDefault: jest.fn() });
  });

  it('autocompletes files and directories with Tab', () => {
    const wrap = setup();

    wrap.find(Styled.Input).simulate('change', { target: { value: 'cat ab' } });
    wrap
      .find(Styled.Input)
      .simulate('keydown', { key: 'Tab', preventDefault: jest.fn() });
    expect(wrap.find(Styled.Input).prop('value')).toBe('cat about.txt ');

    wrap
      .find(Styled.Input)
      .simulate('change', { target: { value: 'cd Proj' } });
    wrap
      .find(Styled.Input)
      .simulate('keydown', { key: 'Tab', preventDefault: jest.fn() });
    expect(wrap.find(Styled.Input).prop('value')).toBe('cd Projects/');

    wrap.find(Styled.Input).simulate('change', { target: { value: 'cd zzz' } });
    wrap
      .find(Styled.Input)
      .simulate('keydown', { key: 'Tab', preventDefault: jest.fn() });
    expect(wrap.find(Styled.Input).prop('value')).toBe('cd zzz');
  });

  it('focuses the input when the terminal is clicked', () => {
    const wrap = setup();
    const node = wrap.find(Styled.Input).getDOMNode() as HTMLInputElement;
    const focusSpy = jest.spyOn(node, 'focus');

    wrap.find(Styled.Container).simulate('click');

    expect(focusSpy).toHaveBeenCalled();
  });

  it('switches between tabs', () => {
    const wrap = setup();

    wrap.find(Styled.AddTabButton).simulate('click');
    wrap.update();
    expect(wrap.find(Styled.TabButton)).toHaveLength(2);

    wrap.find(Styled.TabButton).at(0).simulate('click');
    wrap.update();
    expect(wrap.find(Styled.TabButton).at(0).prop('isActive')).toBe(true);
  });

  it('persists the terminal state to storage', async () => {
    const wrap = setup();
    await run(wrap, 'pwd');

    expect(window.localStorage.getItem(TAB_META_KEY)).toContain('Tab 1');
    expect(window.localStorage.getItem(`${STATE_KEY}1`)).toContain(
      'commandHistory'
    );
  });
});

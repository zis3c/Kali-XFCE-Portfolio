import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react';
import { withReduxAndStyledProviders } from '../../test/testUtils';
import { SESSION_ACTION_EVENT } from '../../utils/session-actions';
import Taskbar from './Taskbar';

const setup = (activeWorkspace = 1) => {
  const onWorkspaceChange = jest.fn();
  const wrap = mount(
    withReduxAndStyledProviders(
      <Taskbar
        activeWorkspace={activeWorkspace}
        onWorkspaceChange={onWorkspaceChange}
      />
    )
  );
  return { wrap, onWorkspaceChange };
};

const buttonByTitle = (wrap: ReturnType<typeof mount>, title: string) =>
  wrap.find('button').filterWhere((n) => n.prop('title') === title);

describe('Taskbar behavior', () => {
  it('changes the active workspace', () => {
    const { wrap, onWorkspaceChange } = setup(1);

    wrap
      .find('button')
      .filterWhere((n) => n.text() === '3')
      .simulate('click');

    expect(onWorkspaceChange).toHaveBeenCalledWith(3);
  });

  it('opens the volume popup and changes volume', () => {
    const { wrap } = setup();

    buttonByTitle(wrap, 'Volume: 75%').simulate('click');
    wrap.update();

    expect(wrap.text()).toContain('75%');

    wrap
      .find('input[type="range"]')
      .simulate('change', { target: { value: '30' } });
    wrap.update();

    expect(wrap.text()).toContain('30%');
  });

  it('logs out from the power menu', () => {
    const { wrap } = setup();
    const listener = jest.fn();
    window.addEventListener(SESSION_ACTION_EVENT, listener);

    buttonByTitle(wrap, 'Session Menu').simulate('click');
    wrap.update();
    wrap
      .find('div')
      .filterWhere((n) => n.text() === 'Log Out...')
      .first()
      .simulate('click');

    expect((listener.mock.calls[0][0] as CustomEvent).detail).toBe('logout');

    window.removeEventListener(SESSION_ACTION_EVENT, listener);
  });

  it('restarts from the power menu', () => {
    const { wrap } = setup();
    const listener = jest.fn();
    window.addEventListener(SESSION_ACTION_EVENT, listener);

    buttonByTitle(wrap, 'Session Menu').simulate('click');
    wrap.update();
    wrap
      .find('div')
      .filterWhere((n) => n.text() === 'Restart...')
      .first()
      .simulate('click');

    expect((listener.mock.calls[0][0] as CustomEvent).detail).toBe('restart');

    window.removeEventListener(SESSION_ACTION_EVENT, listener);
  });

  it('closes the power menu when clicking outside', () => {
    const { wrap } = setup();

    buttonByTitle(wrap, 'Session Menu').simulate('click');
    wrap.update();
    expect(wrap.text()).toContain('Log Out...');

    act(() => {
      document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    wrap.update();

    expect(wrap.text()).not.toContain('Log Out...');
  });
});

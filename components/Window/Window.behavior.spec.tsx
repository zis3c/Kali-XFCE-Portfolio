import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react';
import { Rnd } from 'react-rnd';
import { withReduxAndStyledProviders } from '../../test/testUtils';
import Window, { Props } from './Window';
import * as Styled from './Window.styles';

const setup = (overrides: Partial<Props> = {}) => {
  const props: Props = {
    size: { height: 300, width: 400 },
    windowIcon: '/icon.svg',
    windowName: 'Terminal',
    closeWindow: jest.fn(),
    isOpen: true,
    isActive: true,
    focusWindow: jest.fn(),
    minimizeWindow: jest.fn(),
    ...overrides,
  };
  const wrap = mount(withReduxAndStyledProviders(<Window {...props} />));
  return { wrap, props };
};

describe('Window behavior', () => {
  it('renders the window title and content', () => {
    const wrap = mount(
      withReduxAndStyledProviders(
        <Window
          size={{ height: 300, width: 400 }}
          windowIcon="/icon.svg"
          windowName="Files"
          closeWindow={jest.fn()}
          isOpen
          isActive
          focusWindow={jest.fn()}
          minimizeWindow={jest.fn()}
        >
          <span>content</span>
        </Window>
      )
    );

    expect(wrap.find(Styled.WindowTitle).text()).toBe('Files');
    expect(wrap.text()).toContain('content');
  });

  it('minimizes and closes the window', () => {
    const { wrap, props } = setup();

    wrap
      .find(Styled.WinButton)
      .filterWhere((n) => n.prop('title') === 'Minimize')
      .simulate('click');
    wrap
      .find(Styled.WinButton)
      .filterWhere((n) => n.prop('title') === 'Close')
      .simulate('click');

    expect(props.minimizeWindow).toHaveBeenCalledTimes(1);
    expect(props.closeWindow).toHaveBeenCalledTimes(1);
  });

  it('toggles maximize and restore', () => {
    const { wrap } = setup();

    wrap
      .find(Styled.WinButton)
      .filterWhere((n) => n.prop('title') === 'Maximize')
      .simulate('click');
    wrap.update();

    expect(
      wrap
        .find(Styled.WinButton)
        .filterWhere((n) => n.prop('title') === 'Restore')
    ).toHaveLength(1);

    wrap
      .find(Styled.WinButton)
      .filterWhere((n) => n.prop('title') === 'Restore')
      .simulate('click');
    wrap.update();

    expect(
      wrap
        .find(Styled.WinButton)
        .filterWhere((n) => n.prop('title') === 'Maximize')
    ).toHaveLength(1);
  });

  it('focuses on mouse down and stores drag and resize changes', () => {
    const { wrap, props } = setup();
    const rnd = () => wrap.find(Rnd);

    act(() => {
      rnd().prop('onMouseDown')();
      rnd().prop('onDragStop')?.({} as never, { x: 40, y: 60 });
      rnd().prop('onResizeStop')?.(
        {} as never,
        'bottomRight' as never,
        { style: { width: '500px', height: '350px' } } as never,
        {} as never,
        {} as never
      );
    });
    wrap.update();

    expect(props.focusWindow).toHaveBeenCalledTimes(1);
    expect(rnd().prop('position')).toEqual({ x: 40, y: 60 });
  });
});

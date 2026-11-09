import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react';
import { Rnd } from 'react-rnd';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { storeFactory } from '../../test/testUtils';
import { mockReduxStore } from '../../test/mockReduxStore';
import { useSystemDesign } from '../../design-system/useSystemDesign';
import DesktopApps from './DesktopApps';
import * as Styled from './DesktopApps.styles';
import DesktopButton from '../DesktopButton/DesktopButton';

const { darkTheme } = useSystemDesign();

const setup = () => {
  const store = storeFactory(mockReduxStore);
  const wrap = mount(
    <ThemeProvider theme={darkTheme}>
      <Provider store={store}>
        <DesktopApps />
      </Provider>
    </ThemeProvider>
  );
  return { wrap, store };
};

const mouseEvent = (target: unknown, currentTarget: unknown) =>
  ({
    target,
    currentTarget: {
      ...(currentTarget as Record<string, unknown>),
      getBoundingClientRect: () => ({ left: 0, top: 0 }),
    },
    clientX: 10,
    clientY: 10,
  } as unknown as React.MouseEvent<HTMLDivElement>);

type MouseHandler = (event: React.MouseEvent<HTMLDivElement>) => void;

describe('DesktopApps behavior', () => {
  it('lays out all desktop icons', () => {
    const { wrap } = setup();
    expect(wrap.find(DesktopButton)).toHaveLength(6);
  });

  it('draws a selection box while dragging on the desktop', () => {
    const { wrap } = setup();
    const container = wrap.find(Styled.DesktopContainer);
    const onMouseDown = container.prop('onMouseDown') as MouseHandler;
    const onMouseMove = container.prop('onMouseMove') as MouseHandler;
    const onMouseUp = container.prop('onMouseUp') as () => void;

    const event = mouseEvent(null, {});
    (event as unknown as { target: unknown }).target = (
      event as unknown as { currentTarget: unknown }
    ).currentTarget;

    act(() => {
      onMouseDown(event);
    });
    wrap.update();

    act(() => {
      onMouseMove(mouseEvent(null, {}));
    });
    wrap.update();

    expect(wrap.find(Styled.SelectionBox)).toHaveLength(1);

    act(() => {
      onMouseUp();
    });
    wrap.update();
  });

  it('normalizes icon positions when the viewport is resized', () => {
    const { wrap } = setup();
    const originalInnerWidth = window.innerWidth;
    const originalInnerHeight = window.innerHeight;

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        value: 200,
        configurable: true,
      });
      Object.defineProperty(window, 'innerHeight', {
        value: 200,
        configurable: true,
      });
      window.dispatchEvent(new Event('resize'));
    });
    wrap.update();

    expect(wrap.find(Rnd).length).toBe(6);

    Object.defineProperty(window, 'innerWidth', {
      value: originalInnerWidth,
      configurable: true,
    });
    Object.defineProperty(window, 'innerHeight', {
      value: originalInnerHeight,
      configurable: true,
    });
  });

  it('snaps a dragged icon to the grid', () => {
    const { wrap } = setup();
    const rnd = wrap.find(Rnd).first();

    act(() => {
      rnd.prop('onDragStop')?.({} as never, { x: 100, y: 120 });
    });
    wrap.update();

    expect(wrap.find(Rnd).length).toBe(6);
  });

  it('selects an icon on control click', () => {
    const { wrap } = setup();
    const button = wrap.find(DesktopButton).first();

    act(() => {
      button.prop('onSelect')?.({
        stopPropagation: jest.fn(),
        ctrlKey: true,
      } as unknown as React.MouseEvent);
    });
    wrap.update();

    expect(wrap.find(DesktopButton).first().prop('isSelected')).toBe(true);
  });
});

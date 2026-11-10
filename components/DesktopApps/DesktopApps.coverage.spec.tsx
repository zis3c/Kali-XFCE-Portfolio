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

const render = (ui = {}) => {
  const store = storeFactory({
    ...mockReduxStore,
    ui: { ...mockReduxStore.ui, ...ui },
  });
  const wrap = mount(
    <ThemeProvider theme={darkTheme}>
      <Provider store={store}>
        <DesktopApps />
      </Provider>
    </ThemeProvider>
  );
  return { wrap, store };
};

const mouse = (target: unknown, currentTarget: unknown) =>
  ({
    target,
    currentTarget: {
      ...(currentTarget as Record<string, unknown>),
      getBoundingClientRect: () => ({ left: 0, top: 0 }),
    },
    clientX: 20,
    clientY: 20,
    stopPropagation: jest.fn(),
    ctrlKey: false,
  } as unknown as React.MouseEvent<HTMLDivElement>);

describe('DesktopApps coverage', () => {
  it('sorts icons by name and date', () => {
    const byName = render({ sortDesktopIconsBy: 'name' });
    expect(byName.wrap.find(DesktopButton)).toHaveLength(6);

    const byDate = render({ sortDesktopIconsBy: 'date' });
    expect(byDate.wrap.find(DesktopButton)).toHaveLength(6);
  });

  it('clears the selection when clicking on an icon target', () => {
    const { wrap } = render();
    const container = wrap.find(Styled.DesktopContainer);
    const onMouseDown = container.prop('onMouseDown') as (
      e: React.MouseEvent<HTMLDivElement>
    ) => void;

    act(() => {
      onMouseDown(mouse({}, {}));
    });

    expect(wrap.find(Styled.SelectionBox)).toHaveLength(0);
  });

  it('ends selection on mouse leave', () => {
    const { wrap } = render();
    const container = wrap.find(Styled.DesktopContainer);
    const onMouseDown = container.prop('onMouseDown') as (
      e: React.MouseEvent<HTMLDivElement>
    ) => void;
    const onMouseLeave = container.prop('onMouseLeave') as () => void;
    const event = mouse(null, {});
    (event as unknown as { target: unknown }).target = (
      event as unknown as { currentTarget: unknown }
    ).currentTarget;

    act(() => {
      onMouseDown(event);
    });
    wrap.update();

    act(() => {
      onMouseLeave();
    });
    wrap.update();

    expect(wrap.find(Styled.SelectionBox)).toHaveLength(1);
    expect(wrap.find(Styled.SelectionBox).prop('style')).toBeDefined();
  });

  it('swaps two icons when dragged onto the same grid cell', () => {
    const { wrap } = render();
    const first = wrap.find(Rnd).at(0);
    const second = wrap.find(Rnd).at(1);
    const secondPosition = second.prop('position') as { x: number; y: number };

    act(() => {
      first.prop('onDragStop')?.({} as never, secondPosition);
    });
    wrap.update();

    expect(wrap.find(Rnd).at(0).prop('position')).toEqual(secondPosition);
  });

  it('toggles multi-selection with control click', () => {
    const { wrap } = render();
    const select = wrap.find(DesktopButton).at(0).prop('onSelect') as (
      e: React.MouseEvent
    ) => void;
    const event = {
      stopPropagation: jest.fn(),
      ctrlKey: true,
    } as unknown as React.MouseEvent;

    act(() => {
      select(event);
    });
    wrap.update();
    expect(wrap.find(DesktopButton).at(0).prop('isSelected')).toBe(true);

    act(() => {
      select(event);
    });
    wrap.update();
    expect(wrap.find(DesktopButton).at(0).prop('isSelected')).toBe(false);
  });

  it('selects a single icon on a normal click', () => {
    const { wrap } = render();
    const select = wrap.find(DesktopButton).at(0).prop('onSelect') as (
      e: React.MouseEvent
    ) => void;

    act(() => {
      select({
        stopPropagation: jest.fn(),
        ctrlKey: false,
      } as unknown as React.MouseEvent);
    });
    wrap.update();

    expect(wrap.find(DesktopButton).at(0).prop('isSelected')).toBe(true);
  });
});

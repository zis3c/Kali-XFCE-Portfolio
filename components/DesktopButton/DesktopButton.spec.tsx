import { mount } from 'enzyme';
import React from 'react';
import { storeFactory } from '../../test/testUtils';
import { mockReduxStore } from '../../test/mockReduxStore';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { useSystemDesign } from '../../design-system/useSystemDesign';
import DesktopButton from './DesktopButton';
import * as Styled from './DesktopButton.styles';

const { darkTheme } = useSystemDesign();

const render = (
  overrides: Partial<React.ComponentProps<typeof DesktopButton>> = {}
) => {
  const store = storeFactory(mockReduxStore);
  const props = {
    variant: 'desktop' as const,
    willOpenWindowWith: null,
    iconSrc: 'KALI_TERMINAL',
    iconSize: { height: 48, width: 48 },
    text: 'Terminal',
    action: null,
    ...overrides,
  };
  const wrap = mount(
    <ThemeProvider theme={darkTheme}>
      <Provider store={store}>
        <DesktopButton {...props} />
      </Provider>
    </ThemeProvider>
  );
  return { wrap, props, store };
};

describe('DesktopButton', () => {
  it('renders a Kali SVG icon by identifier', () => {
    const { wrap } = render();
    expect(wrap.find('svg').length).toBeGreaterThan(0);
    expect(wrap.text()).toContain('Terminal');
  });

  it('renders a custom action on click for non-desktop variants', () => {
    const action = jest.fn();
    const { wrap } = render({ variant: 'pinnedApp', action });

    wrap.find(Styled.ButtonContainer).simulate('click');

    expect(action).toHaveBeenCalledTimes(1);
  });

  it('calls onSelect for single click on desktop icons', () => {
    const onSelect = jest.fn();
    const { wrap } = render({ onSelect });

    wrap.find(Styled.ButtonContainer).simulate('click');

    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('opens a window on double click when no action is provided', () => {
    const { wrap, store } = render();

    wrap.find(Styled.ButtonContainer).simulate('dblclick');

    const windows = store.getState().windows.openedWindows;
    expect(windows).toHaveLength(1);
    expect(windows[0].windowName).toBe('Terminal');
  });

  it('normalizes file manager windows to a stable window name', () => {
    const { wrap, store } = render({
      iconSrc: 'KALI_FILEMANAGER',
      text: 'Files',
    });

    wrap.find(Styled.ButtonContainer).simulate('dblclick');

    expect(store.getState().windows.openedWindows[0].windowName).toBe(
      'File Manager'
    );
  });

  it('opens the desktop context menu on right click', () => {
    const { wrap } = render();

    wrap.find(Styled.ButtonContainer).simulate('contextmenu', {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    });

    expect(wrap.text()).toContain('Terminal');
  });

  it('renders recommended app details', () => {
    const { wrap } = render({
      variant: 'recommendedApp',
      details: 'Command line',
    });

    expect(wrap.text()).toContain('Command line');
  });
});

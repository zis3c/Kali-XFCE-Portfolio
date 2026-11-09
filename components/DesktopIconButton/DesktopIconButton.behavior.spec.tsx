import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { storeFactory } from '../../test/testUtils';
import { mockReduxStore } from '../../test/mockReduxStore';
import { useSystemDesign } from '../../design-system/useSystemDesign';
import DesktopIconButton from './DesktopIconButton';
import * as Styled from './DesktopIconButton.styles';

const { darkTheme } = useSystemDesign();

const KaliIds = [
  'KALI_TERMINAL',
  'KALI_FILEMANAGER',
  'KALI_USER',
  'KALI_FOLDER',
  'KALI_CODE',
  'KALI_MAIL',
  'KALI_SETTINGS',
  'KALI_TEXTFILE',
];

const render = (
  overrides: Partial<React.ComponentProps<typeof DesktopIconButton>> = {}
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
        <DesktopIconButton {...props} />
      </Provider>
    </ThemeProvider>
  );
  return { wrap, store, props };
};

describe('DesktopIconButton behavior', () => {
  it.each(KaliIds)('renders the %s icon', (iconSrc) => {
    const { wrap } = render({ iconSrc });
    expect(wrap.find('svg').length).toBeGreaterThan(0);
  });

  it('opens a window on double click', () => {
    const { wrap, store } = render();

    wrap.find(Styled.ButtonContainer).simulate('dblclick');

    expect(store.getState().windows.openedWindows[0].windowName).toBe(
      'Terminal'
    );
  });

  it('runs a custom action instead of opening a window', () => {
    const action = jest.fn();
    const { wrap } = render({ variant: 'pinnedApp', action });

    wrap.find(Styled.ButtonContainer).simulate('click');

    expect(action).toHaveBeenCalledTimes(1);
  });

  it('selects desktop icons on click', () => {
    const onSelect = jest.fn();
    const { wrap } = render({ onSelect });

    wrap.find(Styled.ButtonContainer).simulate('click');

    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('normalizes folders to the File Manager window', () => {
    const { wrap, store } = render({
      iconSrc: 'KALI_FOLDER',
      text: 'Projects',
    });

    wrap.find(Styled.ButtonContainer).simulate('dblclick');

    expect(store.getState().windows.openedWindows[0].windowName).toBe(
      'File Manager'
    );
  });

  it('shows recommended app details', () => {
    const { wrap } = render({
      variant: 'recommendedApp',
      details: 'Open a shell',
    });

    expect(wrap.text()).toContain('Open a shell');
  });
});

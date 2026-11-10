import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react';
import Image from 'next/image';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { storeFactory } from '../../test/testUtils';
import { mockReduxStore } from '../../test/mockReduxStore';
import { useSystemDesign } from '../../design-system/useSystemDesign';
import DesktopButton from './DesktopButton';
import AppContextMenu from '../AppContextMenu/AppContextMenu';
import * as Styled from './DesktopButton.styles';

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
  return { wrap, store };
};

describe('DesktopButton coverage', () => {
  it.each(KaliIds)('renders the %s icon', (iconSrc) => {
    const { wrap } = render({ iconSrc });
    expect(wrap.find('svg').length).toBeGreaterThan(0);
  });

  it('renders image icons for unknown sources', () => {
    const { wrap } = render({ iconSrc: '/assets/icons/custom.png' });

    expect(wrap.find(Image)).toHaveLength(1);
  });

  it('opens and closes the context menu', () => {
    const { wrap } = render();

    wrap.find(Styled.ButtonContainer).simulate('contextmenu', {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    });
    wrap.update();
    expect(wrap.find(AppContextMenu)).toHaveLength(1);

    act(() => {
      document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    wrap.update();

    expect(wrap.find(AppContextMenu)).toHaveLength(0);
  });

  it('detects FileManager components by name', () => {
    const FileManagerStub = () => null;
    Object.defineProperty(FileManagerStub, 'name', { value: 'FileManager' });
    const { wrap, store } = render({
      iconSrc: '/assets/icons/custom.png',
      willOpenWindowWith: <FileManagerStub />,
    });

    wrap.find(Styled.ButtonContainer).simulate('dblclick');

    expect(store.getState().windows.openedWindows[0].windowName).toBe(
      'File Manager'
    );
  });

  it('opens a window on double click', () => {
    const { wrap, store } = render();

    wrap.find(Styled.ButtonContainer).simulate('dblclick');

    expect(store.getState().windows.openedWindows).toHaveLength(1);
  });
});

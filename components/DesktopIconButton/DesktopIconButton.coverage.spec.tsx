import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react';
import Image from 'next/image';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { storeFactory } from '../../test/testUtils';
import { mockReduxStore } from '../../test/mockReduxStore';
import { useSystemDesign } from '../../design-system/useSystemDesign';
import DesktopIconButton from './DesktopIconButton';
import AppContextMenu from '../AppContextMenu/AppContextMenu';
import * as Styled from './DesktopIconButton.styles';

const { darkTheme } = useSystemDesign();

const render = (
  overrides: Partial<React.ComponentProps<typeof DesktopIconButton>> = {}
) => {
  const store = storeFactory(mockReduxStore);
  const props = {
    variant: 'desktop' as const,
    willOpenWindowWith: null,
    iconSrc: '/assets/icons/custom.png',
    iconSize: { height: 48, width: 48 },
    text: 'Custom',
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

describe('DesktopIconButton coverage', () => {
  it('loads image icons and clears the spinner', () => {
    const { wrap } = render();
    const image = wrap.find(Image);

    expect(wrap.find(Styled.IconSpinner)).toHaveLength(1);

    act(() => {
      image.prop('onLoadingComplete')?.();
    });
    wrap.update();

    expect(wrap.find(Styled.IconSpinner)).toHaveLength(0);
  });

  it('opens and closes the desktop context menu', () => {
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
      text: 'Custom',
      willOpenWindowWith: <FileManagerStub />,
    });

    wrap.find(Styled.ButtonContainer).simulate('dblclick');

    expect(store.getState().windows.openedWindows[0].windowName).toBe(
      'File Manager'
    );
  });
});

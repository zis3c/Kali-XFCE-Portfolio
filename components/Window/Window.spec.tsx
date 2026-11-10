import { mount } from 'enzyme';
import React from 'react';
import Window, { Props } from './Window';
import * as Styled from './Window.styles';
import { withReduxAndStyledProviders } from '../../test/testUtils';

/**
 * Setup function for the component
 * @returns {JSX.Element} ShallowWrapper
 */
const setup = (props: Props) => {
  return mount(withReduxAndStyledProviders(<Window {...props} />));
};

describe('Window', () => {
  describe('OPEN window', () => {
    const wrap = setup({
      size: { height: 100, width: 100 },
      windowIcon: '/icon.svg',
      windowName: 'Open Window',
      closeWindow: () => console.log('CLOSE'),
      isOpen: true,
      isActive: true,
      focusWindow: () => undefined,
      minimizeWindow: () => undefined,
    });

    it('should render with no errors', () => {
      expect(wrap);
      expect(wrap.length).toBe(1);
    });

    it('should render specified window name', () => {
      const windowName = wrap.find(Styled.WindowTitle);
      expect(windowName.text()).toBe('Open Window');
    });

    it('should render control buttons', () => {
      const ctrlBtn = wrap.find(Styled.WinButton);
      expect(ctrlBtn.length).toBe(3);
    });
  });
});

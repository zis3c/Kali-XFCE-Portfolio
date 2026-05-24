import { mount } from 'enzyme';
import React from 'react';
import SettingsPanel from './SettingsPanel';
import * as Styled from './SettingsPanel.styles';
import { withReduxAndStyledProviders } from '../../test/testUtils';

/**
 * Setup function for the component
 * @returns {JSX.Element} ShallowWrapper
 */
const setup = () => {
  return mount(withReduxAndStyledProviders(<SettingsPanel />));
};

describe('SettingsPanel', () => {
  const wrap = setup();

  it('should render without throwing an error', () => {
    expect(wrap);
    expect(wrap.length).toBe(1);
  });

  it('should render container', () => {
    const container = wrap.find(Styled.Container);
    expect(container.length).toBe(1);
  });

  it('should render battery tray icon', () => {
    const trayIcon = wrap.find(Styled.TrayIcon);
    expect(trayIcon.length).toBe(1);
  });
});

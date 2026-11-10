import { mount } from 'enzyme';
import React from 'react';
import { withReduxAndStyledProviders } from '../../test/testUtils';
import SystemTray from './SystemTray';
import Taskbar from '../Taskbar/Taskbar';

import * as Styled from './SystemTray.styles';

/**
 * Setup function for the component
 * @returns {JSX.Element} ShallowWrapper
 */
const setup = () => {
  return mount(withReduxAndStyledProviders(<SystemTray />));
};

describe('SystemTray', () => {
  const wrap = setup();

  it('should render without throwing an error', () => {
    expect(wrap);
    expect(wrap.length).toBe(1);
  });

  it('should render Applications button', () => {
    const appsBtn = wrap.find(Styled.ApplicationsButton);
    expect(appsBtn.length).toBe(1);
  });

  it('should render Taskbar', () => {
    const taskbar = wrap.find(Taskbar);
    expect(taskbar.length).toBe(1);
  });
});

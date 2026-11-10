import { mount } from 'enzyme';
import React from 'react';
import { withReduxAndStyledProviders } from '../../test/testUtils';
import TimePanel from './TimePanel';
import Clock from '../Clock/Clock';
import * as Styled from './TimePanel.styles';

/**
 * Setup function for the component
 * @returns {JSX.Element} ShallowWrapper
 */
const setup = () => {
  return mount(withReduxAndStyledProviders(<TimePanel />));
};

describe('Time Panel', () => {
  const wrap = setup();

  it('should render without throwing an error', () => {
    expect(wrap);
    expect(wrap.length).toBe(1);
  });

  it('should render clock', () => {
    const clock = wrap.find(Clock);
    expect(clock.length).toBe(1);
  });

  it('should render date text', () => {
    const dateText = wrap.find(Styled.DateText);
    expect(dateText.length).toBe(1);
  });
});

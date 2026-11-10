import { shallow } from 'enzyme';
import React from 'react';
import Loader from './Loader';
import * as Styled from './Loader.styles';

/**
 * Setup function for the component
 * @returns {JSX.Element} ShallowWrapper
 */
const setup = () => {
  return shallow(
    <Loader
      isOnScreen={true}
      loadingDuration={500}
      onBootComplete={() => undefined}
    />
  );
};

describe('Loader component', () => {
  const wrap = setup();

  it('should render without throwing an error', () => {
    expect(wrap);
    expect(wrap.length).toBe(1);
  });

  it('should render container', () => {
    const container = wrap.find(Styled.Container);
    expect(container.length).toBe(1);
  });
  it('should render boot screen', () => {
    const bootScreen = wrap.find(Styled.BootScreen);
    expect(bootScreen.length).toBe(1);
  });
});

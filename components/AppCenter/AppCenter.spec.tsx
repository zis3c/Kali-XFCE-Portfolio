import { mount } from 'enzyme';
import React from 'react';
import { withReduxAndStyledProviders } from '../../test/testUtils';
import AppCenter from './AppCenter';

import * as Styled from './AppCenter.styles';

/**
 * Setup function for the component
 * @returns {JSX.Element} ShallowWrapper
 */
const setup = () => {
  return mount(withReduxAndStyledProviders(<AppCenter />));
};

describe('AppCenter', () => {
  const wrap = setup();

  it('should render without throwing an error', () => {
    expect(wrap);
    expect(wrap.length).toBe(1);
  });

  it('should render search input', () => {
    const searchInput = wrap.find(Styled.SearchInput);
    expect(searchInput.length).toBe(1);
  });
  it('should render category sidebar', () => {
    const sidebar = wrap.find(Styled.CategorySidebar);
    expect(sidebar.length).toBe(1);
  });
  it('should render app list', () => {
    const appList = wrap.find(Styled.AppList);
    expect(appList.length).toBe(1);
  });
});

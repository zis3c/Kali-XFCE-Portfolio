import { mount } from 'enzyme';
import React from 'react';
import PortfolioFooter from './PortfolioFooter';
import * as Styled from './PortfolioMode.styles';

describe('PortfolioFooter', () => {
  it('renders clean copyright notice and social profile links', () => {
    const wrap = mount(<PortfolioFooter />);

    expect(wrap.text()).toContain('Radzi Zamri');
    expect(wrap.text()).toContain('Open source under MIT License');
    expect(wrap.find(Styled.FooterSocialList)).toHaveLength(1);
    expect(wrap.find('a')).toHaveLength(5);
  });
});

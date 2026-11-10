import { mount } from 'enzyme';
import React from 'react';
import PortfolioFooter from './PortfolioFooter';
import * as Styled from './PortfolioMode.styles';

describe('PortfolioFooter', () => {
  it('renders footer brand, links, and triggers jumpTo and scrollTo', () => {
    const jumpTo = jest.fn();
    const scrollToMock = jest.fn();
    window.scrollTo = scrollToMock;

    const wrap = mount(<PortfolioFooter jumpTo={jumpTo} />);

    expect(wrap.text()).toContain('Radzi (zis3c)');
    expect(wrap.text()).toContain('Dot Zero CTF Team');
    expect(wrap.find(Styled.BackToTopButton)).toHaveLength(1);

    // Click back to top
    wrap.find(Styled.BackToTopButton).simulate('click');
    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });

    // Click a navigation link
    const aboutBtn = wrap
      .find(Styled.FooterLinksRow)
      .find('button')
      .filterWhere((b) => b.text() === 'About');
    expect(aboutBtn).toHaveLength(1);
    aboutBtn.simulate('click');
    expect(jumpTo).toHaveBeenCalledWith('simple-about');
  });
});

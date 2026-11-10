import { shallow } from 'enzyme';
import React from 'react';
import Sparkle from './Sparkle';
import * as Styled from './Sparkle.styles';

describe('Portfolio Sparkle', () => {
  it('renders an svg with the requested color and size', () => {
    const wrap = shallow(
      <Sparkle color="#123456" size={18} style={{ top: 2, left: 4 }} />
    );

    expect(wrap.find(Styled.Svg).prop('width')).toBe(18);
    expect(wrap.find('path').prop('fill')).toBe('#123456');
  });
});

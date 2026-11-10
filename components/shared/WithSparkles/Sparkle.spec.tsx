import { shallow } from 'enzyme';
import React from 'react';
import Sparkle from './Sparkle';
import * as Styled from './Sparkle.styles';

describe('Sparkle', () => {
  it('renders an svg with the requested color and size', () => {
    const wrap = shallow(
      <Sparkle color="#ff00aa" size={24} style={{ top: 0, left: 0 }} />
    );

    expect(wrap.find(Styled.Svg).prop('width')).toBe(24);
    expect(wrap.find('path').prop('fill')).toBe('#ff00aa');
  });
});

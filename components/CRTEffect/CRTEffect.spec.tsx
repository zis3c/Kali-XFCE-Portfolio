import { shallow } from 'enzyme';
import React from 'react';
import CRTEffect from './CRTEffect';
import * as Styled from './CRTEffect.styles';

describe('CRTEffect', () => {
  it('renders all CRT overlays', () => {
    const wrap = shallow(<CRTEffect />);

    expect(wrap.find(Styled.CRTWrapper)).toHaveLength(1);
    expect(wrap.find(Styled.Scanlines)).toHaveLength(1);
    expect(wrap.find(Styled.NoiseOverlay)).toHaveLength(1);
    expect(wrap.find(Styled.VignetteAndCurve)).toHaveLength(1);
  });
});

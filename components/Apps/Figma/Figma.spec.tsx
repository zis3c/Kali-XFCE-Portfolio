import { shallow } from 'enzyme';
import React from 'react';
import Figma from './Figma';
import Iframe from '../../Iframe/Iframe';

describe('Figma', () => {
  it('renders the Figma embed iframe', () => {
    const wrap = shallow(<Figma />);
    const iframe = wrap.find(Iframe);

    expect(iframe).toHaveLength(1);
    expect(iframe.prop('title')).toBe('Figma');
    expect(iframe.prop('iframeSrc')).toContain('figma.com/embed');
  });
});

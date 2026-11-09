import { shallow } from 'enzyme';
import React from 'react';
import VsCode from './VsCode';
import Iframe from '../../Iframe/Iframe';

describe('VsCode', () => {
  it('renders the GitHub1s embed iframe', () => {
    const wrap = shallow(<VsCode />);
    const iframe = wrap.find(Iframe);

    expect(iframe).toHaveLength(1);
    expect(iframe.prop('title')).toBe('VS Code');
    expect(iframe.prop('iframeSrc')).toContain('github1s.com/zis3c');
  });
});

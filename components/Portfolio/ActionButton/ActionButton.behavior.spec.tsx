import { shallow } from 'enzyme';
import React from 'react';
import ActionButton from './ActionButton';
import * as Styled from './ActionButton.styles';

describe('ActionButton behavior', () => {
  it('renders a button by default', () => {
    const onClick = jest.fn();
    const wrap = shallow(
      <ActionButton buttonText="Send" icon={<span />} onClick={onClick} />
    );

    wrap.find(Styled.BTN).simulate('click');

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders a link when requested', () => {
    const wrap = shallow(
      <ActionButton
        buttonText="GitHub"
        icon={<span />}
        renderAsLink
        href="https://github.com/zis3c"
      />
    );

    const link = wrap.find(Styled.BTN);
    expect(link.prop('href')).toBe('https://github.com/zis3c');
    expect(link.prop('target')).toBe('_blank');
  });

  it('passes loading and disabled state through', () => {
    const wrap = shallow(
      <ActionButton buttonText="Send" icon={<span />} isLoading disabled />
    );

    expect(wrap.find(Styled.BTN).prop('isLoading')).toBe(true);
    expect(wrap.find(Styled.BTN).prop('disabled')).toBe(true);
  });
});

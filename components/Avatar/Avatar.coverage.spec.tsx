import { shallow } from 'enzyme';
import React from 'react';
import Avatar, { Props } from './Avatar';
import * as Styled from './Avatar.styles';

const props: Props = {
  firstName: 'Radzi',
  lastName: 'Zamri',
  isActive: true,
  hasBadge: true,
  src: '',
  width: '50px',
};

describe('Avatar coverage', () => {
  it('renders initials when no image is supplied', () => {
    const wrap = shallow(<Avatar {...props} />);

    expect(wrap.find(Styled.Span).text()).toBe('R Z');
    expect(wrap.find(Styled.Image)).toHaveLength(0);
    expect(wrap.find(Styled.Badge)).toHaveLength(1);
  });
});

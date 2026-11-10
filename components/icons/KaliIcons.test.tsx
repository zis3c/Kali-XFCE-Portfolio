import { mount } from 'enzyme';
import React from 'react';
import * as Icons from './KaliIcons';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

const icons = Object.entries(Icons) as Array<
  [string, React.ComponentType<IconProps>]
>;

describe('KaliIcons', () => {
  it.each(icons)('renders %s with defaults', (_name, Icon) => {
    const wrap = mount(<Icon />);
    expect(wrap.find('svg').length).toBeGreaterThan(0);
  });

  it.each(icons)('renders %s with explicit props', (_name, Icon) => {
    const wrap = mount(
      <Icon size={11} color="#abcdef" className="test-icon" />
    );
    const svg = wrap.find('svg');

    expect(svg.prop('width')).toBe(11);
    expect(svg.prop('className')).toBe('test-icon');
  });
});

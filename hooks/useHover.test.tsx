import { mount } from 'enzyme';
import React, { useRef } from 'react';
import { act } from 'react';
import useHover from './useHover';

const Harness = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isHovering = useHover(ref);
  return <div ref={ref} data-hover={isHovering} />;
};

const NullRefHarness = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isHovering = useHover(ref);
  return <span data-hover={isHovering} />;
};

describe('useHover', () => {
  it('tracks mouse enter, move, and leave', () => {
    const wrap = mount(<Harness />);
    const node = wrap.find('div').getDOMNode();

    act(() => {
      node.dispatchEvent(new MouseEvent('mouseenter'));
    });
    wrap.update();
    expect(wrap.find('div').prop('data-hover')).toBe(true);

    act(() => {
      node.dispatchEvent(new MouseEvent('mousemove'));
    });
    wrap.update();
    expect(wrap.find('div').prop('data-hover')).toBe(true);

    act(() => {
      node.dispatchEvent(new MouseEvent('mouseleave'));
    });
    wrap.update();
    expect(wrap.find('div').prop('data-hover')).toBe(false);
  });

  it('does nothing when the ref is empty', () => {
    const wrap = mount(<NullRefHarness />);
    expect(wrap.find('span').prop('data-hover')).toBe(false);
  });
});

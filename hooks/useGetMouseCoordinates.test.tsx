import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react';
import { useGetMouseCoordinates } from './useGetMouseCoordinates';

const Harness = () => {
  const { x, y } = useGetMouseCoordinates();
  return <div data-x={x} data-y={y} />;
};

describe('useGetMouseCoordinates', () => {
  it('tracks context menu clicks and removes the listener', () => {
    const wrap = mount(<Harness />);

    expect(wrap.find('div').prop('data-x')).toBe(0);

    act(() => {
      document.dispatchEvent(
        new MouseEvent('contextmenu', { clientX: 12, clientY: 34 })
      );
    });
    wrap.update();

    expect(wrap.find('div').prop('data-x')).toBe(12);
    expect(wrap.find('div').prop('data-y')).toBe(34);

    wrap.unmount();
  });
});

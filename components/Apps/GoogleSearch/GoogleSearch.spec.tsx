import { mount } from 'enzyme';
import React from 'react';
import GoogleSearch from './GoogleSearch';

const frameSrc = (wrap: ReturnType<typeof mount>): string =>
  wrap.find('iframe').prop('src') as string;

describe('GoogleSearch', () => {
  it('loads the Google homepage by default', () => {
    const wrap = mount(<GoogleSearch />);

    expect(frameSrc(wrap)).toBe('https://www.google.com/webhp?igu=1');
  });

  it('builds a search URL from the initial query', () => {
    const wrap = mount(<GoogleSearch searchQuery="kali linux" />);

    expect(frameSrc(wrap)).toBe('https://www.google.com/search?q=kali%20linux');
  });

  it('navigates to a typed URL on Enter', () => {
    const wrap = mount(<GoogleSearch />);
    const input = wrap.find('input');

    input.simulate('change', { target: { value: 'example.com' } });
    input.simulate('keydown', { key: 'Enter' });

    expect(frameSrc(wrap)).toBe('https://example.com');
  });

  it('turns free text into a Google search', () => {
    const wrap = mount(<GoogleSearch />);
    const input = wrap.find('input');

    input.simulate('change', { target: { value: 'nmap cheatsheet' } });
    input.simulate('keydown', { key: 'Enter' });

    expect(frameSrc(wrap)).toBe(
      'https://www.google.com/search?q=nmap%20cheatsheet'
    );
  });

  it('navigates with the Go button', () => {
    const wrap = mount(<GoogleSearch />);
    const input = wrap.find('input');

    input.simulate('change', { target: { value: 'https://kali.org' } });
    wrap
      .find('button')
      .filterWhere((n) => n.text() === 'Go')
      .simulate('click');

    expect(frameSrc(wrap)).toBe('https://kali.org');
  });

  it('supports back and forward navigation', () => {
    const wrap = mount(<GoogleSearch />);
    const input = wrap.find('input');
    const nav = () =>
      wrap.find('button').filterWhere((n) => /^[<>]$/.test(n.text()));

    input.simulate('change', { target: { value: 'example.com' } });
    input.simulate('keydown', { key: 'Enter' });
    expect(frameSrc(wrap)).toBe('https://example.com');

    nav().at(0).simulate('click');
    expect(frameSrc(wrap)).toBe('https://www.google.com/webhp?igu=1');

    nav().at(1).simulate('click');
    expect(frameSrc(wrap)).toBe('https://example.com');
  });

  it('shows history suggestions while typing', () => {
    const wrap = mount(<GoogleSearch />);
    const input = wrap.find('input');

    input.simulate('change', { target: { value: 'example.com' } });
    input.simulate('keydown', { key: 'Enter' });
    input.simulate('focus');

    expect(wrap.text()).toContain('https://example.com');
  });
});

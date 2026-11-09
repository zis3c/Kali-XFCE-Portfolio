import { shallow } from 'enzyme';
import React from 'react';
import SearchBar from './SearchBar';
import * as Styled from './SearchBar.styles';

describe('SearchBar behavior', () => {
  it('renders the label and forwards input changes', () => {
    const setValue = jest.fn();
    const wrap = shallow(
      <SearchBar
        name="search-bar"
        type="text"
        placeholder="Type here"
        value="initial"
        setValue={setValue}
      />
    );

    expect(wrap.find(Styled.Label).text()).toContain('Type here');

    wrap.find(Styled.Input).simulate('change', { target: { value: 'kali' } });

    expect(setValue).toHaveBeenCalledWith('kali');
    expect(wrap.find(Styled.Input).prop('required')).toBe(true);
  });
});

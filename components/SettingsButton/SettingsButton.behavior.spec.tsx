import { mount } from 'enzyme';
import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { withReduxAndStyledProviders } from '../../test/testUtils';
import SettingsButton from './SettingsButton';
import * as Styled from './SettingsButton.styles';

const render = (
  overrides: Partial<React.ComponentProps<typeof SettingsButton>> = {}
) => {
  const props = {
    variant: 'icon' as const,
    isTurnedOn: true,
    text: 'Wi-Fi',
    btnAction: jest.fn(),
    children: <span>icon</span>,
    ...overrides,
  };
  const wrap = mount(
    withReduxAndStyledProviders(<SettingsButton {...props} />)
  );
  return { wrap, props };
};

describe('SettingsButton coverage', () => {
  it('calls the action and toggles its active state on click', () => {
    const { wrap, props } = render();

    expect(wrap.find(Styled.Button).prop('isTurnedOn')).toBe(true);
    wrap.find(Styled.Button).simulate('click');

    expect(props.btnAction).toHaveBeenCalledTimes(1);
    expect(wrap.find(Styled.Button).prop('isTurnedOn')).toBe(false);
  });

  it('renders the chevron for action variants', () => {
    const { wrap } = render({ variant: 'action' });

    expect(wrap.find(FiChevronRight)).toHaveLength(1);
  });
});

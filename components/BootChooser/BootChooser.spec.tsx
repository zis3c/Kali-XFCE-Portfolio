import { mount } from 'enzyme';
import React from 'react';
import { withReduxAndStyledProviders } from '../../test/testUtils';
import BootChooser from './BootChooser';
import * as Styled from './BootChooser.styles';

describe('BootChooser', () => {
  const setup = (
    overrides: Partial<React.ComponentProps<typeof BootChooser>> = {}
  ) => {
    const props = {
      bootHint: 'Use up/down and Enter to choose.',
      selectedBootIndex: 0,
      onSelectBootIndex: jest.fn(),
      onLaunchPortfolio: jest.fn(),
      onLaunchKali: jest.fn(),
      ...overrides,
    };
    const wrap = mount(withReduxAndStyledProviders(<BootChooser {...props} />));
    return { wrap, props };
  };

  it('renders both boot targets and the boot hint', () => {
    const { wrap } = setup();

    expect(wrap.text()).toContain('Portfolio Mode (default)');
    expect(wrap.text()).toContain('Kali Linux XFCE Mode');
    expect(wrap.text()).toContain('Use up/down and Enter to choose.');
  });

  it('launches portfolio mode when the first target is clicked', () => {
    const { wrap, props } = setup();

    wrap.find(Styled.Button).at(0).simulate('click');

    expect(props.onSelectBootIndex).toHaveBeenCalledWith(0);
    expect(props.onLaunchPortfolio).toHaveBeenCalledTimes(1);
    expect(props.onLaunchKali).not.toHaveBeenCalled();
  });

  it('launches Kali mode when the second target is clicked', () => {
    const { wrap, props } = setup();

    wrap.find(Styled.Button).at(1).simulate('click');

    expect(props.onSelectBootIndex).toHaveBeenCalledWith(1);
    expect(props.onLaunchKali).toHaveBeenCalledTimes(1);
    expect(props.onLaunchPortfolio).not.toHaveBeenCalled();
  });

  it('highlights the selected boot target', () => {
    const { wrap } = setup({ selectedBootIndex: 1 });

    expect(wrap.find(Styled.Button).at(1).prop('isActive')).toBe(true);
    expect(wrap.find(Styled.Button).at(0).prop('isActive')).toBe(false);
  });
});

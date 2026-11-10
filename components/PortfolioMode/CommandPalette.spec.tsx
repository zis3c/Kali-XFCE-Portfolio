import { mount } from 'enzyme';
import React from 'react';
import { withReduxAndStyledProviders } from '../../test/testUtils';
import CommandPalette from './CommandPalette';
import * as Styled from './PortfolioMode.styles';

const actions = [
  { label: 'Go to About', run: jest.fn() },
  { label: 'Toggle Theme', run: jest.fn() },
];

const setup = (isOpen = true) => {
  const onClose = jest.fn();
  const wrap = mount(
    withReduxAndStyledProviders(
      <CommandPalette
        isOpen={isOpen}
        actions={actions}
        paletteIndex={1}
        onClose={onClose}
      />
    )
  );
  return { wrap, onClose };
};

describe('CommandPalette', () => {
  it('renders nothing when closed', () => {
    const { wrap } = setup(false);
    expect(wrap.isEmptyRender()).toBe(true);
  });

  it('runs the selected action and closes', () => {
    const { wrap, onClose } = setup();

    expect(wrap.find(Styled.PaletteItem)).toHaveLength(actions.length);
    expect(wrap.find(Styled.PaletteItem).at(1).prop('isActive')).toBe(true);

    wrap.find(Styled.PaletteItem).at(0).simulate('click');

    expect(actions[0].run).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes from the overlay and keeps the panel click contained', () => {
    const { wrap, onClose } = setup();

    wrap.find(Styled.PalettePanel).simulate('click');
    expect(onClose).not.toHaveBeenCalled();

    wrap.find(Styled.PaletteOverlay).simulate('click');
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react';
import ExitConfirmModal from './ExitConfirmModal';

const setup = (themeMode: 'terminal' | 'paper' = 'terminal') => {
  const onCancel = jest.fn();
  const onConfirm = jest.fn();
  const wrap = mount(
    <ExitConfirmModal
      isOpen={true}
      themeMode={themeMode}
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
  return { wrap, onCancel, onConfirm };
};

const buttonByText = (wrap: ReturnType<typeof mount>, text: string) =>
  wrap
    .find('button')
    .filterWhere((node) => node.text().includes(text))
    .first();

describe('ExitConfirmModal', () => {
  it('renders nothing when closed', () => {
    const wrap = mount(
      <ExitConfirmModal
        isOpen={false}
        themeMode="terminal"
        onCancel={jest.fn()}
        onConfirm={jest.fn()}
      />
    );

    expect(wrap.html()).toBeNull();
  });

  it('confirms leaving portfolio mode', () => {
    const { wrap, onConfirm } = setup();

    expect(wrap.find('[role="dialog"]').hostNodes()).toHaveLength(1);
    expect(wrap.text()).toContain('Leave Portfolio Mode?');
    buttonByText(wrap, 'Return to Boot Menu').simulate('click');

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('cancels leaving portfolio mode', () => {
    const { wrap, onCancel } = setup();

    buttonByText(wrap, 'Cancel').simulate('click');

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('closes on Escape', () => {
    const { wrap, onCancel } = setup();

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(wrap.find('[role="dialog"]').hostNodes()).toHaveLength(1);
  });

  it('closes when the backdrop is clicked but not the card', () => {
    const { wrap, onCancel } = setup();
    const dialogNode = wrap.find('[role="dialog"]').hostNodes().getDOMNode();

    act(() => {
      dialogNode.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(onCancel).not.toHaveBeenCalled();

    act(() => {
      const overlayNode = dialogNode.parentElement as HTMLElement;
      overlayNode.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('renders the light theme variant', () => {
    const { wrap } = setup('paper');

    expect(wrap.text()).toContain('Return to the boot menu?');
  });
});

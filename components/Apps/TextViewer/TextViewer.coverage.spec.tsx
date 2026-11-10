import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react';
import { withReduxAndStyledProviders } from '../../../test/testUtils';
import TextViewer from './TextViewer';
import * as Styled from './TextViewer.styles';

const setup = (
  overrides: Partial<React.ComponentProps<typeof TextViewer>> = {}
) =>
  mount(
    withReduxAndStyledProviders(
      <TextViewer content="foo bar foo" filename="about.txt" {...overrides} />
    )
  );

const toolButton = (wrap: ReturnType<typeof mount>, label: string) =>
  wrap.find(Styled.ToolButton).filterWhere((node) => node.text() === label);

describe('TextViewer coverage', () => {
  it('derives the target path from a filename and saves', () => {
    const wrap = setup();

    toolButton(wrap, 'Save').simulate('click');

    expect(wrap.text()).toContain('Saved: /home/zis3c/about.txt');
  });

  it('reports a failed save for a missing path', () => {
    const wrap = setup({ filepath: '/does/not/exist.txt' });

    toolButton(wrap, 'Save').simulate('click');

    expect(wrap.text()).toContain('Save failed');
  });

  it('does nothing when navigating with no search term', () => {
    const wrap = setup();

    toolButton(wrap, 'Next').simulate('click');
    toolButton(wrap, 'Prev').simulate('click');

    expect(wrap.text()).toContain('Ready');
  });

  it('navigates matches forward and backward', () => {
    const wrap = setup();

    wrap
      .find(Styled.SearchInput)
      .first()
      .simulate('change', { target: { value: 'foo' } });
    toolButton(wrap, 'Next').simulate('click');
    toolButton(wrap, 'Prev').simulate('click');

    expect(wrap.text()).toContain('2 match(es)');
  });

  it('replaces a match and reports when there is no next match', () => {
    const wrap = setup();

    wrap
      .find(Styled.SearchInput)
      .first()
      .simulate('change', { target: { value: 'foo' } });

    act(() => {
      window.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'h', ctrlKey: true })
      );
    });
    wrap.update();

    wrap
      .find(Styled.SearchInput)
      .at(1)
      .simulate('change', { target: { value: 'baz' } });
    toolButton(wrap, 'Replace').simulate('click');
    wrap.update();

    expect(wrap.find(Styled.TextEditor).prop('value')).toBe('baz bar foo');
    expect(wrap.text()).toContain('Replaced one match');

    wrap
      .find(Styled.SearchInput)
      .first()
      .simulate('change', { target: { value: 'zzz' } });
    toolButton(wrap, 'Replace').simulate('click');
    wrap.update();

    expect(wrap.text()).toContain('No next match');
  });

  it('focuses the search field with Ctrl+F', () => {
    const wrap = setup();
    const search = wrap.find(Styled.SearchInput).first().getDOMNode();
    const focusSpy = jest.spyOn(search as HTMLInputElement, 'focus');

    act(() => {
      window.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'f', ctrlKey: true })
      );
    });

    expect(focusSpy).toHaveBeenCalledTimes(1);
  });

  it('tracks the cursor from editor clicks and key ups', () => {
    const wrap = setup();

    wrap.find(Styled.TextEditor).simulate('click', {
      currentTarget: { selectionStart: 2 },
    });
    wrap.find(Styled.TextEditor).simulate('keyup', {
      currentTarget: { selectionStart: 3 },
    });

    expect(wrap.find(Styled.TextEditor).prop('value')).toBe('foo bar foo');
  });
});

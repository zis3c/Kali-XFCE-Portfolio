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
      <TextViewer content={'alpha\nbeta'} filename="notes.txt" {...overrides} />
    )
  );

describe('TextViewer', () => {
  it('renders the file contents and line count', () => {
    const wrap = setup();

    expect(wrap.find(Styled.TextEditor).prop('value')).toBe('alpha\nbeta');
    expect(wrap.text()).toContain('notes.txt - 2 lines');
  });

  it('saves the edited content to the virtual filesystem', () => {
    const wrap = setup({ filepath: '/home/zis3c/about.txt' });

    wrap
      .find(Styled.TextEditor)
      .simulate('change', { target: { value: 'updated' } });
    wrap
      .find(Styled.ToolButton)
      .filterWhere((n) => n.text() === 'Save')
      .simulate('click');

    expect(wrap.text()).toContain('Saved: /home/zis3c/about.txt');
  });

  it('reports when the document has no writable path', () => {
    const wrap = setup({ filepath: undefined, filename: 'untitled' });

    wrap
      .find(Styled.ToolButton)
      .filterWhere((n) => n.text() === 'Save')
      .simulate('click');

    expect(wrap.text()).toContain('No writable path');
  });

  it('counts matches and replaces the next occurrence', () => {
    const wrap = setup({ content: 'foo bar foo' });

    wrap
      .find(Styled.SearchInput)
      .first()
      .simulate('change', { target: { value: 'foo' } });
    expect(wrap.text()).toContain('2 match(es)');

    wrap
      .find(Styled.ToolButton)
      .filterWhere((n) => n.text() === 'Next')
      .simulate('click');

    wrap
      .find(Styled.SearchInput)
      .first()
      .simulate('change', { target: { value: 'foo' } });
    wrap
      .find(Styled.TextEditor)
      .simulate('keyup', { currentTarget: { selectionStart: 0 } });

    expect(wrap.text()).toContain('2 match(es)');
  });

  it('toggles the replace field with Ctrl+H', () => {
    const wrap = setup();

    expect(wrap.find(Styled.SearchInput)).toHaveLength(1);

    act(() => {
      window.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'h', ctrlKey: true })
      );
    });
    wrap.update();

    expect(wrap.find(Styled.SearchInput)).toHaveLength(2);
  });

  it('saves with Ctrl+S', () => {
    const wrap = setup({ filepath: '/home/zis3c/about.txt' });

    act(() => {
      window.dispatchEvent(
        new KeyboardEvent('keydown', { key: 's', ctrlKey: true })
      );
    });
    wrap.update();

    expect(wrap.text()).toContain('Saved: /home/zis3c/about.txt');
  });
});

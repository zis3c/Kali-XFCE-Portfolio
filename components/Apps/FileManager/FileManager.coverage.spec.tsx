import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { storeFactory } from '../../../test/testUtils';
import { mockReduxStore } from '../../../test/mockReduxStore';
import { useSystemDesign } from '../../../design-system/useSystemDesign';
import FileManager from './FileManager';

const { darkTheme } = useSystemDesign();

const setup = (startPath = '/home/zis3c') => {
  const store = storeFactory(mockReduxStore);
  const wrap = mount(
    <ThemeProvider theme={darkTheme}>
      <Provider store={store}>
        <FileManager startPath={startPath} />
      </Provider>
    </ThemeProvider>
  );
  return { wrap, store };
};

const root = (wrap: ReturnType<typeof mount>) => wrap.find('div').first();
const entry = (wrap: ReturnType<typeof mount>, name: string) =>
  wrap
    .find('div')
    .filterWhere((node) => node.text() === name)
    .first();
const button = (wrap: ReturnType<typeof mount>, label: string) =>
  wrap.find('button').filterWhere((node) => node.text() === label);
const pathBar = (wrap: ReturnType<typeof mount>, path: string) =>
  wrap
    .find('div')
    .filterWhere((node) => node.text() === path)
    .first();

const makeFolder = (wrap: ReturnType<typeof mount>, name: string) => {
  button(wrap, 'New Folder').simulate('click');
  wrap
    .find('input')
    .simulate('change', { target: { value: name } })
    .simulate('keydown', { key: 'Enter' });
  wrap.update();
};

describe('FileManager coverage', () => {
  it('opens a text file in the editor window', () => {
    const { wrap, store } = setup();

    entry(wrap, 'about.txt').simulate('dblclick');
    wrap.update();

    expect(store.getState().windows.openedWindows).toHaveLength(1);
    expect(store.getState().windows.openedWindows[0].windowName).toContain(
      'about.txt'
    );
  });

  it('opens the inline rename editor with F2 and cancels with Escape', () => {
    const { wrap } = setup();
    makeFolder(wrap, 'RenameMe');

    entry(wrap, 'RenameMe').simulate('click');
    root(wrap).simulate('keydown', { key: 'F2' });
    wrap.update();

    expect(wrap.text()).toContain('Rename to:');

    wrap.find('input').simulate('keydown', { key: 'Escape' });
    wrap.update();

    expect(wrap.text()).not.toContain('Rename to:');
  });

  it('opens the new folder editor with Ctrl+Shift+N and cancels', () => {
    const { wrap } = setup();

    root(wrap).simulate('keydown', {
      key: 'N',
      ctrlKey: true,
      shiftKey: true,
    });
    wrap.update();

    expect(wrap.text()).toContain('New folder name:');

    button(wrap, 'Cancel').simulate('click');
    wrap.update();

    expect(wrap.text()).not.toContain('New folder name:');
  });

  it('deletes a selected empty folder with the Delete key', () => {
    const { wrap } = setup();
    makeFolder(wrap, 'DeleteMe');

    entry(wrap, 'DeleteMe').simulate('click');
    root(wrap).simulate('keydown', { key: 'Delete' });
    wrap.update();

    expect(wrap.text()).toContain('Deleted: DeleteMe');
  });

  it('reports a cancelled rename when the name is unchanged', () => {
    const { wrap } = setup();
    makeFolder(wrap, 'CancelMe');

    entry(wrap, 'CancelMe').simulate('click');
    button(wrap, 'Rename').simulate('click');
    wrap.find('input').simulate('keydown', { key: 'Enter' });
    wrap.update();

    expect(wrap.text()).toContain('Rename canceled');
  });

  it('reports a failed create when the folder already exists', () => {
    const { wrap } = setup();

    button(wrap, 'New Folder').simulate('click');
    wrap
      .find('input')
      .simulate('change', { target: { value: 'Projects' } })
      .simulate('keydown', { key: 'Enter' });
    wrap.update();

    expect(wrap.text()).toContain('Create folder failed');
  });

  it('opens created empty folders and shows the empty state', () => {
    const { wrap } = setup();
    makeFolder(wrap, 'EmptyFolder');

    entry(wrap, 'EmptyFolder').simulate('dblclick');
    wrap.update();

    expect(wrap.text()).toContain('Folder is empty');
  });

  it('navigates up with Backspace and back home with the Home button', () => {
    const { wrap } = setup('/home/zis3c/Projects');

    root(wrap).simulate('keydown', { key: 'Backspace' });
    wrap.update();
    expect(pathBar(wrap, '/home/zis3c').length).toBeGreaterThan(0);

    button(wrap, 'Home').simulate('click');
    wrap.update();
    expect(pathBar(wrap, '/home/zis3c').length).toBeGreaterThan(0);
  });

  it('opens the selected item with Enter', () => {
    const { wrap, store } = setup();

    entry(wrap, 'about.txt').simulate('click');
    root(wrap).simulate('keydown', { key: 'Enter' });
    wrap.update();

    expect(store.getState().windows.openedWindows).toHaveLength(1);
  });

  it('does not open a file editor when nothing is selected', () => {
    const { wrap, store } = setup();

    root(wrap).simulate('keydown', { key: 'Enter' });
    root(wrap).simulate('keydown', { key: 'Delete' });
    root(wrap).simulate('keydown', { key: 'F2' });

    expect(store.getState().windows.openedWindows).toHaveLength(0);
  });

  it('keeps the inline editor inactive while it is open', () => {
    const { wrap } = setup();

    root(wrap).simulate('keydown', {
      key: 'N',
      ctrlKey: true,
      shiftKey: true,
    });
    wrap.update();

    act(() => {
      root(wrap).simulate('keydown', { key: 'Delete' });
    });

    expect(wrap.text()).toContain('New folder name:');
  });
});

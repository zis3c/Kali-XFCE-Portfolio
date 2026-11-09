import { mount } from 'enzyme';
import React from 'react';
import { withReduxAndStyledProviders } from '../../../test/testUtils';
import { resetVfs } from '../../../utils/filesystem';
import FileManager from './FileManager';

const setup = (startPath?: string) =>
  mount(withReduxAndStyledProviders(<FileManager startPath={startPath} />));

const clickButton = (wrap: ReturnType<typeof mount>, label: string) =>
  wrap.find('button').filterWhere((n) => n.text() === label);

describe('FileManager', () => {
  beforeEach(() => {
    resetVfs();
  });

  it('lists the home directory contents', () => {
    const wrap = setup();

    expect(wrap.text()).toContain('about.txt');
    expect(wrap.text()).toContain('Documents');
    expect(wrap.text()).toContain('items');
  });

  it('navigates using the sidebar', () => {
    const wrap = setup();

    wrap
      .find('button')
      .filterWhere((n) => n.text() === 'Documents')
      .simulate('click');

    expect(
      wrap.find('div').filterWhere((n) => n.text() === '/home/zis3c/Documents')
        .length
    ).toBeGreaterThan(0);
  });

  it('creates a new folder from the toolbar', () => {
    const wrap = setup();

    clickButton(wrap, 'New Folder').simulate('click');
    const input = wrap.find('input').simulate('change', {
      target: { value: 'Notes' },
    });
    input.simulate('keydown', { key: 'Enter' });
    wrap.update();

    expect(wrap.text()).toContain('Folder created: Notes');
    expect(wrap.text()).toContain('Notes');
  });

  it('rejects an empty folder name', () => {
    const wrap = setup();

    clickButton(wrap, 'New Folder').simulate('click');
    wrap
      .find('input')
      .simulate('change', { target: { value: '   ' } })
      .simulate('keydown', { key: 'Enter' });
    wrap.update();

    expect(wrap.text()).toContain('Folder name cannot be empty');
  });

  it('renames a selected file', () => {
    const wrap = setup();

    wrap
      .find('div')
      .filterWhere((n) => n.text() === 'about.txt')
      .first()
      .simulate('click');
    clickButton(wrap, 'Rename').simulate('click');
    wrap
      .find('input')
      .simulate('change', { target: { value: 'profile.txt' } })
      .simulate('keydown', { key: 'Enter' });
    wrap.update();

    expect(wrap.text()).toContain('Renamed to: profile.txt');
    expect(wrap.text()).toContain('profile.txt');
  });

  it('deletes an empty folder', () => {
    const wrap = setup();

    clickButton(wrap, 'New Folder').simulate('click');
    wrap
      .find('input')
      .simulate('change', { target: { value: 'Temp' } })
      .simulate('keydown', { key: 'Enter' });

    wrap
      .find('div')
      .filterWhere((n) => n.text() === 'Temp')
      .first()
      .simulate('click');
    clickButton(wrap, 'Delete').simulate('click');
    wrap.update();

    expect(wrap.text()).toContain('Deleted: Temp');
  });

  it('protects non-empty folders from deletion', () => {
    const wrap = setup('/home/zis3c');

    wrap
      .find('div')
      .filterWhere((n) => n.text() === 'Projects')
      .first()
      .simulate('click');
    wrap
      .find('div')
      .filterWhere((n) => n.text() === 'Projects')
      .first()
      .simulate('dblclick');
    wrap.update();

    const folder = wrap
      .find('div')
      .filterWhere((n) => n.text() === 'CloudSentinel')
      .first();
    folder.simulate('click');
    clickButton(wrap, 'Delete').simulate('click');
    wrap.update();

    expect(wrap.text()).toContain('Delete failed');
  });

  it('goes back after navigating', () => {
    const wrap = setup();

    wrap
      .find('button')
      .filterWhere((n) => n.text() === 'Documents')
      .simulate('click');
    wrap
      .find('button')
      .filterWhere((n) => n.prop('title') === 'Go back')
      .simulate('click');
    wrap.update();

    expect(wrap.text()).toContain('/home/zis3c');
  });
});

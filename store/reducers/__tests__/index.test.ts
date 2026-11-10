import { HYDRATE } from 'next-redux-wrapper';
import { mockReduxStore } from '../../../test/mockReduxStore';
import { reducer } from '../index';

describe('root reducer', () => {
  it('builds the initial state from child reducers', () => {
    const state = reducer(undefined, { type: '@@INIT' });

    expect(state.ui.theme).toBe('dark');
    expect(state.windows.activeWorkspace).toBe(1);
    expect(state.todos.todos).toEqual([]);
  });

  it('merges the hydrated server state', () => {
    const state = reducer(mockReduxStore, {
      type: HYDRATE,
      payload: { ui: { ...mockReduxStore.ui, theme: 'light' } },
    });

    expect(state.ui.theme).toBe('light');
    expect(state.windows.activeWorkspace).toBe(1);
  });
});

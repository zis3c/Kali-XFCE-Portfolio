import { FiPlusCircle } from 'react-icons/fi';
import { FiCircle } from 'react-icons/fi';
import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { storeFactory } from '../../test/testUtils';
import { mockReduxStore } from '../../test/mockReduxStore';
import { useSystemDesign } from '../../design-system/useSystemDesign';
import TodoWidget from './TodoWidget';
import * as Styled from './TodoWidget.styles';

const { darkTheme } = useSystemDesign();

const setup = () => {
  const store = storeFactory(mockReduxStore);
  const wrap = mount(
    <ThemeProvider theme={darkTheme}>
      <Provider store={store}>
        <TodoWidget />
      </Provider>
    </ThemeProvider>
  );
  return { wrap, store };
};

describe('TodoWidget behavior', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it('adds a todo through the form', () => {
    const { wrap, store } = setup();

    wrap.find(FiPlusCircle).simulate('click');
    wrap
      .find(Styled.TodoInput)
      .simulate('change', { target: { value: 'Audit dependencies' } });
    wrap.find('form').simulate('submit', { preventDefault: jest.fn() });
    wrap.update();

    expect(store.getState().todos.todos).toHaveLength(1);
    expect(wrap.text()).toContain('Audit dependencies');
  });

  it('marks a todo complete and removes it after the delay', () => {
    const { wrap, store } = setup();

    wrap.find(FiPlusCircle).simulate('click');
    wrap
      .find(Styled.TodoInput)
      .simulate('change', { target: { value: 'Write tests' } })
      .simulate('keydown', { key: 'Enter' });
    wrap.find('form').simulate('submit', { preventDefault: jest.fn() });
    wrap.update();

    wrap.find(FiCircle).simulate('click');

    act(() => {
      jest.advanceTimersByTime(1500);
    });
    wrap.update();

    expect(store.getState().todos.todos).toHaveLength(0);
  });
});

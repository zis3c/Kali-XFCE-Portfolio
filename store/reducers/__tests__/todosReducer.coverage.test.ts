import {
  TodosAction,
  TodosActionTypes,
  TodosState,
} from '../../../types/redux/todos-reducer-types';
import { todosReducer } from '../todosReducer';

const todo = {
  id: '1',
  todoText: 'Write tests',
  isCompleted: false,
  isHighlighted: false,
};

const state: TodosState = { todos: [todo] };
const reduce = (action: TodosAction) => todosReducer(state, action);

describe('todosReducer coverage', () => {
  it('adds a todo', () => {
    const next = reduce({
      type: TodosActionTypes.ADD_TODO,
      payload: { ...todo, id: '2' },
    });

    expect(next.todos).toHaveLength(2);
  });

  it('marks a todo completed', () => {
    const next = reduce({
      type: TodosActionTypes.MARK_TODO_COMPLETED,
      payload: '1',
    });

    expect(next.todos[0].isCompleted).toBe(true);
  });

  it('toggles the highlighted state', () => {
    const next = reduce({
      type: TodosActionTypes.MARK_TODO_HIGHLIGHTED,
      payload: '1',
    });

    expect(next.todos[0].isHighlighted).toBe(true);
  });

  it('deletes a todo', () => {
    expect(
      reduce({ type: TodosActionTypes.DELETE_TODO, payload: '1' }).todos
    ).toHaveLength(0);
  });

  it('returns the same state for unknown actions', () => {
    expect(
      todosReducer(state, { type: 'UNKNOWN' } as unknown as TodosAction)
    ).toBe(state);
  });
});

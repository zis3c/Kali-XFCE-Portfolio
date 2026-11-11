import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction, combineReducers } from 'redux';
import { UIstate } from '../../types/redux/ui-reducer-types';
import { uiReducer } from './uiReducer';
import { windowsReducer } from './windowsReducer';
import { WindowsState } from '../../types/redux/windows-reducer-types';

export const rootReducer = combineReducers({
  ui: uiReducer,
  windows: windowsReducer,
});

export type State = {
  ui: UIstate;
  windows: WindowsState;
};

// https://stackoverflow.com/questions/64139344/how-to-use-typescript-next-redux-wrapper-getserversideprops
// https://github.com/vercel/next.js/tree/canary/examples/with-redux-wrapper  example of implementation redux with server-side rendering
export const reducer = (state: State | undefined, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };

    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

export type RootState = ReturnType<typeof reducer>;
export type LocalRootState = ReturnType<typeof rootReducer>;

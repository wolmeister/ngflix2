import * as auth from './reducers/auth.reducers';

export { State as AuthState } from './reducers/auth.reducers';

export interface AppState {
  auth: auth.State;
}

export const reducers = {
  auth: auth.reducer,
};

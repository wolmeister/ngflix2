import { User } from '../../models/user';
import { AuthActionTypes, All } from '../actions/auth.actions';

export interface State {
  user: User;
  error: string;
}

const savedUserString = localStorage.getItem('@@ngflix2/auth/user');

export const initialState: State = {
  user: savedUserString ? JSON.parse(savedUserString) : null,
  error: null,
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case AuthActionTypes.SIGN_IN_SUCCESS: {
      return {
        ...state,
        error: null,
        user: action.payload,
      };
    }
    case AuthActionTypes.SIGN_IN_ERROR: {
      return {
        ...state,
        error: action.payload,
        user: null,
      };
    }
    case AuthActionTypes.SIGN_OUT: {
      return {
        ...state,
        user: null,
        error: null,
      };
    }
    default: {
      return state;
    }
  }
}

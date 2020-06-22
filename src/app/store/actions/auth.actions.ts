import { Action } from '@ngrx/store';

import { User } from '../../models/user';

export enum AuthActionTypes {
  SIGN_IN = '[Auth] SignIn',
  SIGN_IN_SUCCESS = '[Auth] SignInSuccess',
  SIGN_IN_ERROR = '[Auth] SignInError',
  SIGN_OUT = '[Auth] SignOut',
}

export class SignIn implements Action {
  readonly type = AuthActionTypes.SIGN_IN;
  constructor(
    public payload: {
      email: string;
      password: string;
    }
  ) {}
}

export class SingInSuccess implements Action {
  readonly type = AuthActionTypes.SIGN_IN_SUCCESS;
  constructor(public payload: User) {}
}

export class SingInError implements Action {
  readonly type = AuthActionTypes.SIGN_IN_ERROR;
  constructor(public payload: string) {}
}

export class SignOut implements Action {
  readonly type = AuthActionTypes.SIGN_OUT;
}

export type All = SignIn | SingInSuccess | SingInError | SignOut;

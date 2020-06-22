import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';

import { UserService } from '../../services/user.service';
import {
  AuthActionTypes,
  SignIn,
  SingInError,
  SingInSuccess,
} from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private userService: UserService,
    private router: Router
  ) {}

  signIn = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActionTypes.SIGN_IN),
      map((action: SignIn) => {
        const { email, password } = action.payload;
        if (!email || !password) {
          return new SingInError('Please enter the email and password.');
        }
        const user = this.userService.getUser(email);
        if (!user || user.password !== password) {
          return new SingInError('Invalid email or password.');
        }
        localStorage.setItem('@@ngflix2/auth/user', JSON.stringify(user));
        this.router.navigateByUrl('/');
        return new SingInSuccess(user);
      })
    )
  );

  signOut = createEffect(
    () =>
      this.actions.pipe(
        ofType(AuthActionTypes.SIGN_OUT),
        tap(() => {
          localStorage.removeItem('@@ngflix2/auth/user');
          this.router.navigateByUrl('/login');
        })
      ),
    { dispatch: false }
  );
}

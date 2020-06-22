import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../../../store/app-store.state';
import { SignIn } from '../../../../store/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private store: Store<AppState>) {
    store
      .select((state) => state.auth.error)
      .subscribe((error) => {
        this.error = error;
      });
  }

  onSubmit() {
    this.store.dispatch(
      new SignIn({
        email: this.email,
        password: this.password,
      })
    );
  }
}

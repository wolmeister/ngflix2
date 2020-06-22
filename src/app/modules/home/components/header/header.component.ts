import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../../../store/app-store.state';
import { SignOut } from '../../../../store/actions/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() transparent = false;

  constructor(private store: Store<AppState>) {}

  handleLogout() {
    this.store.dispatch(new SignOut());
  }
}

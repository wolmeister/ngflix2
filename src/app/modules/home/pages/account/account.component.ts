import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../../../store/app-store.state';
import { User } from '../../../../models/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  user: User;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store
      .select((state) => state.auth.user)
      .subscribe((user) => {
        this.user = user;
      });
  }
}

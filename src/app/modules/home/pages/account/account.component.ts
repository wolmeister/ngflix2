import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../../../store/app-store.state';
import { MediaService } from '../../../../services/media.service';
import { User } from '../../../../models/user';
import { Media } from '../../../../models/media';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  user: User;
  lastWatchedMedias: Media[] = [];

  constructor(
    private store: Store<AppState>,
    private mediaService: MediaService
  ) {}

  ngOnInit() {
    this.subscribeToStore();
  }

  subscribeToStore() {
    this.store
      .select((state) => state.auth.user)
      .subscribe((user) => {
        this.user = user;
        this.lastWatchedMedias = this.mediaService.getLastWatchedMedias(user);
      });
  }
}

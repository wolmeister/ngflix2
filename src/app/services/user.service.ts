import { Injectable } from '@angular/core';

import { MediaProgressService } from './media-progress.service';
import { User } from '../models/user';
import { users } from './__data__/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private mediaProgressService: MediaProgressService) {}

  getUser(idOrEmail: number | string): User {
    if (typeof idOrEmail === 'number') {
      return users.find((u) => u.id === idOrEmail) || null;
    }
    return users.find((u) => u.email === idOrEmail) || null;
  }

  getUsersWhoWatchedTheMost(): User[] {
    const progresses = this.mediaProgressService.getMediaProgresses();
    const countByUser: { [key: number]: number } = {};
    progresses.forEach(({ userId }) => {
      if (!countByUser[userId]) {
        countByUser[userId] = 0;
      }
      countByUser[userId] += 1;
    });
    return Object.entries(countByUser)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 3)
      .map(([id]) => this.getUser(parseInt(id, 10)));
  }
}

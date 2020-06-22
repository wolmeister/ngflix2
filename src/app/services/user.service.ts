import { Injectable } from '@angular/core';

import { User } from '../models/user';
import { users } from './__data__/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getUser(idOrEmail: number | string): User {
    if (typeof idOrEmail === 'number') {
      return users.find((u) => u.id === idOrEmail) || null;
    }
    return users.find((u) => u.email === idOrEmail) || null;
  }
}

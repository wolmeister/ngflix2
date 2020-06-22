import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { AppState } from '../store/app-store.state';
import { RoutesConfig } from '../configs/routes.config';
import { getUrl } from '../utils/route.utils';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    return this.store
      .select((state) => state.auth.user)
      .pipe(
        map((user) => {
          if (route.data.isPrivate && !user) {
            const path = getUrl(
              RoutesConfig.authentication.login,
              RoutesConfig.authentication.basePath
            );
            this.router.navigateByUrl(path);
            return false;
          }
          if (route.data.isAuthPage && user) {
            const path = getUrl(
              RoutesConfig.home.home,
              RoutesConfig.home.basePath
            );
            this.router.navigateByUrl(path);
            return false;
          }
          return true;
        })
      );
  }
}

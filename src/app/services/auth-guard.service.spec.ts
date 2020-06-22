import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Router, ActivatedRouteSnapshot } from '@angular/router';

import { AppState } from '../store/app-store.state';
import { User } from '../models/user';
import { RoutesConfig } from '../configs/routes.config';
import { getUrl } from '../utils/route.utils';
import { AuthGuardService } from './auth-guard.service';

class MockActivatedRouteSnapshot {
  private routeData: any = {};

  get data() {
    return this.routeData;
  }
}

describe('AuthGuardService', () => {
  const user: User = {
    id: 1,
    name: 'name',
    email: 'email',
    password: 'password',
    country: 'country',
    phone: 'phone',
    plan: 'plan',
  };

  let service: AuthGuardService;
  let store: MockStore<AppState>;
  let router: Router;
  let route: ActivatedRouteSnapshot;
  let initialState: AppState;

  beforeEach(() => {
    initialState = {
      auth: {
        error: '',
        user: null,
      },
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRouteSnapshot,
          useClass: MockActivatedRouteSnapshot,
        },
      ],
    });
    service = TestBed.inject(AuthGuardService);
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRouteSnapshot);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true if the page is public and no user is logged in', () => {
    service.canActivate(route).subscribe((canActivate) => {
      expect(canActivate).toBeTrue();
    });
  });

  it('should return true if the page is public and an user is logged in', () => {
    store.setState({
      auth: {
        error: '',
        user,
      },
    });

    service.canActivate(route).subscribe((canActivate) => {
      expect(canActivate).toBeTrue();
    });
  });

  it('should return false if the page is private and no user is logged in', () => {
    spyOnProperty(route, 'data').and.returnValue({
      isPrivate: true,
    });

    service.canActivate(route).subscribe((canActivate) => {
      expect(canActivate).toBeFalse();
    });
  });

  it('should redirect to login if the page is private and no user is logged in', () => {
    spyOn(router, 'navigateByUrl');
    spyOnProperty(route, 'data').and.returnValue({
      isPrivate: true,
    });

    service.canActivate(route).subscribe(() => {
      const path = getUrl(
        RoutesConfig.authentication.login,
        RoutesConfig.authentication.basePath
      );
      expect(router.navigateByUrl).toHaveBeenCalled();
      expect(router.navigateByUrl).toHaveBeenCalledWith(path);
    });
  });

  it('should return true if the page is private and a user is logged in', () => {
    spyOnProperty(route, 'data').and.returnValue({
      isPrivate: true,
    });
    store.setState({
      auth: {
        error: '',
        user,
      },
    });

    service.canActivate(route).subscribe((canActivate) => {
      expect(canActivate).toBeTrue();
    });
  });

  it('should return true if the page is an auth page and no user is logged in', () => {
    spyOnProperty(route, 'data').and.returnValue({
      isAuthPage: true,
    });

    service.canActivate(route).subscribe((canActivate) => {
      expect(canActivate).toBeTrue();
    });
  });

  it('should return false if the page is an auth page and a user is logged in', () => {
    spyOnProperty(route, 'data').and.returnValue({
      isAuthPage: true,
    });
    store.setState({
      auth: {
        error: '',
        user,
      },
    });

    service.canActivate(route).subscribe((canActivate) => {
      expect(canActivate).toBeFalse();
    });
  });

  it('should redirect to home if the page is an auth page and a user is logged in', () => {
    spyOn(router, 'navigateByUrl');
    spyOnProperty(route, 'data').and.returnValue({
      isAuthPage: true,
    });
    store.setState({
      auth: {
        error: '',
        user,
      },
    });

    service.canActivate(route).subscribe(() => {
      const path = getUrl(RoutesConfig.home.home, RoutesConfig.home.basePath);
      expect(router.navigateByUrl).toHaveBeenCalled();
      expect(router.navigateByUrl).toHaveBeenCalledWith(path);
    });
  });
});

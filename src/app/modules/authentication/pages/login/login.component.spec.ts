import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';

import { AppStoreModule } from '../../../../store/app-store.module';
import { AppState } from '../../../../store/app-store.state';
import { LoginComponent } from './login.component';
import { SignIn } from '../../../../store/actions/auth.actions';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [RouterTestingModule, AppStoreModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    store = TestBed.inject(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit() should subscribe to the store', () => {
    spyOn(component, 'subscribeToStore');

    component.ngOnInit();

    expect(component.subscribeToStore).toHaveBeenCalled();
  });

  it('#onSubmit() should call store.dispatch with email and password', () => {
    spyOn(store, 'dispatch');

    component.email = 'email';
    component.password = 'pw';
    component.onSubmit();

    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(
      new SignIn({
        email: 'email',
        password: 'pw',
      })
    );
  });
});

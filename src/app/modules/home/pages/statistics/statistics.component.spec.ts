import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaService } from '../../../../services/media.service';
import { UserService } from '../../../../services/user.service';
import { StatisticsComponent } from './statistics.component';

describe('StatisticsComponent', () => {
  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;
  let mediaService: MediaService;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatisticsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsComponent);
    mediaService = TestBed.inject(MediaService);
    userService = TestBed.inject(UserService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit() should call mediaService.getTopMediasByTags', () => {
    spyOn(mediaService, 'getTopMediasByTags');

    component.ngOnInit();
    fixture.detectChanges();

    expect(mediaService.getTopMediasByTags).toHaveBeenCalled();
  });

  it('#ngOnInit() should call mediaService.getTopMediasByCountries', () => {
    spyOn(mediaService, 'getTopMediasByCountries').and.returnValue([]);

    component.ngOnInit();
    fixture.detectChanges();

    expect(mediaService.getTopMediasByCountries).toHaveBeenCalled();
  });

  it('#ngOnInit() should set country to the first country of mediaService.getTopMediasByCountries', () => {
    spyOn(mediaService, 'getTopMediasByCountries').and.returnValue([
      { country: 'a', medias: [] },
      { country: 'b', medias: [] },
    ]);

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.country).toBe('a');
  });

  it('#ngOnInit() should call userService.getUsersWhoWatchedTheMost', () => {
    spyOn(userService, 'getUsersWhoWatchedTheMost').and.returnValue([]);

    component.ngOnInit();
    fixture.detectChanges();

    expect(userService.getUsersWhoWatchedTheMost).toHaveBeenCalled();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { AppStoreModule } from '../../../../store/app-store.module';
import { MediaService } from '../../../../services/media.service';
import { BillboardService } from '../../../../services/billboard.service';
import { BillboardMedia } from '../../../../models/billboard-media';
import { RoutesConfig } from '../../../../configs/routes.config';
import { getUrl } from '../../../../utils/route.utils';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  const billboard: BillboardMedia = {
    id: 1,
    background: '',
    title: 'title',
    supplemental: 'supplemental',
    synopsis: 'synopsis',
    mediaId: 1,
  };
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mediaService: MediaService;
  let billboardService: BillboardService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [RouterTestingModule, AppStoreModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    mediaService = TestBed.inject(MediaService);
    billboardService = TestBed.inject(BillboardService);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit() should call media and billboard services', () => {
    spyOn(mediaService, 'getMedias').and.returnValue([]);
    spyOn(billboardService, 'getBillboard').and.returnValue(billboard);

    component.ngOnInit();

    expect(mediaService.getMedias).toHaveBeenCalled();
    expect(billboardService.getBillboard).toHaveBeenCalled();
  });

  it('#handlePlay() should navigate to the player route', () => {
    spyOn(router, 'navigateByUrl');

    component.handlePlay(1);

    const url = getUrl('1', RoutesConfig.watch.basePath);
    expect(router.navigateByUrl).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith(url);
  });
});

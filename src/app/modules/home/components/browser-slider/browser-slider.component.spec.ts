import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Media } from '../../../../models/media';
import { BrowserSliderComponent } from './browser-slider.component';

describe('BrowserSliderComponent', () => {
  const media: Media = {
    id: 1,
    title: 'Media',
    art: '',
    titleArt: '',
    file: '',
    synopsis: 'synopsis',
    rating: 18,
    duration: '1h',
    tags: ['tag'],
  };

  let component: BrowserSliderComponent;
  let fixture: ComponentFixture<BrowserSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BrowserSliderComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#handlePlay() should emit playItem with the media', () => {
    spyOn(component.playItem, 'emit');

    component.handlePlay(media);

    expect(component.playItem.emit).toHaveBeenCalled();
    expect(component.playItem.emit).toHaveBeenCalledWith(media);
  });

  it('#handleInfo() should set the active item', () => {
    component.handleInfo(media);

    expect(component.activeItem).toBe(media);
  });

  it('#handleClose() should clear the active item', () => {
    component.handleClose();

    expect(component.activeItem).toBeNull();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Media } from '../../../../models/media';
import { SliderItemComponent } from './slider-item.component';

describe('SliderItemComponent', () => {
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

  let component: SliderItemComponent;
  let fixture: ComponentFixture<SliderItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SliderItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderItemComponent);
    component = fixture.componentInstance;
    component.item = media;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#handlePlayClick() should emit playclick with the item', () => {
    spyOn(component.playclick, 'emit');

    component.handlePlayClick();

    expect(component.playclick.emit).toHaveBeenCalled();
    expect(component.playclick.emit).toHaveBeenCalledWith(component.item);
  });

  it('#handleInfoClick() should emit infoclick with the item', () => {
    spyOn(component.infoclick, 'emit');

    component.handleInfoClick();

    expect(component.infoclick.emit).toHaveBeenCalled();
    expect(component.infoclick.emit).toHaveBeenCalledWith(component.item);
  });
});

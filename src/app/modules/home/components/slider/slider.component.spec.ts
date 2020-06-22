import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Media } from '../../../../models/media';
import { SliderComponent } from './slider.component';

describe('SliderComponent', () => {
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

  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SliderComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#handlePlayClick() should emit playItem with the item', () => {
    spyOn(component.playItem, 'emit');

    component.handlePlayClick(media);

    expect(component.playItem.emit).toHaveBeenCalled();
    expect(component.playItem.emit).toHaveBeenCalledWith(media);
  });

  it('#handleMouseEnter() should set the hoverIndex', () => {
    component.handleMouseEnter(1);

    expect(component.hoverIndex).toBe(1);
  });

  it('#handleMouseLeave() should set the hoverIndex to -1', () => {
    component.handleMouseLeave();

    expect(component.hoverIndex).toBe(-1);
  });
});

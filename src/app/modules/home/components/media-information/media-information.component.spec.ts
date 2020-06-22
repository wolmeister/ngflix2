import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Media } from '../../../../models/media';
import { MediaInformationComponent } from './media-information.component';

describe('MediaInformationComponent', () => {
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
  let component: MediaInformationComponent;
  let fixture: ComponentFixture<MediaInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MediaInformationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaInformationComponent);
    component = fixture.componentInstance;
    component.item = media;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

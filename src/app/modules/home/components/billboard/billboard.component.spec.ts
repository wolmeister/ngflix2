import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillboardMedia } from '../../../../models/billboard-media';
import { BillboardComponent } from './billboard.component';

describe('BillboardComponent', () => {
  const billboard: BillboardMedia = {
    id: 1,
    background: '',
    title: 'title',
    supplemental: 'supplemental',
    synopsis: 'synopsis',
    mediaId: 1,
  };
  let component: BillboardComponent;
  let fixture: ComponentFixture<BillboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BillboardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillboardComponent);
    component = fixture.componentInstance;
    component.billboard = billboard;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserSliderComponent } from './browser-slider.component';

describe('BrowserSliderComponent', () => {
  let component: BrowserSliderComponent;
  let fixture: ComponentFixture<BrowserSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowserSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

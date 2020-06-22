import { TestBed } from '@angular/core/testing';

import { MediaProgressService } from './media-progress.service';

describe('MediaProgressService', () => {
  let service: MediaProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaProgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

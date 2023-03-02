import { TestBed } from '@angular/core/testing';

import { GoogleanalyticsService } from './googleanalytics.service';

describe('GoogleanalyticsService', () => {
  let service: GoogleanalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleanalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

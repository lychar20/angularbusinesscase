import { TestBed } from '@angular/core/testing';

import { HourtlyRateService } from './hourtly-rate.service';

describe('HourtlyRateService', () => {
  let service: HourtlyRateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HourtlyRateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

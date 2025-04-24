import { TestBed } from '@angular/core/testing';

import { FitmentService } from './fitment.service';

describe('FitmentService', () => {
  let service: FitmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FitmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

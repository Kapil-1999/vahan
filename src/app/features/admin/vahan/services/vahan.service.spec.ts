import { TestBed } from '@angular/core/testing';

import { VahanService } from './vahan.service';

describe('VahanService', () => {
  let service: VahanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VahanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

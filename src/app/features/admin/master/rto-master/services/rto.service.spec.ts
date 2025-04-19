import { TestBed } from '@angular/core/testing';

import { RtoService } from './rto.service';

describe('RtoService', () => {
  let service: RtoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RtoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

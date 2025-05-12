import { TestBed } from '@angular/core/testing';

import { MycomplainService } from './mycomplain.service';

describe('MycomplainService', () => {
  let service: MycomplainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MycomplainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

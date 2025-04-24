import { TestBed } from '@angular/core/testing';

import { KycPendingService } from './kyc-pending.service';

describe('KycPendingService', () => {
  let service: KycPendingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KycPendingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ServiceMasterService } from './service-master.service';

describe('ServiceMasterService', () => {
  let service: ServiceMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

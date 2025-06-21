import { TestBed } from '@angular/core/testing';

import { AdminManufacturerService } from './admin-manufacturer.service';

describe('AdminManufacturerService', () => {
  let service: AdminManufacturerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminManufacturerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

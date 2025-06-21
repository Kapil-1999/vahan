import { TestBed } from '@angular/core/testing';

import { AuthorityPlanService } from './authority-plan.service';

describe('AuthorityPlanService', () => {
  let service: AuthorityPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorityPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

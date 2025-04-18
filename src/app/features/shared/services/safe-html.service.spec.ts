import { TestBed } from '@angular/core/testing';

import { SafeHtmlService } from './safe-html.service';

describe('SafeHtmlService', () => {
  let service: SafeHtmlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SafeHtmlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

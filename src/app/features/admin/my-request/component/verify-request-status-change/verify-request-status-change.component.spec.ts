import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyRequestStatusChangeComponent } from './verify-request-status-change.component';

describe('VerifyRequestStatusChangeComponent', () => {
  let component: VerifyRequestStatusChangeComponent;
  let fixture: ComponentFixture<VerifyRequestStatusChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerifyRequestStatusChangeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyRequestStatusChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

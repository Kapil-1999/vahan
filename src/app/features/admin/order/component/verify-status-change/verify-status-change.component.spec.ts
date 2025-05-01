import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyStatusChangeComponent } from './verify-status-change.component';

describe('VerifyStatusChangeComponent', () => {
  let component: VerifyStatusChangeComponent;
  let fixture: ComponentFixture<VerifyStatusChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerifyStatusChangeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyStatusChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

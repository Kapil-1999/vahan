import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageKycPendingComponent } from './manage-kyc-pending.component';

describe('ManageKycPendingComponent', () => {
  let component: ManageKycPendingComponent;
  let fixture: ComponentFixture<ManageKycPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageKycPendingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageKycPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

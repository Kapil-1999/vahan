import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRenewalComponent } from './manage-renewal.component';

describe('ManageRenewalComponent', () => {
  let component: ManageRenewalComponent;
  let fixture: ComponentFixture<ManageRenewalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageRenewalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageRenewalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

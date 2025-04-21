import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAuthorityPlanComponent } from './manage-authority-plan.component';

describe('ManageAuthorityPlanComponent', () => {
  let component: ManageAuthorityPlanComponent;
  let fixture: ComponentFixture<ManageAuthorityPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageAuthorityPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAuthorityPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAuthorityPlanComponent } from './create-authority-plan.component';

describe('CreateAuthorityPlanComponent', () => {
  let component: CreateAuthorityPlanComponent;
  let fixture: ComponentFixture<CreateAuthorityPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAuthorityPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAuthorityPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

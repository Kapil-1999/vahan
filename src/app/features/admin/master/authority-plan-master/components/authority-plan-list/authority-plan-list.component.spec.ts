import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorityPlanListComponent } from './authority-plan-list.component';

describe('AuthorityPlanListComponent', () => {
  let component: AuthorityPlanListComponent;
  let fixture: ComponentFixture<AuthorityPlanListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorityPlanListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorityPlanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

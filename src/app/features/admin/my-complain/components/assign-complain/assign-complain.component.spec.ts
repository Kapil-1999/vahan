import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignComplainComponent } from './assign-complain.component';

describe('AssignComplainComponent', () => {
  let component: AssignComplainComponent;
  let fixture: ComponentFixture<AssignComplainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignComplainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignComplainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

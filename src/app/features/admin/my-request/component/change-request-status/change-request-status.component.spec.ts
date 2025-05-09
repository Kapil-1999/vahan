import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRequestStatusComponent } from './change-request-status.component';

describe('ChangeRequestStatusComponent', () => {
  let component: ChangeRequestStatusComponent;
  let fixture: ComponentFixture<ChangeRequestStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeRequestStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeRequestStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

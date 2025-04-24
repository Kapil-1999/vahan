import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSupportComponent } from './manage-support.component';

describe('ManageSupportComponent', () => {
  let component: ManageSupportComponent;
  let fixture: ComponentFixture<ManageSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageSupportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

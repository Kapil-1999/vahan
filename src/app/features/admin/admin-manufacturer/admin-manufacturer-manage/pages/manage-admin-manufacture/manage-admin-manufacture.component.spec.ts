import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAdminManufactureComponent } from './manage-admin-manufacture.component';

describe('ManageAdminManufactureComponent', () => {
  let component: ManageAdminManufactureComponent;
  let fixture: ComponentFixture<ManageAdminManufactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageAdminManufactureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAdminManufactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

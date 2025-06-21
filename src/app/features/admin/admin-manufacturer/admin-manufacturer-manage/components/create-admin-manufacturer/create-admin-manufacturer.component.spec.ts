import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdminManufacturerComponent } from './create-admin-manufacturer.component';

describe('CreateAdminManufacturerComponent', () => {
  let component: CreateAdminManufacturerComponent;
  let fixture: ComponentFixture<CreateAdminManufacturerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAdminManufacturerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAdminManufacturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

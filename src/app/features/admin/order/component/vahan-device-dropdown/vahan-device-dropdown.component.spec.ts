import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VahanDeviceDropdownComponent } from './vahan-device-dropdown.component';

describe('VahanDeviceDropdownComponent', () => {
  let component: VahanDeviceDropdownComponent;
  let fixture: ComponentFixture<VahanDeviceDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VahanDeviceDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VahanDeviceDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

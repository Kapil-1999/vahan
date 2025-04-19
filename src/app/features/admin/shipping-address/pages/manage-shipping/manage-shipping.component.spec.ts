import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageShippingComponent } from './manage-shipping.component';

describe('ManageShippingComponent', () => {
  let component: ManageShippingComponent;
  let fixture: ComponentFixture<ManageShippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageShippingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

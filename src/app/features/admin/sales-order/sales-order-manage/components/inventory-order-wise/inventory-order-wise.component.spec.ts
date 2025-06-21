import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryOrderWiseComponent } from './inventory-order-wise.component';

describe('InventoryOrderWiseComponent', () => {
  let component: InventoryOrderWiseComponent;
  let fixture: ComponentFixture<InventoryOrderWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InventoryOrderWiseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryOrderWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

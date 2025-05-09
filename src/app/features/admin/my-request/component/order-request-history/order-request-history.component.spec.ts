import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderRequestHistoryComponent } from './order-request-history.component';

describe('OrderRequestHistoryComponent', () => {
  let component: OrderRequestHistoryComponent;
  let fixture: ComponentFixture<OrderRequestHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderRequestHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderRequestHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

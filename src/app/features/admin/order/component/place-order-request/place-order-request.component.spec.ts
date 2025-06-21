import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceOrderRequestComponent } from './place-order-request.component';

describe('PlaceOrderRequestComponent', () => {
  let component: PlaceOrderRequestComponent;
  let fixture: ComponentFixture<PlaceOrderRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaceOrderRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaceOrderRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

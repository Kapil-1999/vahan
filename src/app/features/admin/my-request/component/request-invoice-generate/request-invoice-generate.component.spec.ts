import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestInvoiceGenerateComponent } from './request-invoice-generate.component';

describe('RequestInvoiceGenerateComponent', () => {
  let component: RequestInvoiceGenerateComponent;
  let fixture: ComponentFixture<RequestInvoiceGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestInvoiceGenerateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestInvoiceGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

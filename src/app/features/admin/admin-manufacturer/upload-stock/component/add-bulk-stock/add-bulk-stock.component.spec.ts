import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBulkStockComponent } from './add-bulk-stock.component';

describe('AddBulkStockComponent', () => {
  let component: AddBulkStockComponent;
  let fixture: ComponentFixture<AddBulkStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBulkStockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBulkStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

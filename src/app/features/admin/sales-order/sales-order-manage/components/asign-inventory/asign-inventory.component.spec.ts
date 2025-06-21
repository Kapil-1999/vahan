import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignInventoryComponent } from './asign-inventory.component';

describe('AsignInventoryComponent', () => {
  let component: AsignInventoryComponent;
  let fixture: ComponentFixture<AsignInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsignInventoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

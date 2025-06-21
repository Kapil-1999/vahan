import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSalesManagerComponent } from './create-sales-manager.component';

describe('CreateSalesManagerComponent', () => {
  let component: CreateSalesManagerComponent;
  let fixture: ComponentFixture<CreateSalesManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSalesManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSalesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

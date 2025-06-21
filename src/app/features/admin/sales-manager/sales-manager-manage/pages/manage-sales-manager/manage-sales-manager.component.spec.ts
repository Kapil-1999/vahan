import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSalesManagerComponent } from './manage-sales-manager.component';

describe('ManageSalesManagerComponent', () => {
  let component: ManageSalesManagerComponent;
  let fixture: ComponentFixture<ManageSalesManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageSalesManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSalesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

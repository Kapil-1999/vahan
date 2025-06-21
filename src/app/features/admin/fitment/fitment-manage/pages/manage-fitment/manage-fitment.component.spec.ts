import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFitmentComponent } from './manage-fitment.component';

describe('ManageFitmentComponent', () => {
  let component: ManageFitmentComponent;
  let fixture: ComponentFixture<ManageFitmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageFitmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageFitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

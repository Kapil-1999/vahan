import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitmentDetailComponent } from './fitment-detail.component';

describe('FitmentDetailComponent', () => {
  let component: FitmentDetailComponent;
  let fixture: ComponentFixture<FitmentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FitmentDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

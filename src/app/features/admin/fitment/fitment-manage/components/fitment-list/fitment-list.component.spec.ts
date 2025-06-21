import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitmentListComponent } from './fitment-list.component';

describe('FitmentListComponent', () => {
  let component: FitmentListComponent;
  let fixture: ComponentFixture<FitmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FitmentListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

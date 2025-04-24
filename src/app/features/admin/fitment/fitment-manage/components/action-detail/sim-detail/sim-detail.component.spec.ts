import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimDetailComponent } from './sim-detail.component';

describe('SimDetailComponent', () => {
  let component: SimDetailComponent;
  let fixture: ComponentFixture<SimDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SimDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

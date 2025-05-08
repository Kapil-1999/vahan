import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawDataFilterComponent } from './raw-data-filter.component';

describe('RawDataFilterComponent', () => {
  let component: RawDataFilterComponent;
  let fixture: ComponentFixture<RawDataFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RawDataFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawDataFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

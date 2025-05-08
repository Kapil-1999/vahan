import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawDataListComponent } from './raw-data-list.component';

describe('RawDataListComponent', () => {
  let component: RawDataListComponent;
  let fixture: ComponentFixture<RawDataListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RawDataListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

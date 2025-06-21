import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VahanListDetailsComponent } from './vahan-list-details.component';

describe('VahanListDetailsComponent', () => {
  let component: VahanListDetailsComponent;
  let fixture: ComponentFixture<VahanListDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VahanListDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VahanListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

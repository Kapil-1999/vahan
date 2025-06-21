import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VahanListComponent } from './vahan-list.component';

describe('VahanListComponent', () => {
  let component: VahanListComponent;
  let fixture: ComponentFixture<VahanListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VahanListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VahanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

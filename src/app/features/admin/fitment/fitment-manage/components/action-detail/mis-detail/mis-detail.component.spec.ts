import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisDetailComponent } from './mis-detail.component';

describe('MisDetailComponent', () => {
  let component: MisDetailComponent;
  let fixture: ComponentFixture<MisDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MisDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

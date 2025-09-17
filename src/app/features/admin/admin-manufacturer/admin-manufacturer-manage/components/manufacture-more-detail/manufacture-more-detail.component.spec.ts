import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufactureMoreDetailComponent } from './manufacture-more-detail.component';

describe('ManufactureMoreDetailComponent', () => {
  let component: ManufactureMoreDetailComponent;
  let fixture: ComponentFixture<ManufactureMoreDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManufactureMoreDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufactureMoreDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

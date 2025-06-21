import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHsnComponent } from './manage-hsn.component';

describe('ManageHsnComponent', () => {
  let component: ManageHsnComponent;
  let fixture: ComponentFixture<ManageHsnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageHsnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageHsnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

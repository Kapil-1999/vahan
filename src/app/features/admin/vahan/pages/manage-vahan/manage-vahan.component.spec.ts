import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVahanComponent } from './manage-vahan.component';

describe('ManageVahanComponent', () => {
  let component: ManageVahanComponent;
  let fixture: ComponentFixture<ManageVahanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageVahanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageVahanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

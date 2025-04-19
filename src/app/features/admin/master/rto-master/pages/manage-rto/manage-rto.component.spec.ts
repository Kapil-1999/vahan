import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRtoComponent } from './manage-rto.component';

describe('ManageRtoComponent', () => {
  let component: ManageRtoComponent;
  let fixture: ComponentFixture<ManageRtoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageRtoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageRtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

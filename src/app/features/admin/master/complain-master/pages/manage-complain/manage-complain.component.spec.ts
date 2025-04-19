import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageComplainComponent } from './manage-complain.component';

describe('ManageComplainComponent', () => {
  let component: ManageComplainComponent;
  let fixture: ComponentFixture<ManageComplainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageComplainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageComplainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

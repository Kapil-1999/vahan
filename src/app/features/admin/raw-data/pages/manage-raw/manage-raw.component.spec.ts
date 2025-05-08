import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRawComponent } from './manage-raw.component';

describe('ManageRawComponent', () => {
  let component: ManageRawComponent;
  let fixture: ComponentFixture<ManageRawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageRawComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageRawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

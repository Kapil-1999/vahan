import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBackendMasterComponent } from './manage-backend-master.component';

describe('ManageBackendMasterComponent', () => {
  let component: ManageBackendMasterComponent;
  let fixture: ComponentFixture<ManageBackendMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageBackendMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBackendMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

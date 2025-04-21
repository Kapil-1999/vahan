import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStateMasterComponent } from './manage-state-master.component';

describe('ManageStateMasterComponent', () => {
  let component: ManageStateMasterComponent;
  let fixture: ComponentFixture<ManageStateMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageStateMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageStateMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

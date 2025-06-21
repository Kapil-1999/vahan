import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAuthorityComponent } from './manage-authority.component';

describe('ManageAuthorityComponent', () => {
  let component: ManageAuthorityComponent;
  let fixture: ComponentFixture<ManageAuthorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageAuthorityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAuthorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

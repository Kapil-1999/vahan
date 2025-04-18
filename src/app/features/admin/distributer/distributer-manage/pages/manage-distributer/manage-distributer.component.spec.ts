import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDistributerComponent } from './manage-distributer.component';

describe('ManageDistributerComponent', () => {
  let component: ManageDistributerComponent;
  let fixture: ComponentFixture<ManageDistributerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageDistributerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageDistributerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

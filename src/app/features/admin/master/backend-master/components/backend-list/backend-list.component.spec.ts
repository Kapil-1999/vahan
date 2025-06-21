import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendListComponent } from './backend-list.component';

describe('BackendListComponent', () => {
  let component: BackendListComponent;
  let fixture: ComponentFixture<BackendListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackendListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackendListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

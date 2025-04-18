import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDealerComponent } from './manage-dealer.component';

describe('ManageDealerComponent', () => {
  let component: ManageDealerComponent;
  let fixture: ComponentFixture<ManageDealerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageDealerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageDealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

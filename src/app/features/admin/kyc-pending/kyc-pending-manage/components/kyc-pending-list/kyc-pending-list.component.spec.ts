import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycPendingListComponent } from './kyc-pending-list.component';

describe('KycPendingListComponent', () => {
  let component: KycPendingListComponent;
  let fixture: ComponentFixture<KycPendingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KycPendingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KycPendingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

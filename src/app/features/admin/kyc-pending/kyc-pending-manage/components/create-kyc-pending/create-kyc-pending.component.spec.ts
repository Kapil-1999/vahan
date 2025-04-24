import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateKycPendingComponent } from './create-kyc-pending.component';

describe('CreateKycPendingComponent', () => {
  let component: CreateKycPendingComponent;
  let fixture: ComponentFixture<CreateKycPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateKycPendingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateKycPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

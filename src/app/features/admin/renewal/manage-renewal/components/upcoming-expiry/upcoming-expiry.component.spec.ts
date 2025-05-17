import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingExpiryComponent } from './upcoming-expiry.component';

describe('UpcomingExpiryComponent', () => {
  let component: UpcomingExpiryComponent;
  let fixture: ComponentFixture<UpcomingExpiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpcomingExpiryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingExpiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

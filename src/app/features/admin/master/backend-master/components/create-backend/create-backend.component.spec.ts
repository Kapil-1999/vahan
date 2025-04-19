import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBackendComponent } from './create-backend.component';

describe('CreateBackendComponent', () => {
  let component: CreateBackendComponent;
  let fixture: ComponentFixture<CreateBackendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateBackendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBackendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

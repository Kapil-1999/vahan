import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRtoComponent } from './create-rto.component';

describe('CreateRtoComponent', () => {
  let component: CreateRtoComponent;
  let fixture: ComponentFixture<CreateRtoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateRtoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

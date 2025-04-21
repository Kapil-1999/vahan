import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComplainComponent } from './create-complain.component';

describe('CreateComplainComponent', () => {
  let component: CreateComplainComponent;
  let fixture: ComponentFixture<CreateComplainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateComplainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateComplainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

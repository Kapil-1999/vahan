import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDistributerComponent } from './create-distributer.component';

describe('CreateDistributerComponent', () => {
  let component: CreateDistributerComponent;
  let fixture: ComponentFixture<CreateDistributerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateDistributerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDistributerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

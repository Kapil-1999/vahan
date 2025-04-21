import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHsnComponent } from './create-hsn.component';

describe('CreateHsnComponent', () => {
  let component: CreateHsnComponent;
  let fixture: ComponentFixture<CreateHsnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateHsnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateHsnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

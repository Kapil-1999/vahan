import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateComplainComponent } from './generate-complain.component';

describe('GenerateComplainComponent', () => {
  let component: GenerateComplainComponent;
  let fixture: ComponentFixture<GenerateComplainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateComplainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateComplainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseComplainComponent } from './response-complain.component';

describe('ResponseComplainComponent', () => {
  let component: ResponseComplainComponent;
  let fixture: ComponentFixture<ResponseComplainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResponseComplainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponseComplainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

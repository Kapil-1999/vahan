import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyComplainComponent } from './my-complain.component';

describe('MyComplainComponent', () => {
  let component: MyComplainComponent;
  let fixture: ComponentFixture<MyComplainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyComplainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyComplainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

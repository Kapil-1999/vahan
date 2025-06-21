import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyComplainListComponent } from './my-complain-list.component';

describe('MyComplainListComponent', () => {
  let component: MyComplainListComponent;
  let fixture: ComponentFixture<MyComplainListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyComplainListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyComplainListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

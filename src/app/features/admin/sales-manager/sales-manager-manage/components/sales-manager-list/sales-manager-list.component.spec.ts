import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesManagerListComponent } from './sales-manager-list.component';

describe('SalesManagerListComponent', () => {
  let component: SalesManagerListComponent;
  let fixture: ComponentFixture<SalesManagerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesManagerListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesManagerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

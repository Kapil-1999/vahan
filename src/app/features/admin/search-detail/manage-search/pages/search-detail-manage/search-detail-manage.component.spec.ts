import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDetailManageComponent } from './search-detail-manage.component';

describe('SearchDetailManageComponent', () => {
  let component: SearchDetailManageComponent;
  let fixture: ComponentFixture<SearchDetailManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchDetailManageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchDetailManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

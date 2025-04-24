import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisDownloadComponent } from './mis-download.component';

describe('MisDownloadComponent', () => {
  let component: MisDownloadComponent;
  let fixture: ComponentFixture<MisDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MisDownloadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

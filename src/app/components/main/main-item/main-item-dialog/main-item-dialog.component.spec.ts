import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainItemDialogComponent } from './main-item-dialog.component';

describe('MainItemDialogComponent', () => {
  let component: MainItemDialogComponent;
  let fixture: ComponentFixture<MainItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainItemDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

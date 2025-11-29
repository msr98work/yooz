import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestDialogPage } from './request-dialog.page';

describe('RequestDialogPage', () => {
  let component: RequestDialogPage;
  let fixture: ComponentFixture<RequestDialogPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestDialogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

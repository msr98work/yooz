import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestStateDialogPage } from './request-state-dialog.page';

describe('RequestStateDialogPage', () => {
  let component: RequestStateDialogPage;
  let fixture: ComponentFixture<RequestStateDialogPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestStateDialogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestTypesPage } from './request-types.page';

describe('RequestTypesPage', () => {
  let component: RequestTypesPage;
  let fixture: ComponentFixture<RequestTypesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestTypesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

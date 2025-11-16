import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestTypePage } from './request-type.page';

describe('RequestTypePage', () => {
  let component: RequestTypePage;
  let fixture: ComponentFixture<RequestTypePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

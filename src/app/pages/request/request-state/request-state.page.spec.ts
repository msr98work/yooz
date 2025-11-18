import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestStatePage } from './request-state.page';

describe('RequestStatePage', () => {
  let component: RequestStatePage;
  let fixture: ComponentFixture<RequestStatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestStatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

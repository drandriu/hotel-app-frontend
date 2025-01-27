import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroHuespedComponent } from './registro-huesped.component';

describe('RegistroHuespedComponent', () => {
  let component: RegistroHuespedComponent;
  let fixture: ComponentFixture<RegistroHuespedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroHuespedComponent]
    });
    fixture = TestBed.createComponent(RegistroHuespedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

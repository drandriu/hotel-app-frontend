import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroServicioComponent } from './registro-servicio.component';

describe('RegistroServicioComponent', () => {
  let component: RegistroServicioComponent;
  let fixture: ComponentFixture<RegistroServicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroServicioComponent]
    });
    fixture = TestBed.createComponent(RegistroServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuespedesComponent } from './huespedes.component';

describe('VideoComponent', () => {
  let component: HuespedesComponent;
  let fixture: ComponentFixture<HuespedesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HuespedesComponent]
    });
    fixture = TestBed.createComponent(HuespedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MismensajesComponent } from './mismensajes.component';

describe('MismensajesComponent', () => {
  let component: MismensajesComponent;
  let fixture: ComponentFixture<MismensajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MismensajesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MismensajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

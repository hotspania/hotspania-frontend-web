import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirfotosComponent } from './subirfotos.component';

describe('SubirfotosComponent', () => {
  let component: SubirfotosComponent;
  let fixture: ComponentFixture<SubirfotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubirfotosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubirfotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

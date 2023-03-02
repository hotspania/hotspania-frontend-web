import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoslistadoComponent } from './fotoslistado.component';

describe('FotoslistadoComponent', () => {
  let component: FotoslistadoComponent;
  let fixture: ComponentFixture<FotoslistadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FotoslistadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FotoslistadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

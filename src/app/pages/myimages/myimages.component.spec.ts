import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyimagesComponent } from './myimages.component';

describe('MyimagesComponent', () => {
  let component: MyimagesComponent;
  let fixture: ComponentFixture<MyimagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyimagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyimagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

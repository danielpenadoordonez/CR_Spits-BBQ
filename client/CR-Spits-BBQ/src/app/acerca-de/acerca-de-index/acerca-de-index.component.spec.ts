import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcercaDeIndexComponent } from './acerca-de-index.component';

describe('AcercaDeIndexComponent', () => {
  let component: AcercaDeIndexComponent;
  let fixture: ComponentFixture<AcercaDeIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcercaDeIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcercaDeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

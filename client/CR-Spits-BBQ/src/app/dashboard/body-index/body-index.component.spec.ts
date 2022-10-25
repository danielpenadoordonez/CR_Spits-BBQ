import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyIndexComponent } from './body-index.component';

describe('BodyIndexComponent', () => {
  let component: BodyIndexComponent;
  let fixture: ComponentFixture<BodyIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

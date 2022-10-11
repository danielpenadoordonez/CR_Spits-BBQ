import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopmentTeamComponent } from './development-team.component';

describe('DevelopmentTeamComponent', () => {
  let component: DevelopmentTeamComponent;
  let fixture: ComponentFixture<DevelopmentTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevelopmentTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevelopmentTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

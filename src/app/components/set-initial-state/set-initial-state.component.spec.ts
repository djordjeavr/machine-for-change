import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetInitialStateComponent } from './set-initial-state.component';

describe('SetInitialStateComponent', () => {
  let component: SetInitialStateComponent;
  let fixture: ComponentFixture<SetInitialStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetInitialStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetInitialStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

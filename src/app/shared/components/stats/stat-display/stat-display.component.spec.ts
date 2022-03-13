import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatDisplayComponent } from './stat-display.component';

describe('StatDisplayComponent', () => {
  let component: StatDisplayComponent;
  let fixture: ComponentFixture<StatDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

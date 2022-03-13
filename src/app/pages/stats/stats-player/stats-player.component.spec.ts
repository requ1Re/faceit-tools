import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsPlayerComponent } from './stats-player.component';

describe('StatsPlayerComponent', () => {
  let component: StatsPlayerComponent;
  let fixture: ComponentFixture<StatsPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

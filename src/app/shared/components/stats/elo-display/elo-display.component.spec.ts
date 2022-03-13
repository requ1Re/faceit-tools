import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EloDisplayComponent } from './elo-display.component';

describe('EloDisplayComponent', () => {
  let component: EloDisplayComponent;
  let fixture: ComponentFixture<EloDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EloDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EloDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

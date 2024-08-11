import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchHistoryDisplayComponent } from './match-history-display.component';

describe('MatchHistoryDisplayComponent', () => {
  let component: MatchHistoryDisplayComponent;
  let fixture: ComponentFixture<MatchHistoryDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [MatchHistoryDisplayComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchHistoryDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

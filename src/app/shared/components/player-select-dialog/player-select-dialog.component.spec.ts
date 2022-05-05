import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerSelectDialogComponent } from './player-select-dialog.component';

describe('PlayerSelectDialogComponent', () => {
  let component: PlayerSelectDialogComponent;
  let fixture: ComponentFixture<PlayerSelectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerSelectDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

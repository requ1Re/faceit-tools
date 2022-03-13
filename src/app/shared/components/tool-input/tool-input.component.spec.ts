import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolInputComponent } from './tool-input.component';

describe('ToolInputComponent', () => {
  let component: ToolInputComponent;
  let fixture: ComponentFixture<ToolInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsOverviewComponent } from './tools-overview.component';

describe('ToolsOverviewComponent', () => {
  let component: ToolsOverviewComponent;
  let fixture: ComponentFixture<ToolsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolsOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

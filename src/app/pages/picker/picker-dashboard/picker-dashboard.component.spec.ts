import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickerDashboardComponent } from './picker-dashboard.component';

describe('PickerDashboardComponent', () => {
  let component: PickerDashboardComponent;
  let fixture: ComponentFixture<PickerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PickerDashboardComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

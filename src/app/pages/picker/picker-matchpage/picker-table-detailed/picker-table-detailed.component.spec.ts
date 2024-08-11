import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickerTableDetailedComponent } from './picker-table-detailed.component';

describe('PickerTableDetailedComponent', () => {
  let component: PickerTableDetailedComponent;
  let fixture: ComponentFixture<PickerTableDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PickerTableDetailedComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickerTableDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

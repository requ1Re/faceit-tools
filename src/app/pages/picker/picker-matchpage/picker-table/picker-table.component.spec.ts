import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickerTableComponent } from './picker-table.component';

describe('PickerTableComponent', () => {
  let component: PickerTableComponent;
  let fixture: ComponentFixture<PickerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PickerTableComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

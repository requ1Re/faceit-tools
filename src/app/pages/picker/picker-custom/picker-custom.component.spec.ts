import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickerCustomComponent } from './picker-custom.component';

describe('PickerCustomComponent', () => {
  let component: PickerCustomComponent;
  let fixture: ComponentFixture<PickerCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PickerCustomComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickerCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickerMatchpageComponent } from './picker-matchpage.component';

describe('PickerMatchpageComponent', () => {
  let component: PickerMatchpageComponent;
  let fixture: ComponentFixture<PickerMatchpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PickerMatchpageComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickerMatchpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

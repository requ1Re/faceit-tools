import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickerMaplistComponent } from './picker-maplist.component';

describe('PickerMaplistComponent', () => {
  let component: PickerMaplistComponent;
  let fixture: ComponentFixture<PickerMaplistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PickerMaplistComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(PickerMaplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

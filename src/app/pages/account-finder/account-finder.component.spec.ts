import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountFinderComponent } from './account-finder.component';

describe('AccountFinderComponent', () => {
  let component: AccountFinderComponent;
  let fixture: ComponentFixture<AccountFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountFinderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

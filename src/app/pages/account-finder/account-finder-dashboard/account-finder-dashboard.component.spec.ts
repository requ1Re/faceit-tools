import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountFinderDashboardComponent } from './account-finder-dashboard.component';

describe('AccountFinderDashboardComponent', () => {
  let component: AccountFinderDashboardComponent;
  let fixture: ComponentFixture<AccountFinderDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountFinderDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountFinderDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

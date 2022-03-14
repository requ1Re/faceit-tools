import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-base',
  template: '',
})
export class BaseComponent implements OnDestroy {
  subscriptions: Subscription[] = [];

  constructor() {}

  registerSubscription(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}

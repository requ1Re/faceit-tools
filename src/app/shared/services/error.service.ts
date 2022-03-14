import { EventEmitter, Injectable } from '@angular/core';
import { ErrorObj } from '../models/ErrorObj';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  errorObj = new EventEmitter<ErrorObj>();

  disabled = false;

  displayError(text: string) {
    if (!this.disabled) {
      this.errorObj.next({ error: true, text });
    }
  }

  hideError() {
    if (!this.disabled) {
      this.errorObj.next({ error: false, text: '' });
    }
  }

  disableErrorDisplaying() {
    this.hideError();
    this.disabled = true;
  }

  enableErrorDisplaying() {
    this.disabled = false;
  }
}

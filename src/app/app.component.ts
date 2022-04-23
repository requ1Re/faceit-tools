import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { BaseComponent } from './shared/components/base/base';
import { ErrorService } from './shared/services/error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent extends BaseComponent implements OnInit {

  constructor(private errorService: ErrorService, private router: Router) { super(); }

  faExclamationTriangle = faExclamationTriangle;

  title = 'FACEIT Tools';

  error = false;
  errorText = "";

  ngOnInit(): void {
    document.title = this.title;

    this.registerSubscription(this.errorService.errorObj.subscribe((data) => {
      this.error = data.error;
      this.errorText = data.text;
    }));

    this.registerSubscription(this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd){
        this.errorService.enableErrorDisplaying();
        this.errorService.hideError();
      }
    }))
  }
}

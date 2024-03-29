import { Component, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { BaseComponent } from './shared/components/base/base';
import { BrowserService } from './shared/services/browser.service';
import { ErrorService } from './shared/services/error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent implements OnInit {
  constructor(
    private errorService: ErrorService,
    private router: Router,
    private browserService: BrowserService,
    private renderer: Renderer2
  ) {
    super();
  }

  faExclamationTriangle = faExclamationTriangle;

  title = 'FACEIT Tools';

  error = false;
  errorText = '';

  ngOnInit(): void {
    this.browserService.getDocument().title = this.title;

    this.registerSubscription(
      this.errorService.errorObj.subscribe((data) => {
        this.error = data.error;
        this.errorText = data.text;
      })
    );

    this.registerSubscription(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.errorService.enableErrorDisplaying();
          this.errorService.hideError();
        }
      })
    );

    this.addBackdropFilter();
  }

  async addBackdropFilter(){
    if (await this.browserService.isUsingHardwareAcceleration()) {
      console.log('enable backdrop-filter');
      this.renderer.addClass(
        this.browserService.getDocument().body,
        'backdrop-filter'
      );
    }
  }
}

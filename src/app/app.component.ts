
import { Component, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BaseComponent } from './shared/components/base/base';
import { HeaderComponent } from './shared/components/header/header.component';
import { BrowserService } from './shared/services/browser.service';
import { ErrorService } from './shared/services/error.service';
import { SpriteWrapperComponent } from './sprite-wrapper/sprite-wrapper.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [
    SpriteWrapperComponent,
    HeaderComponent,
    FaIconComponent,
    RouterOutlet,
    TranslateModule
],
    providers: [
      BrowserService
    ]
})
export class AppComponent extends BaseComponent implements OnInit {
  constructor(
    private errorService: ErrorService,
    private router: Router,
    private browserService: BrowserService,
    private renderer: Renderer2,
    translate: TranslateService
  ) {
    translate.setDefaultLang('en');
    translate.use(localStorage.getItem('locale') ?? 'en');
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

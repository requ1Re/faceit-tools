import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { faChevronRight, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BrowserService } from 'src/app/shared/services/browser.service';
import { ToolInputComponent } from '../../../shared/components/tool-input/tool-input.component';

@Component({
    templateUrl: './picker-dashboard.component.html',
    styleUrls: ['./picker-dashboard.component.scss'],
    standalone: true,
    imports: [ToolInputComponent, RouterLink, TranslateModule],
})
export class PickerDashboardComponent implements OnInit {
  readonly INPUT_MIN_LENGTH = 32;
  readonly FACEIT_MATCH_PAGE_REGEX = /https\:\/\/www.faceit.com\/(.*)\/cs2\/room\//i;

  errorText = this.translateService.instant('errors.input.map_picker.invalid_url');
  error = false;

  matchURL: string = '';

  faChevronRight = faChevronRight;

  faMapMarkedAlt = faMapMarkedAlt;

  constructor(private router: Router, private route: ActivatedRoute, private browserService: BrowserService, private translateService: TranslateService) {}

  ngOnInit(): void {
    this.browserService.getDocument().title = "FACEIT Tools - Map Picker"
  }

  handleInput(val: string) {
    this.error = !this.isInputValid(val);
    if(!this.error){
      this.matchURL = val;
    }
  }

  isInputValid(input: string) {
    return (
      input.length > this.INPUT_MIN_LENGTH &&
      input.match(this.FACEIT_MATCH_PAGE_REGEX) !== null
    );
  }

  getFormattedInput(input: string){
    return input.replace(this.FACEIT_MATCH_PAGE_REGEX, '');
  }

  navigateToMatch() {
    if (this.isInputValid(this.matchURL)) {
      this.router.navigate(['match', this.getFormattedInput(this.matchURL)], { relativeTo: this.route });
    }
  }
}

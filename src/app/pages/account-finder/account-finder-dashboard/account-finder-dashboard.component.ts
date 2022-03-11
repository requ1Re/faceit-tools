import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './account-finder-dashboard.component.html',
  styleUrls: ['./account-finder-dashboard.component.css']
})
export class AccountFinderDashboardComponent implements OnInit {
  readonly INPUT_MIN_LENGTH = 32;
  readonly STEAM_URL_REGEX = /https\:\/\/www.faceit.com\/(.*)\/csgo\/room\//i;

  error = false;
  steamAccountNameOrURI: string = '';

  faChevronRight = faChevronRight;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    document.title = "FACEIT Tools - Account Finder"
  }

  handleInput(event: any) {
    const val = event.target.value ?? '';
    this.error = !this.isInputValid(val);
    if(!this.error){
      this.steamAccountNameOrURI = val;
    }
  }

  isInputValid(input: string) {
    return (
      input.length > this.INPUT_MIN_LENGTH &&
      input.match(this.STEAM_URL_REGEX) !== null
    );
  }

  getFormattedInput(input: string){
    return input.replace(this.STEAM_URL_REGEX, '');
  }

  navigateToMatch() {
    if (this.isInputValid(this.steamAccountNameOrURI)) {
      this.router.navigate(['match', this.getFormattedInput(this.steamAccountNameOrURI)], { relativeTo: this.route });
    }
  }
}

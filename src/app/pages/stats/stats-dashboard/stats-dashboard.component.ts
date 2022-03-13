import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faChevronRight, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './stats-dashboard.component.html',
  styleUrls: ['./stats-dashboard.component.css']
})
export class StatsDashboardComponent implements OnInit {
  readonly INPUT_MIN_LENGTH = 32;
  readonly FACEIT_MATCH_PAGE_REGEX = /https\:\/\/www.faceit.com\/(.*)\/csgo\/room\//i;

  errorText = "Invalid match URL. <br><br>URL must match https://www.faceit.com/[language]/csgo/room/[matchId]"
  error = false;

  matchURL: string = '';

  faChevronRight = faChevronRight;

  faUser = faUser;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    document.title = "FACEIT Tools - Map Picker"
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

  navigateToStats() {
    if (this.isInputValid(this.matchURL)) {
      this.router.navigate(['stats', this.getFormattedInput(this.matchURL)], { relativeTo: this.route });
    }
  }
}

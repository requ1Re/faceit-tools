import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './picker-dashboard.component.html',
  styleUrls: ['./picker-dashboard.component.css'],
})
export class PickerDashboardComponent implements OnInit {
  readonly INPUT_MIN_LENGTH = 32;
  readonly FACEIT_MATCH_PAGE_REGEX = /https\:\/\/www.faceit.com\/(.*)\/csgo\/room\//i;

  error = false;
  matchURL: string = 'https://www.faceit.com/en/csgo/room/1-64a9c86e-05c7-4ecf-b3bf-d5443c3f8609';

  faChevronRight = faChevronRight;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  handleInput(event: any) {
    const val = event.target.value ?? '';
    this.error = !this.isInputValid(val);
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
    if (!this.error) {
      this.router.navigate(['match', this.getFormattedInput(this.matchURL)], { relativeTo: this.route });
    }
  }
}

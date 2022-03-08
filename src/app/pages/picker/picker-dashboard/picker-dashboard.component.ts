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
  matchURL: string = '';

  faChevronRight = faChevronRight;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    document.title = "FACEIT Tools - Map Picker"
  }

  handleInput(event: any) {
    const val = event.target.value ?? '';
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

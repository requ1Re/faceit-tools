import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './picker-dashboard.component.html',
  styleUrls: ['./picker-dashboard.component.css'],
})
export class PickerDashboardComponent implements OnInit {
  minLength = 32;

  error = false;
  matchId: string = '';

  faChevronRight = faChevronRight;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  handleInput(event: any) {
    const regex = /https\:\/\/www.faceit.com\/(.*)\/csgo\/room\//;
    const val = event.target.value ?? '';

    if (val.length > this.minLength) {
      if (val.match(regex)) {
        this.matchId = val.replace(regex, '');
        this.error = false;
      } else {
        this.error = true;
      }
    }
  }

  navigateToMatch() {
    if (!this.error) {
      this.router.navigate(['match', this.matchId], { relativeTo: this.route });
    }
  }
}

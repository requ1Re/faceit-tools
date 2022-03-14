import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faChevronRight, faUser } from '@fortawesome/free-solid-svg-icons';
import { catchError, of, tap } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { ErrorService } from 'src/app/shared/services/error.service';

@Component({
  templateUrl: './stats-dashboard.component.html',
  styleUrls: ['./stats-dashboard.component.css'],
})
export class StatsDashboardComponent extends BaseComponent implements OnInit {
  errorText = 'User could not be found. Please check you input and try again.';
  error = false;

  username: string = '';

  faChevronRight = faChevronRight;

  faUser = faUser;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private errorService: ErrorService
  ) {
    super();
  }

  ngOnInit(): void {
    document.title = 'FACEIT Tools - Statistics';
    this.errorService.disableErrorDisplaying();
  }

  handleInput(val: string) {
    this.error = false;
    this.username = val;
  }

  navigateToStats() {
    this.registerSubscription(
      this.api.getPlayerStatsByName(this.username).subscribe({
        next: (data) => {
          this.router.navigate(['player', data.player_id, this.username], {
            relativeTo: this.route,
          });
        },
        error: (e) => {
          this.error = true;
        },
      })
    );
  }
}

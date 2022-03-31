import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faChevronRight, faUser } from '@fortawesome/free-solid-svg-icons';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BaseComponentWithStatsStore } from 'src/app/shared/components/base-stats-store/base-stats-store';
import { ApiService } from 'src/app/shared/services/api.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import {
  loadPlayerOverviewByNickname,
  loadPlayerOverviewByNicknameError,
} from 'src/app/shared/store/stats/stats.actions';
import { StatsState } from 'src/app/shared/store/stats/stats.reducer';

@Component({
  templateUrl: './stats-dashboard.component.html',
  styleUrls: ['./stats-dashboard.component.css'],
})
export class StatsDashboardComponent extends BaseComponentWithStatsStore {
  errorText = 'User could not be found. Please check you input and try again.';
  error = false;

  username: string = '';

  faChevronRight = faChevronRight;

  faUser = faUser;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private errorService: ErrorService,
    store: Store<StatsState>,
    actions$: Actions
  ) {
    super(store, actions$);
  }

  init() {
    document.title = 'FACEIT Tools - Statistics';
    this.errorService.disableErrorDisplaying();

    this.registerSubscription(
      this.statsState$.subscribe((statsState) => {
        if (
          statsState &&
          statsState.playerOverviews &&
          statsState.playerOverviews.find(
            (playerOverview) => playerOverview.nickname === this.username
          )
        ) {
          this._navigateToStats();
        }
      })
    );
    this.registerSubscription(
      this.actions$
        .pipe(ofType(loadPlayerOverviewByNicknameError))
        .subscribe(() => {
          this.error = true;
        })
    );
  }

  handleInput(val: string) {
    this.error = false;
    this.username = val;
  }

  navigateToStats() {
    this.registerSubscription(
      this.hasPlayerOverviewInStore(this.username).subscribe((b) => {
        if (b) {
          this._navigateToStats();
        } else {
          this.store.dispatch(
            loadPlayerOverviewByNickname({ nickname: this.username })
          );
        }
      })
    );
  }

  _navigateToStats() {
    this.router.navigate(['player', this.username], {
      relativeTo: this.route,
    });
  }
}

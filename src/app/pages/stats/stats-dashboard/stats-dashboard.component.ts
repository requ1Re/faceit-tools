import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronRight, faUser } from '@fortawesome/free-solid-svg-icons';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BaseComponentWithStatsStore } from 'src/app/shared/components/base-stats-store/base-stats-store';
import { PlayerSelectDialogData } from 'src/app/shared/components/player-select-dialog/player-select-dialog.component';
import { App } from 'src/app/shared/models/App';
import { ApiService } from 'src/app/shared/services/api.service';
import { BrowserService } from 'src/app/shared/services/browser.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { PlayerSelectDialogService } from 'src/app/shared/services/player-select-dialog.service';
import {
  loadPlayerDetailsByNicknameError,
  loadPlayerDetailsByNicknames
} from 'src/app/shared/store/stats/stats.actions';
import { StatsState } from 'src/app/shared/store/stats/stats.reducer';
import { ToolInputComponent } from '../../../shared/components/tool-input/tool-input.component';

@Component({
    templateUrl: './stats-dashboard.component.html',
    styleUrls: ['./stats-dashboard.component.scss'],
    standalone: true,
    imports: [ToolInputComponent],
})
export class StatsDashboardComponent extends BaseComponentWithStatsStore {
  errorText =
    'User could not be found. Please check you input and try again. Alternatively, you can search for a FACEIT player using the button below.';
  error = false;

  playerDetails: App.Player.Details[] = [];

  username: string = '';

  faChevronRight = faChevronRight;
  faUser = faUser;

  loading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private errorService: ErrorService,
    store: Store<StatsState>,
    actions$: Actions,
    private browserService: BrowserService,
    private dialog: MatDialog,
    private playerSelectDialogService: PlayerSelectDialogService
  ) {
    super(store, actions$);
  }

  init() {
    this.browserService.getDocument().title = 'FACEIT Tools - Statistics';
    this.errorService.disableErrorDisplaying();

    this.registerSubscription(
      this.playerDetails$.subscribe((playerDetails) => {
        this.playerDetails = playerDetails;

        const find = this.playerDetails.find(
          (details) => details.overview.nickname === this.username
        );
        if (find && this.loading) {
          this._navigateToStats();
        }
      })
    );

    this.registerSubscription(
      this.actions$
        .pipe(ofType(loadPlayerDetailsByNicknameError))
        .subscribe((payload) => {
          // this.error = payload.nickname === this.username;
          this.loading = false;

          const data: PlayerSelectDialogData = {
            value: this.username,
            instantSearch: true,
          };
          this.search(data);
        })
    );
  }

  handleInput(val: string) {
    this.error = false;
    this.username = val;
  }

  navigateToStats() {
    this.loading = false;
    const find = this.playerDetails.find(
      (details) => details.overview.nickname === this.username
    );
    if (find) {
      this._navigateToStats();
    } else {
      this.loading = true;
      this.store.dispatch(
        loadPlayerDetailsByNicknames({ nicknames: [this.username] })
      );
    }
  }

  _navigateToStats() {
    this.router.navigate(['player', this.username], {
      relativeTo: this.route,
    });
  }

  search(data?: PlayerSelectDialogData) {
    if (data?.value.trim() === '') return;

    this.playerSelectDialogService.open((result) => {
      if (result) {
        this.username = result.nickname;
        this._navigateToStats();
      }
    }, data);
  }
}

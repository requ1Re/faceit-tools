import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faSteam } from '@fortawesome/free-brands-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { combineLatest, first, Observable } from 'rxjs';
import { BaseComponentWithStatsStore } from 'src/app/shared/components/base-stats-store/base-stats-store';
import { App } from 'src/app/shared/models/App';
import { FaceIT } from 'src/app/shared/models/FaceIT';
import { PlayerMatchHistoryDetailed } from 'src/app/shared/models/PlayerMatchHistoryDetailed';
import { ApiService } from 'src/app/shared/services/api.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { LogService } from 'src/app/shared/services/log.service';
import {
  loadPlayerDetailsByNicknames,
  loadPlayerOverviewByNickname,
  loadPlayerStatsByID,
} from 'src/app/shared/store/stats/stats.actions';
import { StatsState } from 'src/app/shared/store/stats/stats.reducer';
import { EloUtil } from 'src/app/shared/utils/EloUtil';

@Component({
  templateUrl: './stats-player.component.html',
  styleUrls: ['./stats-player.component.scss'],
})
export class StatsPlayerComponent extends BaseComponentWithStatsStore {
  pageName = 'StatsPlayer';

  faSteam = faSteam;

  playerDetails: App.Player.Details[] = [];

  playerName = '';
  playerId = '';

  selectedPlayerDetails: App.Player.Details|null;

  matchHistory$: Observable<PlayerMatchHistoryDetailed[]>

  error = false;

  constructor(
    private route: ActivatedRoute,
    private errorService: ErrorService,
    private logService: LogService,
    private apiService: ApiService,
    store: Store<StatsState>,
    actions$: Actions
  ) {
    super(store, actions$);
  }

  init() {
    this.registerSubscription(
      combineLatest([
        this.playerDetails$,
        this.route.paramMap,
      ])
        .subscribe((data) => {
          this.selectedPlayerDetails = null;
          this.logService.log(this.pageName, 'Got combined data, calling loadData', data);

          this.playerDetails = data[0];
          this.playerName = data[1].get('playerName') ?? '';

          this.loadData();

          const findDetails = this.playerDetails.find(
            (details) => details.overview.nickname === this.playerName
          );
          if (!findDetails) {
            this.store.dispatch(
              loadPlayerDetailsByNicknames({ nicknames: [this.playerName] })
            );
          }
        })
    );

    this.registerSubscription(
      this.errorService.errorObj.subscribe((errorObj) => {
        this.error = errorObj.error;
      })
    );
  }

  loadData() {
    this.registerSubscription(
      this.playerDetails$.subscribe((playerDetails) => {
        const findDetails = playerDetails.find(
          (details) => details.overview.nickname === this.playerName
        );
        if (findDetails) {
          this.selectedPlayerDetails = findDetails;
          this.matchHistory$ = this.apiService.getPlayerMatchHistoryDetailed(this.selectedPlayerDetails.overview.player_id);
        }
      })
    );
  }

  getRecentResults(data: FaceIT.Player.PlayerStats) {
    return data.lifetime['Recent Results']
      .map((r) =>
        r == '1'
          ? '<span class="text-green">W</span>'
          : '<span class="text-red">L</span>'
      )
      .join(' ');
  }

  getProfilePicture(data: FaceIT.PlayerOverview.Player) {
    return data.avatar ? data.avatar : 'assets/img/steam_default.png';
  }

  getFormattedEloLong(skillLevel: number, elo: number) {
    const neededElo = EloUtil.getPlusMinusEloForNextLevel(skillLevel, elo);
    return `${elo} (<span class="text-red">??? ${
      neededElo.previousLevel ? neededElo.previousLevel : '-&infin;'
    }</span> / <span class="text-green">??? +${
      neededElo.nextLevel ? neededElo.nextLevel : '&infin;'
    }</span>)`;
  }
}

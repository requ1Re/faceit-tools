import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faSteam } from '@fortawesome/free-brands-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { combineLatest, first } from 'rxjs';
import { BaseComponentWithStatsStore } from 'src/app/shared/components/base-stats-store/base-stats-store';
import { FaceIT } from 'src/app/shared/models/FaceIT';
import { ErrorService } from 'src/app/shared/services/error.service';
import {
  loadPlayerOverviewByNickname,
  loadPlayerStatsByID,
} from 'src/app/shared/store/stats/stats.actions';
import { StatsState } from 'src/app/shared/store/stats/stats.reducer';
import { EloUtil } from 'src/app/shared/utils/EloUtil';

@Component({
  templateUrl: './stats-player.component.html',
  styleUrls: ['./stats-player.component.css'],
})
export class StatsPlayerComponent extends BaseComponentWithStatsStore {
  faInfoCircle = faInfoCircle;

  faSteam = faSteam;

  playerOverviews: FaceIT.PlayerOverview.Player[] = [];
  playerStats: FaceIT.Player.PlayerStats[] = [];

  playerName = '';
  playerId = '';

  playerOverviewData: FaceIT.PlayerOverview.Player;
  playerStatsData: FaceIT.Player.PlayerStats;

  error = false;

  constructor(
    private route: ActivatedRoute,
    private errorService: ErrorService,
    store: Store<StatsState>,
    actions$: Actions
  ) {
    super(store, actions$);
  }

  init() {
    this.registerSubscription(
      combineLatest([
        this.playerOverviews$,
        this.playerStats$,
        this.route.paramMap,
      ])
        .pipe(first())
        .subscribe((data) => {
          console.log('[DEBUG] Got combined data, calling loadData', data);

          this.playerOverviews = data[0];
          this.playerStats = data[1];
          this.playerName = data[2].get('playerName') ?? '';

          this.loadData();

          const findOverview = this.playerOverviews.find(
            (playerOverview) => playerOverview.nickname === this.playerName
          );
          if (!findOverview) {
            this.store.dispatch(
              loadPlayerOverviewByNickname({ nickname: this.playerName })
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
      this.playerOverviews$.subscribe((playerOverviews) => {
        const findOverview = playerOverviews.find(
          (playerOverview) => playerOverview.nickname === this.playerName
        );
        if (findOverview) {
          this.playerOverviewData = findOverview;
          this.playerId = findOverview.player_id;

          const findStats = this.playerStats.find(
            (playerStats) => playerStats.player_id === this.playerId
          );
          if (!findStats) {
            this.store.dispatch(loadPlayerStatsByID({ id: this.playerId }));
          }
        }
      })
    );

    this.registerSubscription(
      this.playerStats$.subscribe((playerStats) => {
        const findStats = playerStats.find(
          (playerStats) => playerStats.player_id === this.playerId
        );
        if (findStats) {
          this.playerStatsData = findStats;
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
    return `${elo} (<span class="text-red">↓ ${
      neededElo.previousLevel ? neededElo.previousLevel : '-&infin;'
    }</span> / <span class="text-green">↑ +${
      neededElo.nextLevel ? neededElo.nextLevel : '&infin;'
    }</span>)`;
  }
}

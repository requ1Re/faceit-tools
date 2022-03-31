import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faSteam } from '@fortawesome/free-brands-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Actions } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BaseComponentWithStatsStore } from 'src/app/shared/components/base-stats-store/base-stats-store';
import { FaceIT } from 'src/app/shared/models/FaceIT';
import { ApiService } from 'src/app/shared/services/api.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import {
  loadPlayerOverviewByNickname,
  loadPlayerStatsByID,
} from 'src/app/shared/store/stats/stats.actions';
import { StatsState } from 'src/app/shared/store/stats/stats.reducer';
import {
  getPlayerOverviews,
  getPlayerStats,
} from 'src/app/shared/store/stats/stats.selector';
import { EloUtil } from 'src/app/shared/utils/EloUtil';

@Component({
  templateUrl: './stats-player.component.html',
  styleUrls: ['./stats-player.component.css'],
})
export class StatsPlayerComponent extends BaseComponentWithStatsStore {
  faInfoCircle = faInfoCircle;

  faSteam = faSteam;

  playerName = '';
  playerId = '';

  playerOverviewData: FaceIT.PlayerOverview.Player | undefined;
  playerStatsData: FaceIT.Player.PlayerStats | undefined;

  error = false;

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
    this.registerSubscription(
      this.route.paramMap.subscribe((params) => {
        this.playerName = params.get('playerName') ?? '';
        this.loadData();
      })
    );

    this.registerSubscription(
      this.errorService.errorObj.subscribe((errorObj) => {
        this.error = errorObj.error;
      })
    );

    this.registerSubscription(
      this.playerOverviews$.subscribe((data) => {
        this.playerOverviewData = data.find(
          (playerOverview) => playerOverview.nickname === this.playerName
        );
        if (this.playerOverviewData) {
          this.playerId = this.playerOverviewData.player_id;

          this.hasPlayerStatsInStore(this.playerId).subscribe((hasInStore) => {
            if (!hasInStore) {
              this.store.dispatch(loadPlayerStatsByID({ id: this.playerId }));
            }
          });
        }
      })
    );
    this.registerSubscription(
      this.playerStats$.subscribe((data) => {
        this.playerStatsData = data.find(
          (playerStatsData) => playerStatsData.player_id === this.playerId
        );
      })
    );
  }

  loadData() {
    this.hasPlayerOverviewInStore(this.playerName).subscribe((hasInStore) => {
      if (!hasInStore) {
        this.store.dispatch(
          loadPlayerOverviewByNickname({ nickname: this.playerName })
        );
      }
    });
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

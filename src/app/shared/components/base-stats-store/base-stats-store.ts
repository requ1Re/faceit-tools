import { Directive, OnInit } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { FaceIT } from '../../models/FaceIT';
import { StatsState } from '../../store/stats/stats.reducer';
import { getPlayerOverviews, getPlayerStats, getStatsState } from '../../store/stats/stats.selector';
import { BaseComponent } from '../base/base';

@Directive()
export abstract class BaseComponentWithStatsStore
  extends BaseComponent
  implements OnInit
{
  statsState$: Observable<StatsState>;

  playerOverviews$: Observable<FaceIT.PlayerOverview.Player[]>;
  playerStats$: Observable<FaceIT.Player.PlayerStats[]>;

  constructor(public store: Store<StatsState>, public actions$: Actions) {
    super();
  }

  ngOnInit(): void {
    this.statsState$ = this.store.pipe(select(getStatsState));
    this.playerOverviews$ = this.store.pipe(select(getPlayerOverviews));
    this.playerStats$ = this.store.pipe(select(getPlayerStats));

    this.init();
  }

  abstract init(): void;

  public hasPlayerOverviewInStore(nickname: string): Observable<boolean> {
    return this.statsState$.pipe(
      map((state) =>
        state.playerOverviews.find(
          (playerOverview) => playerOverview.nickname === nickname
        )
      ),
      map((playerOverview) => {
        return !!playerOverview;
      })
    );
  }

  public hasPlayerStatsInStore(playerId: string): Observable<boolean> {
    return this.statsState$.pipe(
      map((state) =>
        state.playerStats.find(
          (playerStats) => playerStats.player_id === playerId
        )
      ),
      map((playerStats) => {
        return !!playerStats;
      })
    );
  }

}

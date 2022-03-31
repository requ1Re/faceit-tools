import { Directive, OnInit } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { StatsState } from '../../store/stats/stats.reducer';
import { getStatsState } from '../../store/stats/stats.selector';
import { BaseComponent } from '../base/base';

@Directive()
export abstract class BaseComponentWithStatsStore
  extends BaseComponent
  implements OnInit
{
  statsState$: Observable<StatsState>;

  constructor(public store: Store<StatsState>, public actions$: Actions) {
    super();
  }

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

  ngOnInit(): void {
    this.statsState$ = this.store.pipe(select(getStatsState));

    this.init();
  }

  abstract init(): void;
}

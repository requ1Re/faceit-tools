import { Directive, OnInit } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { App } from '../../models/App';
import { StatsState } from '../../store/stats/stats.reducer';
import { getPlayerDetails, getStatsState } from '../../store/stats/stats.selector';
import { BaseComponent } from '../base/base';

@Directive()
export abstract class BaseComponentWithStatsStore
  extends BaseComponent
  implements OnInit
{
  statsState$: Observable<StatsState>;

  playerDetails$: Observable<App.Player.Details[]>;

  constructor(public store: Store<StatsState>, public actions$: Actions) {
    super();
  }

  ngOnInit(): void {
    this.statsState$ = this.store.select(getStatsState);
    this.playerDetails$ = this.store.select(getPlayerDetails);

    this.init();
  }

  abstract init(): void;

  public hasPlayerDetailsInStore(nickname: string): Observable<boolean> {
    return this.playerDetails$.pipe(
      map((details) =>
        details.find(
          (details) => details.overview.nickname === nickname
        )
      ),
      map((foundDetails) => {
        return !!foundDetails;
      })
    );
  }
}

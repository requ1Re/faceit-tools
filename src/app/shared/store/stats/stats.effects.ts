import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { loadPlayerOverviewByNickname, loadPlayerOverviewByNicknameError, loadPlayerOverviewByNicknameSuccess, loadPlayerStatsByID, loadPlayerStatsByIDError, loadPlayerStatsByIDSuccess } from './stats.actions';

@Injectable()
export class StatsEffects {
  loadPlayerOverviewByNickname$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPlayerOverviewByNickname),
      switchMap((props) =>
        this.apiService.getPlayerOverviewByName(props.nickname).pipe(
          map((playerOverview) =>
            loadPlayerOverviewByNicknameSuccess({ playerOverview })
          ),
          catchError(() => of(loadPlayerOverviewByNicknameError()))
        )
      )
    );
  });

  loadPlayerStatsByID$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPlayerStatsByID),
      switchMap((props) =>
        this.apiService.getPlayerStats(props.id).pipe(
          map((playerStats) =>
            loadPlayerStatsByIDSuccess({ playerStats })
          ),
          catchError(() => of(loadPlayerStatsByIDError()))
        )
      )
    );
  });

  constructor(private actions$: Actions, private apiService: ApiService) {}
}

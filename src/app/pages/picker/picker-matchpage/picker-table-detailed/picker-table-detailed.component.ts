import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { combineLatest, first } from 'rxjs';
import { BaseComponentWithStatsStore } from 'src/app/shared/components/base-stats-store/base-stats-store';
import { App } from 'src/app/shared/models/App';
import { ActiveDutyMap } from 'src/app/shared/models/MapPool';
import { PlayerMapStats, TeamMapStats } from 'src/app/shared/models/MapStats';
import { BrowserService } from 'src/app/shared/services/browser.service';
import { StatsState } from 'src/app/shared/store/stats/stats.reducer';
import { NgFor, NgIf } from '@angular/common';
import { CardComponent } from '../../../../shared/components/card/card.component';

@Component({
    selector: 'app-picker-table-detailed',
    templateUrl: './picker-table-detailed.component.html',
    styleUrls: ['./picker-table-detailed.component.scss'],
    standalone: true,
    imports: [CardComponent, NgFor, NgIf, RouterLink]
})
export class PickerTableDetailedComponent extends BaseComponentWithStatsStore {
  enableBackdropFilter = false;

  @Input()
  teamAvatar: string;

  @Input()
  teamName: string;

  @Input()
  teamMapStats: TeamMapStats;

  playerDetails: App.Player.Details[] = [];

  constructor(
    private route: ActivatedRoute,
    private browserService: BrowserService,
    store: Store<StatsState>,
    actions$: Actions
  ) {
    super(store, actions$);
  }

  init(): void {
    this.registerSubscription(
      combineLatest([this.playerDetails$, this.route.paramMap])
        .pipe(first())
        .subscribe((data) => {
          this.playerDetails = data[0];
        })
    );

    this._enableBackdropFilter();
  }

  getPlayerWinrateForMap(playerStats: PlayerMapStats, map: ActiveDutyMap) {
    return this.getPlayerStatsForMap(playerStats, map)?.rate ?? 0;
  }

  getPlayerLossesForMap(playerStats: PlayerMapStats, map: ActiveDutyMap) {
    return this.getPlayerStatsForMap(playerStats, map)?.losses ?? 0;
  }

  getPlayerWinsForMap(playerStats: PlayerMapStats, map: ActiveDutyMap) {
    return this.getPlayerStatsForMap(playerStats, map)?.wins ?? 0;
  }

  getPlayerMatchesForMap(playerStats: PlayerMapStats, map: ActiveDutyMap) {
    return this.getPlayerStatsForMap(playerStats, map)?.matches ?? 0;
  }

  getPlayerStatsForMap(playerStats: PlayerMapStats, map: ActiveDutyMap) {
    return playerStats.mapStats.find((s) => s.name === map.toString());
  }

  getPlayerDetailsByName(playerName: string) {
    return this.playerDetails.find(
      (details) => details.overview.nickname === playerName
    );
  }

  getBackgroundColor(winRate: number) {
    return winRate >= 50 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)';
  }

  getMaps() {
    return Object.values(ActiveDutyMap).filter((v) => typeof v === 'string');
  }

  getMapPreviewStyle(map: ActiveDutyMap){
    return `url('assets/img/previews/de_${map.toLowerCase()}.jpeg')`;
  }

  async _enableBackdropFilter(){
    this.enableBackdropFilter = await this.browserService.isUsingHardwareAcceleration()
  }
}

import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faEdit, faList } from '@fortawesome/free-solid-svg-icons';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { combineLatest, first } from 'rxjs';
import { BaseComponentWithStatsStore } from 'src/app/shared/components/base-stats-store/base-stats-store';
import { App } from 'src/app/shared/models/App';
import { CustomMapPickerMatchPlayer } from 'src/app/shared/models/CustomMapPickerMatch';
import { FaceIT } from 'src/app/shared/models/FaceIT';
import { ActiveDutyMap } from 'src/app/shared/models/MapPool';
import { getDefaultMapStats, TeamMapStats } from 'src/app/shared/models/MapStats';
import { ApiService } from 'src/app/shared/services/api.service';
import { BrowserService } from 'src/app/shared/services/browser.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { LogService } from 'src/app/shared/services/log.service';
import { loadPlayerDetailsByNicknames } from 'src/app/shared/store/stats/stats.actions';
import { StatsState } from 'src/app/shared/store/stats/stats.reducer';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { PickerMaplistComponent } from './picker-maplist/picker-maplist.component';
import { PickerTableDetailedComponent } from './picker-table-detailed/picker-table-detailed.component';
import { PickerTableComponent } from './picker-table/picker-table.component';

@Component({
  templateUrl: './picker-matchpage.component.html',
  styleUrls: ['./picker-matchpage.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    LoadingSpinnerComponent,
    FaIconComponent,
    PickerTableComponent,
    PickerMaplistComponent,
    PickerTableDetailedComponent,
  ],
})
export class PickerMatchpageComponent extends BaseComponentWithStatsStore {
  pageName = 'PickerMatchpage';

  faArrowLeft = faArrowLeft;
  faList = faList;
  faEdit = faEdit;

  matchId = '';
  matchRoomData: FaceIT.Match.Matchroom;
  customMatchRoom: boolean = false;
  customTeams: string[][];

  competitionName = 'Custom Match';
  teamNames = ['Team 1', 'Team 2'];
  teamAvatars = ['/assets/img/steam_default.png', '/assets/img/steam_default.png'];

  playerDetails: App.Player.Details[] = [];

  teamMapStats: TeamMapStats[] = [];

  detailedView = false;

  error = false;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private errorService: ErrorService,
    private logService: LogService,
    store: Store<StatsState>,
    actions$: Actions,
    private browserService: BrowserService,
    private router: Router,
  ) {
    super(store, actions$);
  }

  init() {
    this.teamMapStats[0] = {
      combinedMapStats: getDefaultMapStats(),
      playerMapStats: [],
    };
    this.teamMapStats[1] = {
      combinedMapStats: getDefaultMapStats(),
      playerMapStats: [],
    };

    this.registerSubscription(
      combineLatest([this.playerDetails$, this.route.paramMap])
        .pipe(first())
        .subscribe((data) => {
          this.logService.log(this.pageName, 'Got combined data, calling loadMatchRoom', data);
          this.playerDetails = data[0];
          const matchId = data[1].get('matchId');
          const team1Str = data[1].get('team1Str');
          const team2Str = data[1].get('team2Str');

          if (team1Str && team2Str) {
            this.handleMatchroomDataCustom([team1Str.split(','), team2Str.split(',')]);
          } else if (matchId) {
            this.matchId = matchId;
            this.loadMatchRoom();
          }
        }),
    );

    this.registerSubscription(
      this.errorService.errorObj.subscribe((errorObj) => {
        this.error = errorObj.error;
      }),
    );
  }

  loadMatchRoom() {
    this.registerSubscription(
      this.api.getMatchRoom(this.matchId).subscribe((data) => {
        if (data) {
          this.handleMatchroomData(data);
        }
      }),
    );
  }

  handleMatchroomData(data: FaceIT.Match.Matchroom) {
    this.matchRoomData = data;
    this.competitionName = data.competition_name;
    this.teamNames = [data.teams.faction1.name, data.teams.faction2.name];
    this.teamAvatars = [data.teams.faction1.avatar, data.teams.faction2.avatar];

    this.browserService.getDocument().title = `Map Picker - ${data.teams.faction1.name} vs. ${data.teams.faction2.name}`;

    let nicknamesToLoad = [];
    for (let teamIndex = 0; teamIndex < this.teamMapStats.length; teamIndex++) {
      const roster = this.getTeam(teamIndex).roster;
      for (let playerIndex = 0; playerIndex < roster.length; playerIndex++) {
        const player = roster[playerIndex];

        const find = this.playerDetails.find((stats) => stats.overview.player_id === player.player_id);
        if (!find) {
          nicknamesToLoad.push(player.nickname);
        } else {
          this.logService.log(this.pageName, 'Got playerDetails from store for', player.player_id);
          this.handlePlayerStats(find.stats, teamIndex);
        }
      }
    }

    this.registerSubscription(
      this.playerDetails$.subscribe((playerDetails) => {
        const diff = playerDetails.filter((item) => this.playerDetails.indexOf(item) < 0);
        this.playerDetails = playerDetails;

        diff.forEach((details) => {
          this.logService.log(this.pageName, 'Got playerStats from API for', details.overview.player_id);
          this.handlePlayerStats(details.stats, this.getTeamIdByPlayerId(details.overview.player_id));
        });
      }),
    );

    this.store.dispatch(loadPlayerDetailsByNicknames({ nicknames: nicknamesToLoad }));
  }

  handleMatchroomDataCustom(teams: string[][]) {
    this.customMatchRoom = true;
    this.customTeams = teams;
    this.browserService.getDocument().title = `Map Picker - Custom`;

    this.teamNames = ['team_' + teams[0][0], 'team_' + teams[1][0]];

    let nicknamesToLoad: string[] = [];
    for (let teamIndex = 0; teamIndex < teams.length; teamIndex++) {
      teams[teamIndex].forEach((name) => {
        const find = this.playerDetails.find((stats) => stats.overview.nickname === name);
        if (!find) {
          nicknamesToLoad.push(name);
        } else {
          this.logService.log(this.pageName, 'Got playerDetails from store for', name);
          this.handlePlayerStats(find.stats, teamIndex);
        }
      });
    }

    this.registerSubscription(
      this.playerDetails$.subscribe((playerDetails) => {
        const diff = playerDetails.filter((item) => this.playerDetails.indexOf(item) < 0);
        this.playerDetails = playerDetails;

        diff.forEach((details) => {
          this.logService.log(this.pageName, 'Got playerStats from API for', details.overview.player_id);
          this.handlePlayerStats(
            details.stats,
            this.customTeams.findIndex((teams) => teams.find((item) => item === details.overview.nickname)),
          );
        });
      }),
    );

    this.store.dispatch(loadPlayerDetailsByNicknames({ nicknames: nicknamesToLoad }));
  }

  handlePlayerStats(data: FaceIT.Player.PlayerStats, teamId: number) {
    const mapStatsSegments = data.segments.filter((s) => s.mode === '5v5' && s.type === 'Map');

    const mapStats = this.teamMapStats[teamId];
    const combinedMapStats = mapStats.combinedMapStats;

    const playerIndex = mapStats.playerMapStats.length;
    mapStats.playerMapStats[playerIndex] = {
      name: this.getPlayerNameById(data.player_id) ?? data.player_id,
      mapStats: [],
    };

    for (let i = 0; i < mapStatsSegments.length; i++) {
      const mapStatsSegment = mapStatsSegments[i];

      const combinedMapStat = combinedMapStats.find(
        (m) => m.name.toUpperCase() === mapStatsSegment.label.replace('de_', '').toUpperCase(), // remove de_ from Mapname and compare in uppercase
      );

      if (combinedMapStat) {
        combinedMapStat.matches += +mapStatsSegment.stats.Matches;
        combinedMapStat.wins += +mapStatsSegment.stats.Wins;
        combinedMapStat.losses = combinedMapStat.matches - combinedMapStat.wins;

        combinedMapStat.rate = Math.round((combinedMapStat.wins / combinedMapStat.matches) * 100 * 100) / 100;

        mapStats.playerMapStats[playerIndex].mapStats.push({
          name: combinedMapStat.name,
          matches: +mapStatsSegment.stats.Matches,
          losses: +mapStatsSegment.stats.Matches - +mapStatsSegment.stats.Wins,
          wins: +mapStatsSegment.stats.Wins,
          rate: this.getRoundedNumber((+mapStatsSegment.stats.Wins / +mapStatsSegment.stats.Matches) * 100),
        });
      }

      this.sortMapStats();
    }

    this.calculateWeightedAverage();
  }

  calculateWeightedAverage() {
    // https://en.wikipedia.org/wiki/Weighted_arithmetic_mean
    for (let teamIndex = 0; teamIndex < this.teamMapStats.length; teamIndex++) {
      const team = this.teamMapStats[teamIndex];
      for (let mapIndex = 0; mapIndex < this.getMaps().length; mapIndex++) {
        const map = this.getMaps()[mapIndex];
        let mapSumWeight = 0;
        let mapSum = 0;

        for (let playerIndex = 0; playerIndex < team.playerMapStats.length; playerIndex++) {
          const playerStats = team.playerMapStats[playerIndex];

          const playerStatsForMap = playerStats.mapStats.find((m) => m.name === map);
          if (playerStatsForMap) {
            mapSumWeight += playerStatsForMap.rate * playerStatsForMap.matches;
            mapSum += playerStatsForMap.matches;
          }
        }

        const teamStatsForMap = team.combinedMapStats.find((m) => m.name === map);
        if (teamStatsForMap) {
          teamStatsForMap.rate = mapSumWeight / mapSum;
        }
      }
    }
  }

  sortMapStats(sortByWinrate = false) {
    if (sortByWinrate) {
      this.teamMapStats[0].combinedMapStats.sort((a, b) => b.rate - a.rate);
      this.teamMapStats[1].combinedMapStats.sort((a, b) => b.rate - a.rate);
    } else {
      this.teamMapStats[0].combinedMapStats.sort((a, b) => a.name.localeCompare(b.name));
      this.teamMapStats[1].combinedMapStats.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  toggleDetailedView() {
    this.detailedView = !this.detailedView;
    // this.sortMapStats(!this.detailedView);
  }

  /*
  Getter
  */
  getRoundedNumber(number: number) {
    return Math.round((number + Number.EPSILON) * 100) / 100;
  }
  getPlayerNameById(playerId: string) {
    const find = this.playerDetails.find((player) => player.overview.player_id === playerId);
    return find?.overview.nickname ?? null;
  }

  getTeamIdByPlayerId(playerId: string) {
    return this.matchRoomData.teams.faction1.roster.find((player) => player.player_id === playerId) ? 0 : 1;
  }

  getTeam(teamId: number) {
    return teamId === 0 ? this.matchRoomData.teams.faction1 : this.matchRoomData.teams.faction2;
  }

  getMaps() {
    return Object.values(ActiveDutyMap).filter((v) => typeof v === 'string');
  }

  editNormalTeams() {
    const data: CustomMapPickerMatchPlayer[][] = [
      this.matchRoomData.teams.faction1.roster.map((player) => ({
        nickname: player.nickname,
        avatar: player.avatar,
        playerId: player.player_id,
        skillLevel: player.game_skill_level,
        country: this.playerDetails.find((_p) => _p.overview.player_id === player.player_id)?.overview.country ?? 'XX',
      })),
      this.matchRoomData.teams.faction2.roster.map((player) => ({
        nickname: player.nickname,
        avatar: player.avatar,
        playerId: player.player_id,
        skillLevel: player.game_skill_level,
        country: this.playerDetails.find((_p) => _p.overview.player_id === player.player_id)?.overview.country ?? 'XX',
      })),
    ];
    this.router.navigate(['picker', 'custom', btoa(JSON.stringify(data))]);
  }

  editCustomTeams() {
    const data: CustomMapPickerMatchPlayer[][] = this.customTeams.map((team) =>
      team
        .filter((player) => this.playerDetails.find((_p) => _p.overview.nickname === player))
        .map((player) => {
          const p = this.playerDetails.find((_p) => _p.overview.nickname === player)!;

          return {
            nickname: player,
            playerId: p.overview.player_id,
            avatar: p.overview.avatar,
            country: p.overview.country,
            skillLevel: p.overview.games['cs2'].skill_level,
          };
        }),
    );
    this.router.navigate(['picker', 'custom', btoa(JSON.stringify(data))]);
  }
}

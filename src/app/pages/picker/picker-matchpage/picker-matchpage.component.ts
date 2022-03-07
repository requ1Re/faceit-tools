import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faList } from '@fortawesome/free-solid-svg-icons';
import { Observable, tap } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { FaceIT } from 'src/app/shared/models/FaceIT';
import { MapPool } from 'src/app/shared/models/MapPool';
import {
  getDefaultMapStats,
  PlayerMapStats,
  TeamMapStats,
} from 'src/app/shared/models/MapStats';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  templateUrl: './picker-matchpage.component.html',
  styleUrls: ['./picker-matchpage.component.css'],
})
export class PickerMatchpageComponent extends BaseComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faList = faList;

  matchId = '';
  matchRoomData: FaceIT.Match.Matchroom;

  teamMapStats: TeamMapStats[] = [];

  detailedView = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService
  ) {
    super();
  }

  ngOnInit(): void {
    this.teamMapStats[0] = {
      combinedMapStats: getDefaultMapStats(),
      playerMapStats: [],
    };
    this.teamMapStats[1] = {
      combinedMapStats: getDefaultMapStats(),
      playerMapStats: [],
    };

    this.registerSubscription(
      this.route.paramMap.subscribe((params) => {
        this.matchId = params.get('matchId') ?? '';
        this.loadData();
      })
    );
  }

  loadData() {
    this.api.getMatchRoom(this.matchId);
    this.registerSubscription(
      this.api.getMatchRoom(this.matchId).subscribe((data) => {
        if (data) {
          this.handleMatchroomData(data);
        }
      })
    );
  }

  handleMatchroomData(data: FaceIT.Match.Matchroom) {
    this.matchRoomData = data;

    for (let teamIndex = 0; teamIndex < this.teamMapStats.length; teamIndex++) {
      const roster = this.getTeam(teamIndex).roster;
      for (let playerIndex = 0; playerIndex < roster.length; playerIndex++) {
        const player = roster[playerIndex];

        this.registerSubscription(
          this.api.getPlayerStats(player.player_id).subscribe((playerStats) => {
            if (playerStats) {
              this.handlePlayerStats(playerStats, teamIndex);
            }
          })
        );
      }
    }
  }

  handlePlayerStats(data: FaceIT.Player.PlayerStats, teamId: number) {
    const mapStatsSegments = data.segments.filter(
      (s) => s.mode === '5v5' && s.type === 'Map'
    );

    const mapStats = this.teamMapStats[teamId];
    const combinedMapStats = mapStats.combinedMapStats;

    const playerIndex = mapStats.playerMapStats.length;
    mapStats.playerMapStats[playerIndex] = {
      name: this.getPlayerNameById(data.player_id) ?? data.player_id,
      mapStats: []
    };

    for(let i = 0; i < mapStatsSegments.length; i++){
      const mapStatsSegment = mapStatsSegments[i];

      const combinedMapStat = combinedMapStats.find(
        (m) => m.name.toUpperCase() === mapStatsSegment.label.replace('de_', '').toUpperCase() // remove de_ from Mapname and compare in uppercase
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
          rate: this.getRoundedNumber(+mapStatsSegment.stats.Wins / +mapStatsSegment.stats.Matches * 100)
        });
      }

      this.sortMapStats();
    }

    this.calculateWeightedAverage();
  }

  calculateWeightedAverage(){
    // https://en.wikipedia.org/wiki/Weighted_arithmetic_mean
    for(let teamIndex = 0; teamIndex < this.teamMapStats.length; teamIndex++){
      const team = this.teamMapStats[teamIndex];
      for(let mapIndex = 0; mapIndex < this.getMaps().length; mapIndex++){
        const map = this.getMaps()[mapIndex];
        let mapSumWeight = 0;
        let mapSum = 0;

        for(let playerIndex = 0; playerIndex < team.playerMapStats.length; playerIndex++){
          const playerStats = team.playerMapStats[playerIndex];

          const playerStatsForMap = playerStats.mapStats.find((m) => m.name === map);
          if(playerStatsForMap){
            mapSumWeight += playerStatsForMap.rate * playerStatsForMap.matches;
            mapSum += playerStatsForMap.matches;
          }
        }

        const teamStatsForMap = team.combinedMapStats.find((m) => m.name === map);
        if(teamStatsForMap){
          teamStatsForMap.rate = mapSumWeight / mapSum;
        }
      }
    }
  }

  sortMapStats(sortByWinrate = true) {
    if(sortByWinrate){
      this.teamMapStats[0].combinedMapStats.sort((a, b) => b.rate - a.rate);
      this.teamMapStats[1].combinedMapStats.sort((a, b) => b.rate - a.rate);
    }else{
      this.teamMapStats[0].combinedMapStats.sort((a, b) => a.name.localeCompare(b.name));
      this.teamMapStats[1].combinedMapStats.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  toggleDetailedView(){
    this.detailedView = !this.detailedView;
    this.sortMapStats(!this.detailedView);
  }

  /*
  Getter
  */
  getRoundedNumber(number: number){
    return Math.round((number + Number.EPSILON) * 100) / 100
  }
  getPlayerNameById(playerId: string){
    const findTeam1 = this.matchRoomData.teams.faction1.roster.find(
      (player) => player.player_id === playerId
    );
    const findTeam2 = this.matchRoomData.teams.faction2.roster.find(
      (player) => player.player_id === playerId
    );
    return findTeam1 ? findTeam1.nickname : findTeam2 ? findTeam2.nickname : null;
  }

  getTeam(teamId: number) {
    return teamId === 0
      ? this.matchRoomData.teams.faction1
      : this.matchRoomData.teams.faction2;
  }

  getTeamName(teamId: number) {
    return teamId === 0 ? this.getTeam(teamId).name : this.getTeam(teamId).name;
  }

  getMapPreview(map: string) {
    return 'assets/img/previews/de_' + map.toLowerCase() + '.jpg';
  }

  getTeamAvatar(team: FaceIT.Match.Faction){
    return team.avatar ? team.avatar : 'assets/img/steam_default.png';
  }

  getBackgroundColor(winRate: number) {
    return winRate >= 50 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)';
  }

  getMaps(){
    return Object.values(MapPool).filter((v) => typeof v === "string");
  }

  getPlayerWinrateForMap(playerStats: PlayerMapStats, map: MapPool){
    return this.getPlayerStatsForMap(playerStats, map)?.rate ?? 0;
  }

  getPlayerLossesForMap(playerStats: PlayerMapStats, map: MapPool){
    return this.getPlayerStatsForMap(playerStats, map)?.losses ?? 0;
  }

  getPlayerWinsForMap(playerStats: PlayerMapStats, map: MapPool){
    return this.getPlayerStatsForMap(playerStats, map)?.wins ?? 0;
  }

  getPlayerMatchesForMap(playerStats: PlayerMapStats, map: MapPool){
    return this.getPlayerStatsForMap(playerStats, map)?.matches ?? 0;
  }

  getPlayerStatsForMap(playerStats: PlayerMapStats, map: MapPool){
    return playerStats.mapStats.find((s) => s.name === map.toString());
  }
}

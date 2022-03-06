import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { FaceIT } from 'src/app/shared/models/FaceIT';
import {
  getDefaultMapStats,
  TeamMapStats,
} from 'src/app/shared/models/MapStats';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  templateUrl: './picker-matchpage.component.html',
  styleUrls: ['./picker-matchpage.component.css'],
})
export class PickerMatchpageComponent extends BaseComponent implements OnInit {
  faArrowLeft = faArrowLeft;

  matchId = '';

  teamName1 = 'Team 1';
  teamName2 = 'Team 2';

  mapStatsTeam1: TeamMapStats = {
    mapStats: getDefaultMapStats(),
  };
  mapStatsTeam2: TeamMapStats = {
    mapStats: getDefaultMapStats(),
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService
  ) {
    super();
  }

  ngOnInit(): void {
    this.mapStatsTeam1 = {
      mapStats: getDefaultMapStats(),
    };
    this.mapStatsTeam2 = {
      mapStats: getDefaultMapStats(),
    };
    this.registerSubscription(
      this.route.paramMap.subscribe((params) => {
        this.matchId = params.get('matchId') ?? '';
        this.loadData();
      })
    );
  }

  loadData() {
    this.registerSubscription(
      this.api.getMatchRoom(this.matchId).subscribe((data) => {
        if (data) {
          this.handleMatchroomData(data);
        }
      })
    );
  }

  handleMatchroomData(data: FaceIT.Match.Matchroom) {
    this.teamName1 = data.teams.faction1.name;
    this.teamName2 = data.teams.faction2.name;

    // Team 1
    for (let index = 0; index < data.teams.faction1.roster.length; index++) {
      const element = data.teams.faction1.roster[index];
      this.registerSubscription(
        this.api.getPlayerStats(element.player_id).subscribe((playerStats) => {
          if (playerStats) {
            this.handlePlayerStats(playerStats, 1);
          }
        })
      );
    }

    // Team 2
    for (let index = 0; index < data.teams.faction2.roster.length; index++) {
      const element = data.teams.faction2.roster[index];
      this.registerSubscription(
        this.api.getPlayerStats(element.player_id).subscribe((playerStats) => {
          if (playerStats) {
            this.handlePlayerStats(playerStats, 2);
          }
        })
      );
    }
  }

  handlePlayerStats(data: FaceIT.Player.PlayerStats, teamId: number) {
    const mapStats = data.segments.filter(
      (s) => s.mode === '5v5' && s.type === 'Map'
    );

    mapStats.forEach((v) => {
      const mapStats =
        teamId === 1
          ? this.mapStatsTeam1.mapStats
          : this.mapStatsTeam2.mapStats;

      const item = mapStats.find(
        (m) => m.name.toUpperCase() === v.label.replace('de_', '').toUpperCase() // remove de_ from Mapname and compare in uppercase
      );

      if (item) {
        item.matches += Number(v.stats.Matches);
        item.wins += Number(v.stats.Wins);
        item.losses = (item.matches - item.wins);

        item.rate = Math.round((item.wins / item.matches) * 100 * 100) / 100;
      }

      this.sortMapStats();
    });
  }

  sortMapStats() {
    this.mapStatsTeam1.mapStats.sort((a, b) => b.rate - a.rate);
    this.mapStatsTeam2.mapStats.sort((a, b) => b.rate - a.rate);
  }

  getMapPreview(map: string) {
    return 'assets/img/previews/de_' + map.toLowerCase() + '.jpg';
  }

  getBackgroundColor(winRate: number){
    return winRate >= 50 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)';
  }

  navigateBack() {
    this.router.navigate(['/']);
  }
}

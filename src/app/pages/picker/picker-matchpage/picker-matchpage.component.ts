import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Observable, tap } from 'rxjs';
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
  matchRoomData: FaceIT.Match.Matchroom;

  teamMapStats: TeamMapStats[] = [];

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
    const mapStats = data.segments.filter(
      (s) => s.mode === '5v5' && s.type === 'Map'
    );

    mapStats.forEach((v) => {
      const mapStats = this.teamMapStats[teamId].combinedMapStats;

      const item = mapStats.find(
        (m) => m.name.toUpperCase() === v.label.replace('de_', '').toUpperCase() // remove de_ from Mapname and compare in uppercase
      );

      if (item) {
        item.matches += +v.stats.Matches;
        item.wins += +v.stats.Wins;
        item.losses = item.matches - item.wins;

        item.rate = Math.round((item.wins / item.matches) * 100 * 100) / 100;
      }

      this.sortMapStats();
    });
  }

  sortMapStats() {
    this.teamMapStats[0].combinedMapStats.sort((a, b) => b.rate - a.rate);
    this.teamMapStats[1].combinedMapStats.sort((a, b) => b.rate - a.rate);
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

  getBackgroundColor(winRate: number) {
    return winRate >= 50 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)';
  }

  navigateBack() {
    this.router.navigate(['/']);
  }
}

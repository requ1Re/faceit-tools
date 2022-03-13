import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { FaceIT } from 'src/app/shared/models/FaceIT';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  templateUrl: './stats-player.component.html',
  styleUrls: ['./stats-player.component.css'],
})
export class StatsPlayerComponent extends BaseComponent implements OnInit {
  playerId = '';
  playerName = '';

  playerOverviewData$: Observable<FaceIT.PlayerOverview.Player>;
  playerStatsData$: Observable<FaceIT.Player.PlayerStats>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService
  ) {
    super();
  }

  ngOnInit(): void {
    this.registerSubscription(
      this.route.paramMap.subscribe((params) => {
        this.playerId = params.get('playerId') ?? '';
        this.playerName = params.get('playerName') ?? '';
        this.loadData();
      })
    );
  }

  loadData(){
    this.playerOverviewData$ = this.api.getPlayerStatsByName(this.playerName);
    this.playerStatsData$ = this.api.getPlayerStats(this.playerId);
  }
}

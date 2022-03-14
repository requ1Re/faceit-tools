import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { FaceIT } from 'src/app/shared/models/FaceIT';
import { ApiService } from 'src/app/shared/services/api.service';
import { ErrorService } from 'src/app/shared/services/error.service';

@Component({
  templateUrl: './stats-player.component.html',
  styleUrls: ['./stats-player.component.css'],
})
export class StatsPlayerComponent extends BaseComponent implements OnInit {
  faExclamationTriangle = faExclamationTriangle;

  playerId = '';
  playerName = '';

  playerOverviewData$: Observable<FaceIT.PlayerOverview.Player>;
  playerStatsData$: Observable<FaceIT.Player.PlayerStats>;

  error = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private errorService: ErrorService
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

    this.registerSubscription(
      this.errorService.errorObj.subscribe((errorObj) => {
        this.error = errorObj.error;
      })
    );
  }

  loadData() {
    this.playerOverviewData$ = this.api.getPlayerStatsByName(this.playerName);
    this.playerStatsData$ = this.api.getPlayerStats(this.playerId);
  }

  getRecentResults(data: FaceIT.Player.PlayerStats) {
    return data.lifetime['Recent Results']
      .map((r) => (r == '1' ? 'W' : 'L'))
      .join(' ');
  }

  getProfilePicture(data: FaceIT.PlayerOverview.Player){
    return data.avatar ? data.avatar : 'assets/img/steam_default.png';
  }
}

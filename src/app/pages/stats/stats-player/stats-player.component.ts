import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  templateUrl: './stats-player.component.html',
  styleUrls: ['./stats-player.component.css'],
})
export class StatsPlayerComponent extends BaseComponent implements OnInit {
  playerId = '';

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
        this.loadData();
      })
    );
  }

  loadData(){

  }
}

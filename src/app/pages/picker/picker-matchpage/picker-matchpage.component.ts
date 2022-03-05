import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DEFAULT_MAP_STATS, TeamMapStats } from 'src/app/shared/models/MapStats';

@Component({
  templateUrl: './picker-matchpage.component.html',
  styleUrls: ['./picker-matchpage.component.css']
})
export class PickerMatchpageComponent implements OnInit {

  matchId = "";

  teamName1 = "Team 1";
  teamName2 = "Team 2";

  mapStatsTeam1: TeamMapStats = DEFAULT_MAP_STATS;
  mapStatsTeam2: TeamMapStats = DEFAULT_MAP_STATS;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.matchId = this.route.snapshot.paramMap.get("matchId") ?? '';
  }

  getMapPreview(map: string){
    return "assets/img/previews/de_" + map.toLowerCase() + ".jpg";
  }
}

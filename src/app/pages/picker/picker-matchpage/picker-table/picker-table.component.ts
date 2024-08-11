import { Component, Input, OnInit } from '@angular/core';
import { TeamMapStats } from 'src/app/shared/models/MapStats';

@Component({
  selector: 'app-picker-table',
  templateUrl: './picker-table.component.html',
  styleUrls: ['./picker-table.component.scss']
})
export class PickerTableComponent implements OnInit {
  @Input()
  teamAvatar: string;

  @Input()
  teamName: string;

  @Input()
  teamMapStats: TeamMapStats;

  @Input()
  reverse = false;

  constructor() { }

  ngOnInit(): void {
  }



  getMapPreview(map: string) {
    return 'assets/img/previews/de_' + map.toLowerCase() + '.jpeg';
  }

  getBackgroundColor(winRate: number) {
    return winRate >= 50 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)';
  }

  getRoundedNumber(number: number) {
    return Math.round((number + Number.EPSILON) * 100) / 100;
  }
}

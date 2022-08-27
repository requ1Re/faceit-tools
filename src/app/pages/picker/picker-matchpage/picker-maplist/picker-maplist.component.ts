import { Component, OnInit } from '@angular/core';
import { ActiveDutyMap } from 'src/app/shared/models/MapPool';

@Component({
  selector: 'app-picker-maplist',
  templateUrl: './picker-maplist.component.html',
  styleUrls: ['./picker-maplist.component.scss']
})
export class PickerMaplistComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getMaps() {
    return Object.values(ActiveDutyMap).filter((v) => typeof v === 'string');
  }
}

import { Component, OnInit } from '@angular/core';
import { ActiveDutyMap } from 'src/app/shared/models/MapPool';
import { BrowserService } from 'src/app/shared/services/browser.service';

@Component({
  selector: 'app-picker-maplist',
  templateUrl: './picker-maplist.component.html',
  styleUrls: ['./picker-maplist.component.scss']
})
export class PickerMaplistComponent implements OnInit {

  enableBackdropFilter = false;

  constructor(private browserService: BrowserService) { }

  ngOnInit(): void {
    this._enableBackdropFilter();
  }

  getMaps() {
    return Object.values(ActiveDutyMap).filter((v) => typeof v === 'string');
  }

  getMapPreviewStyle(map: ActiveDutyMap){
    return `url('assets/img/previews/de_${map.toLowerCase()}.jpeg')`;
  }

  async _enableBackdropFilter(){
    this.enableBackdropFilter = await this.browserService.isUsingHardwareAcceleration()
  }
}

import { Component, OnInit } from '@angular/core';
import { faToolbox } from '@fortawesome/free-solid-svg-icons';
import { Config, ConfigUtil } from '../../utils/ConfigUtil';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  tools: Config.Tool[] = ConfigUtil.CONFIG.tools;

  faToolbox = faToolbox;

  constructor() {}
}

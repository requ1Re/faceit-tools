import { Component, OnInit } from '@angular/core';
import { Config, ConfigUtil } from '../../utils/ConfigUtil';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  tools: Config.Tool[] = ConfigUtil.CONFIG.tools;

  constructor() {}
}

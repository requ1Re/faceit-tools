import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faToolbox } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { Config, ConfigUtil } from '../../utils/ConfigUtil';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [RouterLink, FaIconComponent, NgFor, NgIf, RouterLinkActive, TranslateModule],
})
export class HeaderComponent {
  tools: Config.Tool[] = ConfigUtil.CONFIG.tools;

  faToolbox = faToolbox;

  constructor() {}
}

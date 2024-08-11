import { Component, OnInit } from '@angular/core';
import { faToolbox } from '@fortawesome/free-solid-svg-icons';
import { Config, ConfigUtil } from '../../utils/ConfigUtil';
import { NgFor, NgIf } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [
        RouterLink,
        FaIconComponent,
        NgFor,
        NgIf,
        RouterLinkActive,
    ],
})
export class HeaderComponent {
  tools: Config.Tool[] = ConfigUtil.CONFIG.tools;

  faToolbox = faToolbox;

  constructor() {}
}

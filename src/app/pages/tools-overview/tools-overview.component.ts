import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faInfoCircle, faToolbox } from '@fortawesome/free-solid-svg-icons';
import { BrowserService } from 'src/app/shared/services/browser.service';
import { Config, ConfigUtil } from 'src/app/shared/utils/ConfigUtil';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NgFor, NgIf } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
    templateUrl: './tools-overview.component.html',
    styleUrls: ['./tools-overview.component.scss'],
    standalone: true,
    imports: [
        FaIconComponent,
        NgFor,
        NgIf,
        FooterComponent,
    ],
})
export class ToolsOverviewComponent implements OnInit {

  tools: Config.Tool[] = ConfigUtil.CONFIG.tools;

  faToolbox = faToolbox;
  faInfoCircle = faInfoCircle;

  constructor(private router: Router, private route: ActivatedRoute, private browserService: BrowserService) {}

  ngOnInit(): void {
    this.browserService.getDocument().title = "FACEIT Tools"
  }

  gotoTool(toolId: number) {
    this.router.navigate([this.tools[toolId].route], {
      relativeTo: this.route,
    });
  }
}

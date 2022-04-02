import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faInfoCircle, faToolbox } from '@fortawesome/free-solid-svg-icons';
import { Config, ConfigUtil } from 'src/app/shared/utils/ConfigUtil';

@Component({
  templateUrl: './tools-overview.component.html',
  styleUrls: ['./tools-overview.component.css'],
})
export class ToolsOverviewComponent implements OnInit {

  tools: Config.Tool[] = ConfigUtil.CONFIG.tools;

  faToolbox = faToolbox;
  faInfoCircle = faInfoCircle;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    document.title = "requiRe's FACEIT Tools"
  }

  gotoTool(toolId: number) {
    this.router.navigate([this.tools[toolId].route], {
      relativeTo: this.route,
    });
  }
}

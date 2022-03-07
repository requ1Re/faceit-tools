import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Config, ConfigUtil } from 'src/app/shared/utils/ConfigUtil';

@Component({
  templateUrl: './tools-overview.component.html',
  styleUrls: ['./tools-overview.component.css'],
})
export class ToolsOverviewComponent implements OnInit {

  tools: Config.Tool[] = ConfigUtil.CONFIG.tools;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  gotoTool(toolId: number) {
    this.router.navigate([this.tools[toolId].route], {
      relativeTo: this.route,
    });
  }
}
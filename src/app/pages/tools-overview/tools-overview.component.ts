import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

type Tool = {
  id: number;
  name: string;
  route: string;
};

@Component({
  templateUrl: './tools-overview.component.html',
  styleUrls: ['./tools-overview.component.css'],
})
export class ToolsOverviewComponent implements OnInit {

  tools: Tool[] = [
    { id: 0, name: 'Map Picker', route: 'picker' }
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  gotoTool(toolId: number) {
    this.router.navigate([this.tools[toolId].route], {
      relativeTo: this.route,
    });
  }
}

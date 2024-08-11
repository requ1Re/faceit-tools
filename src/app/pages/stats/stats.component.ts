import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.scss'],
    standalone: true,
    imports: [RouterOutlet]
})
export class StatsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

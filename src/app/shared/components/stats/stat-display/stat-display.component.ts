import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stat-display',
  templateUrl: './stat-display.component.html',
  styleUrls: ['./stat-display.component.css']
})
export class StatDisplayComponent implements OnInit {

  @Input()
  name: string;

  @Input()
  value: string|number|undefined;

  @Input()
  valueHTML: string|undefined;

  constructor() { }

  ngOnInit(): void {
  }

}

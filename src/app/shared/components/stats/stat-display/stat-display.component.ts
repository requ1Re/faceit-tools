import { Component, Input, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { CardComponent } from '../../card/card.component';

@Component({
    selector: 'app-stat-display',
    templateUrl: './stat-display.component.html',
    styleUrls: ['./stat-display.component.scss'],
    standalone: true,
    imports: [CardComponent, NgIf]
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

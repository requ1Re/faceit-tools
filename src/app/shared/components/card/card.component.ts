import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    standalone: true
})
export class CardComponent implements OnInit {

  @Input()
  noPadding = false;

  @Input('customClass')
  klass: string;

  constructor() { }

  ngOnInit(): void {
  }

}

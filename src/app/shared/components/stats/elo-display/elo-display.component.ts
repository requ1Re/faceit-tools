import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-elo-display',
  templateUrl: './elo-display.component.html',
  styleUrls: ['./elo-display.component.scss']
})
export class EloDisplayComponent implements OnInit {

  @Input()
  elo: number = 800;

  constructor() { }

  ngOnInit(): void {
  }

  getPercentageToLevel10(){
    const percent = this.elo / 2001 * 100;
    return percent > 100 ? 100 : percent;
  }
}

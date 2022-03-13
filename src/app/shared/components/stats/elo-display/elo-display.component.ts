import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-elo-display',
  templateUrl: './elo-display.component.html',
  styleUrls: ['./elo-display.component.css']
})
export class EloDisplayComponent implements OnInit {

  @Input()
  elo: number = 2200;

  constructor() { }

  ngOnInit(): void {
  }

  getPercentage(){
    const percent = this.elo / 2000 * 100;
    return percent > 100 ? 100 : percent;
  }
}

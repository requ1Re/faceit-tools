import { Component, Input, OnInit } from '@angular/core';
import { EloUtil, LevelElo } from 'src/app/shared/utils/EloUtil';

@Component({
    selector: 'app-elo-display',
    templateUrl: './elo-display.component.html',
    styleUrls: ['./elo-display.component.scss'],
    standalone: true
})
export class EloDisplayComponent implements OnInit {

  @Input()
  elo: number = 100;

  constructor() { }

  ngOnInit(): void {
  }

  getPercentageToLevel10(){
    const percent = this.elo / 2001 * 100;
    return percent > 100 ? 100 : percent;
  }

  getElos(){
    return EloUtil.LEVEL_ELO;
  }

  calculatePercentage(item: LevelElo, isFirst: boolean){
    if(!item.to) return;

    let range = (item.to - item.from);
    if(isFirst) range += EloUtil.LEVEL_ELO[0].from; // Add difference from 0 because Level 1 does not start at 0.

    const percentage = range/2000*100;
    return percentage + '%';
  }
}

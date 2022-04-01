import { Component, Input, OnInit } from '@angular/core';
import { FaceIT } from 'src/app/shared/models/FaceIT';
import { PlayerMatchHistoryDetailed } from 'src/app/shared/models/PlayerMatchHistoryDetailed';

@Component({
  selector: 'app-match-history-display',
  templateUrl: './match-history-display.component.html',
  styleUrls: ['./match-history-display.component.css']
})
export class MatchHistoryDisplayComponent implements OnInit {

  @Input()
  matches: PlayerMatchHistoryDetailed[];

  @Input()
  selectedPlayerId: string;

  constructor() { }

  ngOnInit(): void {
  }


  getBestOf(match: PlayerMatchHistoryDetailed){
    return match.stats.rounds.length;
  }

  getDate(match: PlayerMatchHistoryDetailed){
    return match.history.finished_at;
  }

  getMatchType(match: PlayerMatchHistoryDetailed){
    return match.history.game_mode;
  }

  getScore(match: PlayerMatchHistoryDetailed){
    return match.stats.rounds.map(r => this.getSingleRoundScore(r)).join(', ');
  }

  getSingleRoundScore(round: FaceIT.MatchStats.Maps){
    return round.round_stats.Score;
  }

  getMaps(match: PlayerMatchHistoryDetailed){
    return match.stats.rounds.map((r) => r.round_stats.Map).join(', ');
  }
}

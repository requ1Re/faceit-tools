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

  collapsedId = -1;

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

  getFormattedScore(match: PlayerMatchHistoryDetailed){
    let scores: string[] = [];
    match.stats.rounds.forEach((r) => {
      const s = r.round_stats.Score.split(' / ');
      if(+s[0] > +s[1]){
        scores.push(`<span class="text-green">${s[0]}</span> / <span class="text-red">${s[1]}</span>`);
      }else{
        scores.push(`<span class="text-red">${s[0]}</span> / <span class="text-green">${s[1]}</span>`);
      }
    });
    return scores.join(', ');
  }

  getWinLossFormatted(match: PlayerMatchHistoryDetailed){
    let results: string[] = [];
    match.stats.rounds.forEach((r) => {
      const winner = r.round_stats.Winner;
      const playerTeam = r.teams[0].players.find(
        (p) => p.player_id === this.selectedPlayerId
      )
        ? r.teams[0]
        : r.teams[1];

        console.log(playerTeam.players.find((p) => p.player_id === this.selectedPlayerId)?.player_stats.Result)

      results.push(
        playerTeam.team_id === winner
          ? `<span class="text-green">WIN</span>`
          : `<span class="text-red">LOSS</span>`
      );
    });
    return results.join(', ');
  }

  getTeamPlayersSorted(players: FaceIT.MatchStats.Player[]){
    return players.sort((a, b) => +b.player_stats.Kills - +a.player_stats.Kills);
  }

  getSingleRoundScore(round: FaceIT.MatchStats.Maps){
    return round.round_stats.Score;
  }

  getMaps(match: PlayerMatchHistoryDetailed){
    return match.stats.rounds.map((r) => r.round_stats.Map).join(', ');
  }
}

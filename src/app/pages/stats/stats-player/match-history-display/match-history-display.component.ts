import { Component, Input, OnInit } from '@angular/core';
import { faExternalLink, faMapLocation, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FaceIT } from 'src/app/shared/models/FaceIT';
import { PlayerMatchHistoryDetailed } from 'src/app/shared/models/PlayerMatchHistoryDetailed';

@Component({
  selector: 'app-match-history-display',
  templateUrl: './match-history-display.component.html',
  styleUrls: ['./match-history-display.component.css'],
})
export class MatchHistoryDisplayComponent implements OnInit {

  faExternalLink = faExternalLink;
  faMapLocationDot = faMapLocationDot;

  @Input()
  matches: PlayerMatchHistoryDetailed[];

  @Input()
  selectedPlayerId: string;

  collapsedId = -1;

  constructor() {}

  ngOnInit(): void {}

  showMore = false;

  getBestOf(match: PlayerMatchHistoryDetailed) {
    return match.stats.rounds.length;
  }

  getDate(match: PlayerMatchHistoryDetailed) {
    return match.history.finished_at;
  }

  getMatchType(match: PlayerMatchHistoryDetailed) {
    return match.history.game_mode;
  }

  getScore(match: PlayerMatchHistoryDetailed) {
    return match.stats.rounds
      .map((r) => this.getSingleRoundScore(r))
      .join(', ');
  }

  getFormattedScore(match: PlayerMatchHistoryDetailed) {
    let scores: string[] = [];
    match.stats.rounds.forEach((r) => {
      const s = r.round_stats.Score.split(' / ');
      if (+s[0] > +s[1]) {
        scores.push(
          `<span class="text-green">${s[0]}</span> / <span class="text-red">${s[1]}</span>`
        );
      } else {
        scores.push(
          `<span class="text-red">${s[0]}</span> / <span class="text-green">${s[1]}</span>`
        );
      }
    });
    return scores.join(', ');
  }

  getWinLossFormatted(match: PlayerMatchHistoryDetailed) {
    let results: string[] = [];
    match.stats.rounds.forEach((r) => {
      const winnerTeamId = r.round_stats.Winner;
      const winnerTeamIndex = r.teams.findIndex(
        (t) => t.team_id === winnerTeamId
      );

      const isWin =
        r.teams[winnerTeamIndex].players.findIndex(
          (p) => p.player_id === this.selectedPlayerId
        ) > -1;

      results.push(
        isWin
          ? `<span class="text-green">WIN</span>`
          : `<span class="text-red">LOSS</span>`
      );
    });
    return results.join(', ');
  }

  getTeamPlayersSorted(players: FaceIT.MatchStats.Player[]) {
    return players.sort(
      (a, b) => +b.player_stats.Kills - +a.player_stats.Kills
    );
  }

  getSingleRoundScore(round: FaceIT.MatchStats.Maps) {
    return round.round_stats.Score;
  }

  getMaps(match: PlayerMatchHistoryDetailed) {
    return match.stats.rounds
      .map((r) => r.round_stats.Map)
      .map((m) => this.formatMapName(m))
      .join(', ');
  }

  formatMapName(mapName: string){
    return this.capitalizeFirstLetter(mapName.replace('de_', ''));
  }

  getSelectedPlayerStats(match: PlayerMatchHistoryDetailed) {
    let stats: string[] = [];
    match.stats.rounds.forEach((r) => {
      const player = r.teams
        .find((t) =>
          t.players.find((p) => p.player_id === this.selectedPlayerId)
        )
        ?.players.find((p) => p.player_id === this.selectedPlayerId);

      stats.push(
        `${player?.player_stats.Kills ?? '?'}/${
          player?.player_stats.Assists ?? '?'
        }/${player?.player_stats.Deaths ?? '?'}`
      );
    });

    return stats.join(', ');
  }

  capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  getMatchesSubset(){
    return this.showMore ? this.matches : this.matches.slice(0, 10);
  }
}

import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faExternalLink, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { MomentModule } from 'ngx-moment';
import { FaceIT } from 'src/app/shared/models/FaceIT';
import { PlayerMatchHistoryDetailed } from 'src/app/shared/models/PlayerMatchHistoryDetailed';
import { StringUtil } from 'src/app/shared/utils/StringUtil';

@Component({
    selector: 'app-match-history-display',
    templateUrl: './match-history-display.component.html',
    styleUrls: ['./match-history-display.component.scss'],
    standalone: true,
    imports: [
        NgFor,
        RouterLink,
        FaIconComponent,
        NgIf,
        MomentModule,
    ],
})
export class MatchHistoryDisplayComponent {

  faExternalLink = faExternalLink;
  faMapLocationDot = faMapLocationDot;

  @Input()
  matches: PlayerMatchHistoryDetailed[];

  @Input()
  selectedPlayerId: string;

  collapsedId = -1;

  matchCountDefault = 10;
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
    // remove de_, cs_ and workshop prefix from map name
    const cleanedMapName = mapName.replace('de_', '').replace('cs_', '').replace(/workshop\/[0-9]+\/(.*)/, '$1');
    return StringUtil.capitalizeFirstLetter(cleanedMapName);
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

  getMatchesSubset(){
    return this.showMore ? this.matches : this.matches.slice(0, this.matchCountDefault);
  }
}

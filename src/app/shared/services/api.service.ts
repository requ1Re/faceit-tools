import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, combineLatest, concat, concatMap, from, map, merge, mergeMap, Observable, of, switchMap, toArray } from 'rxjs';
import { environment } from 'src/environments/environment';
import { App } from '../models/App';
import { Backend } from '../models/Backend';
import { FaceIT } from '../models/FaceIT';
import { PlayerMatchHistoryDetailed } from '../models/PlayerMatchHistoryDetailed';
import { LogService } from './log.service';

@Injectable()
export class ApiService {
  readonly FACEIT_API_KEY = environment['FACEIT_API_KEY'];

  readonly MATCH_COUNT = 30;

  readonly HEADERS = {
    Authorization: 'Bearer ' + this.FACEIT_API_KEY,
  };

  constructor(private http: HttpClient, private logService: LogService) {}

  getMatchRoom(matchRoomId: string) {
    return this.http.get<FaceIT.Match.Matchroom>(
      'https://open.faceit.com/data/v4/matches/' + matchRoomId,
      { headers: this.HEADERS }
    );
  }

  getMatchRoomStats(matchRoomId: string){
    return this.http.get<FaceIT.MatchStats.Response>(
      'https://open.faceit.com/data/v4/matches/' + matchRoomId + '/stats',
      { headers: this.HEADERS }
    );
  }

  getPlayerDetails(playerName: string): Observable<App.Player.Details> {
    this.logService.log('API', 'getPlayerDetails for', playerName);
    return this.getPlayerOverviewByName(playerName).pipe(
      switchMap((res1) =>
        this.getPlayerStats(res1.player_id).pipe(
          mergeMap((res2) => of({ overview: res1, stats: res2 }))
        )
      )
    );
  }

  // getPlayerMatchHistoryDetailed(playerId: string, matchCount = 20) {
  //   this.logService.log('API', 'getPlayerMatchHistoryDetailed for', playerId);
  //   return this.getPlayerMatchHistory(playerId, matchCount).pipe(
  //     // i.started_at !== i.finished_at -> matches that started and ended at the same time throw 404
  //     mergeMap(response => combineLatest(response.items.filter(i => i.started_at !== i.finished_at).map(item => this.getMatchRoomStats(item.match_id))).pipe(
  //       map(items => items),
  //     ))
  //   );
  // }


  getPlayerMatchHistoryDetailed(playerId: string, matchCount = this.MATCH_COUNT): Observable<PlayerMatchHistoryDetailed[]> {
    this.logService.log('API', 'getPlayerMatchHistoryDetailed for', playerId);
    return this.getPlayerMatchHistory(playerId, matchCount).pipe(
      // i.started_at !== i.finished_at -> matches that started and ended at the same time throw 404
      mergeMap(response => combineLatest(response.items.filter(i => i.started_at !== i.finished_at).map(item => this.getMatchRoomStats(item.match_id).pipe(
        map(matchRoom => ({stats:matchRoom, history:item}))
      ))).pipe(
        map(items => items),
      ))
    );
  }

  getPlayerStats(playerId: string) {
    return this.http.get<FaceIT.Player.PlayerStats>(
      'https://open.faceit.com/data/v4/players/' + playerId + '/stats/csgo',
      { headers: this.HEADERS }
    );
  }

  getPlayerMatchHistory(playerId: string, matchCount = this.MATCH_COUNT) {
    return this.http.get<FaceIT.MatchHistory.Response>(
      'https://open.faceit.com/data/v4/players/' + playerId + '/history?game=csgo&offset=0&limit=' + matchCount,
      { headers: this.HEADERS }
    );
  }

  getPlayerOverviewByName(playerName: string){
    return this.http.get<FaceIT.PlayerOverview.Player>(
      'https://open.faceit.com/data/v4/players?nickname=' + playerName + '&game=csgo',
      { headers: this.HEADERS }
    );
  }

  resolveVanityURL(vanityURL: string){
    return this.http.get<Backend.ResolveVanityURLResponse>(
      `api/resolve/${vanityURL}`
    );
  }

  findFACEITAccountBySteamID(steamId: string){
    return this.http.get<FaceIT.PlayerOverview.Player>(
      'https://open.faceit.com/data/v4/players?game_player_id=' + steamId + '&game=csgo',
      { headers: this.HEADERS }
    );
  }
}

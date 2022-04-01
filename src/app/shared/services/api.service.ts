import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, mergeMap, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { App } from '../models/App';
import { Backend } from '../models/Backend';
import { FaceIT } from '../models/FaceIT';

@Injectable()
export class ApiService {
  readonly FACEIT_API_KEY = environment['FACEIT_API_KEY'];
  readonly BACKEND_API_URL = environment['API_URL'];

  readonly HEADERS = {
    Authorization: 'Bearer ' + this.FACEIT_API_KEY,
  };

  constructor(private http: HttpClient) {}

  getMatchRoom(matchRoomId: string) {
    return this.http.get<FaceIT.Match.Matchroom>(
      'https://open.faceit.com/data/v4/matches/' + matchRoomId,
      { headers: this.HEADERS }
    );
  }

  getPlayerDetails(playerName: string): Observable<App.Player.Details> {
    this.logDebug('getPlayerDetails for', playerName);
    return this.getPlayerOverviewByName(playerName).pipe(
      switchMap(res1 =>
        this.getPlayerStats(res1.player_id).pipe(
          mergeMap(res2 => (
            of({ overview: res1, stats: res2 })
          ))
        )
      )
    )
  }


  getPlayerStats(playerId: string) {
    return this.http.get<FaceIT.Player.PlayerStats>(
      'https://open.faceit.com/data/v4/players/' + playerId + '/stats/csgo',
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
      `${this.BACKEND_API_URL}/resolve/${vanityURL}`
    );
  }

  findFACEITAccountBySteamID(steamId: string){
    return this.http.get<FaceIT.PlayerOverview.Player>(
      'https://open.faceit.com/data/v4/players?game_player_id=' + steamId + '&game=csgo',
      { headers: this.HEADERS }
    );
  }

  logDebug(text: string, ...optionalParams: any[]){
    if(!environment.production){
      console.log('[ApiService] ' + text, optionalParams);
    }
  }
}

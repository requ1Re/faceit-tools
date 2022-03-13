import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FaceIT } from '../models/FaceIT';

@Injectable()
export class ApiService {
  readonly FACEIT_API_KEY = environment.faceitApiKey;
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

  getPlayerStats(playerId: string) {
    return this.http.get<FaceIT.Player.PlayerStats>(
      'https://open.faceit.com/data/v4/players/' + playerId + '/stats/csgo',
      { headers: this.HEADERS }
    );
  }

  getPlayerStatsByName(playerName: string){
    return this.http.get<FaceIT.PlayerOverview.Player>(
      'https://open.faceit.com/data/v4/players?nickname=' + playerName + '&game=csgo',
      { headers: this.HEADERS }
    );
  }
}

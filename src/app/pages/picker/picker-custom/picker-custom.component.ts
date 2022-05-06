import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BaseComponentWithStatsStore } from 'src/app/shared/components/base-stats-store/base-stats-store';
import { PlayerSelectDialogData } from 'src/app/shared/components/player-select-dialog/player-select-dialog.component';
import { CustomMapPickerMatchPlayer } from 'src/app/shared/models/CustomMapPickerMatch';
import { FaceIT } from 'src/app/shared/models/FaceIT';
import { PlayerSelectDialogService } from 'src/app/shared/services/player-select-dialog.service';
import { StatsState } from 'src/app/shared/store/stats/stats.reducer';

@Component({
  selector: 'app-picker-custom',
  templateUrl: './picker-custom.component.html',
  styleUrls: ['./picker-custom.component.css'],
})
export class PickerCustomComponent
  extends BaseComponentWithStatsStore
  implements OnInit
{
  faUser = faUser;

  teams: CustomMapPickerMatchPlayer[][] = [[], []];

  constructor(
    private dialog: MatDialog,
    store: Store<StatsState>,
    actions$: Actions,
    private router: Router,
    private route: ActivatedRoute,
    private playerSelectDialogService: PlayerSelectDialogService
  ) {
    super(store, actions$);
  }

  init() {
    this.route.paramMap.subscribe((params) => {
      if (params) {
        const customData = params.get('customDataBase64');
        if (customData) {
          this.teams = JSON.parse(atob(customData)) as CustomMapPickerMatchPlayer[][];
        }
      }
    });
  }

  selectPlayer(teamId: number, index: number) {
    if(this.teams[teamId][index]){
      this.teams[teamId].splice(index, 1);
      return;
    }

    const data: PlayerSelectDialogData = { value: '', instantSearch: false };
    this.playerSelectDialogService.open((result) => {
      if (result) {
        for(let teamIndex = 0; teamIndex < this.teams.length; teamIndex++){
          this.teams[teamIndex] = this.teams[teamIndex].filter(
            (item) => item.playerId !== result.player_id
          );
        }

        this.teams[teamId].push({
          nickname: result.nickname,
          playerId: result.player_id,
          avatar: result.avatar,
          skillLevel: +(result.games.find(g => g.name === "csgo")?.skill_level ?? 1),
          country: result.country
        });
      }
    }, data);
  }

  getSkillLevel(player: FaceIT.Search.Item) {
    return player.games.find((g) => g.name === 'csgo')?.skill_level ?? 1;
  }

  continue(){
    const data: string[][] = this.teams.map((team) =>
      team.map((item) => item.nickname)
    );
    this.router.navigate(['/picker/match/custom/', ...data.map((d) => d.join(','))]);
  }

  canContinue(){
    return this.teams[0].length >= 1 && this.teams[1].length >= 1;
  }
}

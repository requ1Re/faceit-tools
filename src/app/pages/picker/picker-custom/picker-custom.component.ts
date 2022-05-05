import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BaseComponentWithStatsStore } from 'src/app/shared/components/base-stats-store/base-stats-store';
import { PlayerSelectDialogComponent, PlayerSelectDialogData } from 'src/app/shared/components/player-select-dialog/player-select-dialog.component';
import { FaceIT } from 'src/app/shared/models/FaceIT';
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

  teams: FaceIT.Search.Item[][] = [[], []]; // array of array of search items o.O

  constructor(
    private dialog: MatDialog,
    store: Store<StatsState>,
    actions$: Actions
  ) {
    super(store, actions$);
  }

  init() {}

  selectPlayer(teamId: number, index: number) {
    const data: PlayerSelectDialogData = { value: '', instantSearch: false };
    let dialogRef = this.dialog.open(PlayerSelectDialogComponent, {
      data,
      height: '80%',
      width: '600px',
      backdropClass: 'backdrop',
    });

    this.registerSubscription(
      dialogRef.afterClosed().subscribe((result: FaceIT.Search.Item | null) => {
        if (result) {
          this.teams[teamId] = this.teams[teamId].filter(
            (item) => item.player_id !== result.player_id
          );
          if (!this.teams[teamId][index]) {
            this.teams[teamId].push(result);
          } else {
            this.teams[teamId][index] = result;
          }
        }
      })
    );
  }

  getSkillLevel(player: FaceIT.Search.Item) {
    return player.games.find((g) => g.name === 'csgo')?.skill_level ?? 1;
  }
}

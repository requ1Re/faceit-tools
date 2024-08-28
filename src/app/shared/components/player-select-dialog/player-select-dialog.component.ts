import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { FaceIT } from '../../models/FaceIT';
import { ApiService } from '../../services/api.service';
import { BaseComponent } from '../base/base';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-player-select-dialog',
  templateUrl: './player-select-dialog.component.html',
  styleUrls: ['./player-select-dialog.component.scss'],
  standalone: true,
  imports: [FaIconComponent, LoadingSpinnerComponent, TranslateModule],
})
export class PlayerSelectDialogComponent extends BaseComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<PlayerSelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PlayerSelectDialogData,
  ) {
    super();
  }

  isErroneous: boolean = false;
  errorText: string = '';
  disableSubmit = false;
  _value: string = '';
  faSearch = faSearch;

  players: FaceIT.Search.Item[] = [];

  ngOnInit(): void {
    if (this.data.instantSearch) {
      this._value = this.data.value;
      this.submit();
    }
  }

  handleInput(event: any) {
    const val = event.target.value ?? '';
    this._value = val;
  }

  submit() {
    if (!this.disableSubmit) {
      this.disableSubmit = true;
      this.registerSubscription(
        this.apiService.searchFACEITAccountsByString(this._value).subscribe((data) => {
          if (data) {
            this.players = data.items;
          } else {
            this.isErroneous = true;
            this.errorText = 'Search has failed';
          }
          this.disableSubmit = false;
        }),
      );
    }
  }

  getSkillLevel(player: FaceIT.Search.Item) {
    return player.games.find((g) => g.name === 'cs2')?.skill_level ?? 1;
  }

  selectPlayer(player: FaceIT.Search.Item) {
    this.dialogRef.close(player);
  }
}

export interface PlayerSelectDialogData {
  value: string;
  instantSearch: boolean;
}

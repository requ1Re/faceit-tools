import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PlayerSelectDialogComponent, PlayerSelectDialogData } from "../components/player-select-dialog/player-select-dialog.component";
import { FaceIT } from "../models/FaceIT";

@Injectable({
  providedIn: 'root',
})
export class PlayerSelectDialogService {
  constructor(private dialog: MatDialog) {}

  open(
    callback: (result: FaceIT.Search.Item | null) => void,
    data: PlayerSelectDialogData = { value: '', instantSearch: false }
  ) {
    let dialogRef = this.dialog.open(PlayerSelectDialogComponent, {
      data,
      height: '80%',
      width: '600px',
      backdropClass: 'backdrop',
    });

    dialogRef.afterClosed().subscribe((result) => {
      callback(result);
    });
  }
}

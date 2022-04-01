import { FaceIT } from "./FaceIT";

export namespace App {
  export namespace Player {
    export interface Details {
      overview: FaceIT.PlayerOverview.Player;
      stats: FaceIT.Player.PlayerStats;
    }
  }
}

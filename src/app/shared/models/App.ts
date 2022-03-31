import { FaceIT } from "./FaceIT";

export namespace App {
  export namespace Stats {
    export interface Player {
      playerOverview: FaceIT.PlayerOverview.Player,
      playerStats: FaceIT.Player.PlayerStats
    }
  }
}

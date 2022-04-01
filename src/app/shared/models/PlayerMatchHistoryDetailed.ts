import { FaceIT } from "./FaceIT";

export interface PlayerMatchHistoryDetailed {
  stats: FaceIT.MatchStats.Response;
  history: FaceIT.MatchHistory.Match;
}

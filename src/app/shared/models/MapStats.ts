import { ActiveDutyMap } from "./MapPool";

export interface TeamMapStats {
  combinedMapStats: MapStats[];
  playerMapStats: PlayerMapStats[];
}

export interface PlayerMapStats {
  name: string;
  mapStats: MapStats[]
}

export interface MapStats {
  name: string;
  matches: number;
  wins: number;
  losses: number;
  rate: number;
}

export function getDefaultMapStats(): MapStats[] {
  return Object.values(ActiveDutyMap).filter((v) => typeof v === "string").map((map) => {
    return {
      name: map.toString(),
      matches: 0,
      wins: 0,
      losses: 0,
      rate: 0
    };
  });
}

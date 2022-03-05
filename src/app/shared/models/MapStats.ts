import { MapPool } from "./MapPool";

export interface TeamMapStats {
  mapStats: MapStats[];
}

export interface MapStats {
  name: string;
  matches: number;
  rate: number;
}

export const DEFAULT_MAP_STATS: TeamMapStats = {
  mapStats: getMapStats()
}

function getMapStats(): MapStats[] {
  return Object.values(MapPool).filter((v) => typeof v === "string").map((map) => {
    return {
      name: map.toString(),
      matches: 0,
      rate: 0,
    };
  });
}

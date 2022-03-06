import { MapPool } from "./MapPool";

export interface TeamMapStats {
  mapStats: MapStats[];
}

export interface MapStats {
  name: string;
  matches: number;
  wins: number;
  rate: number;
}

export function getDefaultMapStats(): MapStats[] {
  return Object.values(MapPool).filter((v) => typeof v === "string").map((map) => {
    return {
      name: map.toString(),
      matches: 0,
      wins: 0,
      rate: 0
    };
  });
}

export namespace FaceIT {
  /*
  Match Room (/match/{id})
  */
  export namespace Match {
    export interface Matchroom {
      match_id: string;
      version: number;
      game: Game;
      region: string;
      competition_id: string;
      competition_type: string;
      competition_name: string;
      organizer_id: string;
      teams: Teams;
      voting: Voting;
      calculate_elo: boolean;
      configured_at: number;
      started_at: number;
      chat_room_id: string;
      best_of: number;
      results: Results;
      status: string;
      faceit_url: string;
    }

    export enum Game {
      CSGO = 'csgo',
    }

    export enum Membership {
      CSGO = 'csgo',
      FREE = 'free',
      PREMIUM = 'premium',
    }

    export interface Results {
      winner: string;
      score: Score;
    }

    export interface Score {
      faction1: number;
      faction2: number;
    }

    export interface Teams {
      faction2: Faction;
      faction1: Faction;
    }

    export interface Faction {
      faction_id: string;
      leader: string;
      avatar: string;
      roster: Roster[];
      substituted: boolean;
      name: string;
      type: string;
    }

    export interface Roster {
      player_id: string;
      nickname: string;
      avatar: string;
      membership: Membership;
      game_player_id: string;
      game_player_name: string;
      game_skill_level: number;
      anticheat_required: boolean;
    }

    export interface Voting {
      voted_entity_types: string[];
      map: Map;
    }

    export interface Map {
      entities: Entity[];
      pick: string[];
    }

    export interface Entity {
      class_name: string;
      game_map_id: string;
      guid: string;
      image_lg: string;
      image_sm: string;
      name: string;
    }
  }

  /*
  Player Stats (/players/{id}/stats/csgo)
  */
  export namespace Player {
    export interface PlayerStats {
      player_id: string;
      game_id: string;
      lifetime: Lifetime;
      segments: Segment[];
    }

    export interface Lifetime {
      'Recent Results': string[];
      'Average K/D Ratio': string;
      'Total Headshots %': string;
      Wins: string;
      Matches: string;
      'Win Rate %': string;
      'Longest Win Streak': string;
      'K/D Ratio': string;
      'Current Win Streak': string;
      'Average Headshots %': string;
    }

    export interface Segment {
      mode: string;
      label: string;
      img_small: string;
      img_regular: string;
      stats: Stats;
      type: Type;
    }

    export interface Stats {
      Assists: string;
      'Average Quadro Kills': string;
      'Average MVPs': string;
      'Headshots per Match': string;
      Wins: string;
      MVPs: string;
      'Quadro Kills': string;
      'Average Assists': string;
      'Average K/R Ratio': string;
      Kills: string;
      'Average Kills': string;
      Headshots: string;
      Deaths: string;
      Matches: string;
      'Win Rate %': string;
      'Penta Kills': string;
      'K/D Ratio': string;
      'Average Triple Kills': string;
      'Triple Kills': string;
      'Average Headshots %': string;
      'Average Penta Kills': string;
      Rounds: string;
      'Average K/D Ratio': string;
      'Total Headshots %': string;
      'K/R Ratio': string;
      'Average Deaths': string;
    }

    export enum Type {
      Map = 'Map',
    }
  }
}

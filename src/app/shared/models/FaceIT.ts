export namespace FaceIT {
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

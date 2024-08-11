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
      CS2 = 'cs2'
    }

    export enum Membership {
      CSGO = 'csgo',
      CS2 = 'cs2',
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
  Player Stats (/players/{id}/stats/cs2)
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

  /*
  Player Stats (/players/?nickname={nickname}&game=cs2)
  */
  export namespace PlayerOverview {
    export interface Player {
      player_id: string;
      nickname: string;
      avatar: string;
      country: string;
      cover_image: string;
      platforms: Platforms;
      games: { [key: string]: Game };
      settings: Settings;
      friends_ids: string[];
      new_steam_id: string;
      steam_id_64: string;
      steam_nickname: string;
      memberships: string[];
      faceit_url: string;
      membership_type: string;
      cover_featured_image: string;
      infractions: {};
    }

    export interface Game {
      region: string;
      game_player_id: string;
      skill_level: number;
      faceit_elo: number;
      game_player_name: string;
      skill_level_label: string;
      regions: {};
      game_profile_id: string;
    }

    export interface Platforms {
      steam: string;
    }

    export interface Settings {
      language: string;
    }
  }

  /*
  Player Match History (/players/{id}/history)
  */
  export namespace MatchHistory {
    export interface Response {
      items: Match[];
      start: number;
      end: number;
      from: number;
      to: number;
    }

    export interface Match {
      match_id: string;
      game_id: string;
      region: string;
      match_type: string;
      game_mode: string;
      max_players: number;
      teams_size: number;
      teams: Teams;
      playing_players: string[];
      competition_id: string;
      competition_name: string;
      competition_type: string;
      organizer_id: string;
      status: string;
      started_at: number;
      finished_at: number;
      results: Results;
      faceit_url: string;
    }

    export interface Results {
      winner: string;
      score: Score;
    }

    export interface Score {
      faction2: number;
      faction1: number;
    }

    export interface Teams {
      faction1: Faction;
      faction2: Faction;
    }

    export interface Faction {
      team_id: string;
      nickname: string;
      avatar: string;
      type: string;
      players: Player[];
    }

    export interface Player {
      player_id: string;
      nickname: string;
      avatar: string;
      skill_level: number;
      game_player_id: string;
      game_player_name: string;
      faceit_url: string;
    }
  }

  /*
  Match Stats (/matches/{id}/stats)
  */
  export namespace MatchStats {
    export interface Response {
      rounds: Maps[];
    }

    export interface Maps {
      best_of: string;
      competition_id: null;
      game_id: string;
      game_mode: string;
      match_id: string;
      match_round: string;
      played: string;
      round_stats: RoundStats;
      teams: Team[];
    }

    export interface RoundStats {
      Score: string;
      Winner: string;
      Region: string;
      Map: string;
      Rounds: string;
    }

    export interface Team {
      team_id: string;
      premade: boolean;
      team_stats: TeamStats;
      players: Player[];
    }

    export interface Player {
      player_id: string;
      nickname: string;
      player_stats: PlayerStats;
    }

    export interface PlayerStats {
      MVPs: string;
      'K/R Ratio': string;
      'K/D Ratio': string;
      Headshots: string;
      'Quadro Kills': string;
      Kills: string;
      Assists: string;
      'Penta Kills': string;
      'Headshots %': string;
      Deaths: string;
      Result: string;
      'Triple Kills': string;
    }

    export interface TeamStats {
      'Team Win': string;
      'Team Headshots': string;
      'Final Score': string;
      'Overtime score': string;
      'Second Half Score': string;
      'First Half Score': string;
      Team: string;
    }
  }

  export namespace Search {
    export interface Result {
      items: Item[];
      start: number;
      end: number;
    }

    export interface Item {
      player_id: string;
      nickname: string;
      status: Status;
      games: Game[];
      country: string;
      verified: boolean;
      avatar: string;
    }

    export interface Game {
      name: string;
      skill_level: string;
    }

    export enum Status {
      AVAILABLE = 'AVAILABLE',
    }
  }
}

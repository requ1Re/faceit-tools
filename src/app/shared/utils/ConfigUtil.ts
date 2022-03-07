export namespace Config {
  export interface AppConfig {
    tools: Config.Tool[];
  }

  export interface Tool {
    id: number;
    name: string;
    route: string;
  };
}

export class ConfigUtil {

  static readonly CONFIG: Config.AppConfig = {
    tools: [
      { id: 0, name: 'Map Picker', route: '/tools/picker' }
    ]
  }

  constructor(){}
}

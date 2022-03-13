import { faAddressBook, faMapMarkedAlt, faUser, IconDefinition } from "@fortawesome/free-solid-svg-icons";

export namespace Config {
  export interface AppConfig {
    tools: Config.Tool[];
  }

  export interface Tool {
    id: number;
    name: string;
    route: string;
    icon: IconDefinition
  };
}

export class ConfigUtil {

  static readonly CONFIG: Config.AppConfig = {
    tools: [
      { id: 0, name: 'Map Picker', route: '/tools/picker', icon: faMapMarkedAlt },
      { id: 1, name: 'Stats', route: '/tools/stats', icon: faUser },
      { id: 2, name: 'Account Finder', route: '/tools/finder', icon: faAddressBook }
    ]
  }

  constructor(){}
}

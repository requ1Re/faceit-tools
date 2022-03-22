import { faAddressBook, faBlog, faEnvelopeOpenText, faList, faMapMarkedAlt, faParagraph, faTextHeight, faUser, IconDefinition } from "@fortawesome/free-solid-svg-icons";

export namespace Config {
  export interface AppConfig {
    tools: Config.Tool[];
  }

  export interface Tool {
    id: number;
    name: string;
    route: string;
    icon: IconDefinition,
    external: boolean
  };
}

export class ConfigUtil {

  static readonly CONFIG: Config.AppConfig = {
    tools: [
      { id: 0, name: 'Map Picker', route: '/tools/picker', icon: faMapMarkedAlt, external: false },
      { id: 1, name: 'Stats', route: '/tools/stats', icon: faUser, external: false },
      { id: 2, name: 'Account Finder', route: '/tools/finder', icon: faAddressBook, external: false },
      { id: 3, name: 'Tutorials & Changelogs', route: 'https://blog.faceit-tools.app/', icon: faBlog, external: true }
    ]
  }

  constructor(){}
}

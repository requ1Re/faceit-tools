import { faAddressBook, faMapMarkedAlt, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';

export namespace Config {
  export interface AppConfig {
    tools: Config.Tool[];
  }

  export interface Tool {
    id: number;
    i18nKey: string;
    route: string;
    icon: IconDefinition;
    external: boolean;
  }
}

export class ConfigUtil {
  static readonly CONFIG: Config.AppConfig = {
    tools: [
      { id: 0, i18nKey: 'tools.map_picker.name', route: '/picker', icon: faMapMarkedAlt, external: false },
      { id: 1, i18nKey: 'tools.stats.name', route: '/stats', icon: faUser, external: false },
      { id: 2, i18nKey: 'tools.account_finder.name', route: '/finder', icon: faAddressBook, external: false },
    ],
  };

  static readonly LANGUAGES = [
    { lang: 'en', flag: 'us' },
    { lang: 'de', flag: 'de' },
  ];

  constructor() {}
}

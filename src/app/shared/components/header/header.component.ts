
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FaIconComponent, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown, faChevronUp, faToolbox } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { Config, ConfigUtil } from '../../utils/ConfigUtil';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [RouterLink, FaIconComponent, RouterLinkActive, TranslateModule, FontAwesomeModule],
})
export class HeaderComponent {
  tools: Config.Tool[] = ConfigUtil.CONFIG.tools;

  languages = ConfigUtil.LANGUAGES;

  faToolbox = faToolbox;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;

  showDropdown = false;

  constructor() {}

  currentLanguage(){
    return localStorage.getItem('locale') ?? 'en';
  }

  changeLocale(locale: string){
    localStorage.setItem('locale', locale);
    window.location.reload();
  }
}

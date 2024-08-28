import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faAddressBook, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base/base';
import { ApiService } from 'src/app/shared/services/api.service';
import { BrowserService } from 'src/app/shared/services/browser.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { ToolInputComponent } from '../../../shared/components/tool-input/tool-input.component';

enum SteamInputType {
  ACCOUNT_NAME,
  STEAM_ID,
  PROFILE_URL,
  VANITY_URL
}

@Component({
    templateUrl: './account-finder-dashboard.component.html',
    styleUrls: ['./account-finder-dashboard.component.scss'],
    standalone: true,
    imports: [ToolInputComponent, TranslateModule]
})
export class AccountFinderDashboardComponent extends BaseComponent implements OnInit {
  /*
  Notes:
  - Resolve Vanity URL: http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=[key]&vanityurl=[strippedVanityURL]
  - Find FACEIT User by SteamID: https://open.faceit.com/data/v4/players?game=cs2&game_player_id=[STEAMID]
  */


  readonly REGEX_PROFILE_URL = /^(http(s)?:\/\/)((www\.)?[steamcommunity]+\.)+[\w-]+\/profiles\/(7656[0-9]{13})\/?$/i;
  readonly REGEX_VANITY_URL = /^(http(s)?:\/\/)((www\.)?[steamcommunity]+\.)+[\w-]+(\/id\/(.*)$)/i;
  readonly REGEX_STEAM_ID = /7656[0-9]{13}/

  error = false;
  errorText = "";

  loading = false;

  steamAccountNameOrURI: string = '';

  inputType: SteamInputType;

  faChevronRight = faChevronRight;
  faAddressBook = faAddressBook;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private errorService: ErrorService, private browserService: BrowserService, private translateService: TranslateService) { super(); }

  ngOnInit(): void {
    this.browserService.getDocument().title = "FACEIT Tools - Account Finder";
    this.errorService.disableErrorDisplaying();
  }

  handleInput(val: string) {
    this.steamAccountNameOrURI = val;
  }

  async resolveSteamIDFromInput(input: string){
    this.loading = true;

    let steamId = "";
    if (input.match(this.REGEX_PROFILE_URL)) {
      this.inputType = SteamInputType.PROFILE_URL;
    } else if (input.match(this.REGEX_VANITY_URL)) {
      this.inputType = SteamInputType.VANITY_URL;
    } else if (input.match(this.REGEX_STEAM_ID)) {
      this.inputType = SteamInputType.STEAM_ID;
    } else {
      this.inputType = SteamInputType.ACCOUNT_NAME;
    }

    switch (this.inputType) {
      case SteamInputType.PROFILE_URL: {
        const regex = input.match(this.REGEX_PROFILE_URL);
        steamId = regex ? regex[5] : '';
        break;
      }
      case SteamInputType.STEAM_ID: {
        steamId = input;
        break;
      }
      case SteamInputType.VANITY_URL: {
        const regex = input.match(this.REGEX_VANITY_URL);
        const accountName = regex ? regex[6].replace('/', '') : null;
        if (accountName) {
          const response = await this.resolveVanityURL(accountName);
          if (response.success && response.steamId) {
            steamId = response.steamId;
          }
        }
        break;
      }
      case SteamInputType.ACCOUNT_NAME: {
        const accountName = input;
        const response = await this.resolveVanityURL(accountName);
        if (response.success && response.steamId) {
          steamId = response.steamId;
        }
        break;
      }
    }

    this.loading = false;

    return steamId;
  }

  async resolveVanityURL(accountName: string){
    return await lastValueFrom(this.api.resolveVanityURL(accountName));
  }

  async findFACEITAccount(steamId: string){
    return await lastValueFrom(this.api.findFACEITAccountBySteamID(steamId));
  }

  async navigateToUser() {
    this.error = false;

    const steamId = await this.resolveSteamIDFromInput(this.steamAccountNameOrURI);
    if(steamId !== ""){
      this.registerSubscription(
        this.api.findFACEITAccountBySteamID(steamId).subscribe({
          next: (data) => {
            this.router.navigate(['/', 'stats', data.nickname], { relativeTo: this.route });
          },
          error: (e) => {
            this.errorText = this.translateService.instant('errors.input.account_finder.faceit_not_found');
            this.error = true;
          },
        })
      );
    }else{
      this.errorText = this.translateService.instant('errors.input.account_finder.steam_not_found');
      this.error = true;
    }
  }
}

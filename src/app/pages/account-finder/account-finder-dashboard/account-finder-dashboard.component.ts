import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faAddressBook, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';

enum SteamInputType {
  ACCOUNT_NAME,
  STEAM_ID,
  PROFILE_URL,
  VANITY_URL
}

@Component({
  templateUrl: './account-finder-dashboard.component.html',
  styleUrls: ['./account-finder-dashboard.component.css']
})
export class AccountFinderDashboardComponent implements OnInit {
  /*
  Notes:
  - Resolve Vanity URL: http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=[key]&vanityurl=[strippedVanityURL]
  - Find FACEIT User by SteamID: https://open.faceit.com/data/v4/players?game=csgo&game_player_id=[STEAMID]
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

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    document.title = "FACEIT Tools - Account Finder"
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
    const steamId = await this.resolveSteamIDFromInput(this.steamAccountNameOrURI);
    if(steamId !== ""){
      const faceit = await this.findFACEITAccount(steamId);
      if(faceit){
        this.router.navigate(['..', 'stats', 'player', faceit.player_id, faceit.nickname], { relativeTo: this.route });
      }
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faAddressBook, faChevronRight } from '@fortawesome/free-solid-svg-icons';

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


  readonly REGEX_PROFILE_URL = /^(http(s)?:\/\/)((www\.)?[steamcommunity]+\.)+[\w-]+(\/profiles\/7656[0-9]{13}\/?)$/gim;
  readonly REGEX_VANITY_URL = /^(http(s)?:\/\/)((www\.)?[steamcommunity]+\.)+[\w-]+(\/id\/(.*)\/?)$/gim;
  readonly REGEX_STEAM_ID = /7656[0-9]{13}/

  error = false;
  errorText = "";

  steamAccountNameOrURI: string = '';
  inputType: SteamInputType;

  faChevronRight = faChevronRight;
  faAddressBook = faAddressBook;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    document.title = "FACEIT Tools - Account Finder"
  }

  handleInput(val: string) {
    this.steamAccountNameOrURI = val;

    if(val.match(this.REGEX_PROFILE_URL)){
      this.inputType = SteamInputType.PROFILE_URL;
    }else if(val.match(this.REGEX_VANITY_URL)){
      this.inputType = SteamInputType.VANITY_URL;
    }else if(val.match(this.REGEX_STEAM_ID)){
      this.inputType = SteamInputType.STEAM_ID;
    }else{
      this.inputType = SteamInputType.ACCOUNT_NAME;
    }
  }

  navigateToMatch(): void {
    // this.router.navigate(['match', this.getFormattedInput(this.steamAccountNameOrURI)], { relativeTo: this.route });
  }
}

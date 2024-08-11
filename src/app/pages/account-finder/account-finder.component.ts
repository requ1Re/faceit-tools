import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-account-finder',
    templateUrl: './account-finder.component.html',
    styleUrls: ['./account-finder.component.scss'],
    standalone: true,
    imports: [RouterOutlet]
})
export class AccountFinderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

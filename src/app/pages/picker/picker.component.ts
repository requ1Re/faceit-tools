import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-picker',
    templateUrl: './picker.component.html',
    styleUrls: ['./picker.component.scss'],
    standalone: true,
    imports: [RouterOutlet]
})
export class PickerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

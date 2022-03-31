import { Component, Input, OnInit } from '@angular/core';
import { faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input()
  icon: IconDefinition;

  faTimes = faTimes;

  showDisclaimer = true;

  constructor() { }

  ngOnInit(): void {
  }

}

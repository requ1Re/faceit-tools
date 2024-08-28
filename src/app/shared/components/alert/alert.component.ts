import { Component, Input, OnInit } from '@angular/core';
import { faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';


@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    standalone: true,
    imports: [FaIconComponent]
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

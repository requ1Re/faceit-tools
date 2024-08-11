import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faChevronRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { NgIf } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'app-tool-input',
    templateUrl: './tool-input.component.html',
    styleUrls: ['./tool-input.component.scss'],
    standalone: true,
    imports: [FaIconComponent, NgIf, LoadingSpinnerComponent]
})
export class ToolInputComponent implements OnInit {
  @Input()
  toolName: string;

  @Input()
  placeholder: string;

  @Input()
  icon: IconDefinition;

  @Input()
  isErroneous: boolean = false;

  @Input()
  errorText: string = "";

  @Input()
  disableSubmit = false;

  @Output()
  onValueChange = new EventEmitter<string>();

  @Output()
  onSubmit = new EventEmitter();


  _value: string = "";

  faChevronRight = faChevronRight;

  constructor() { }

  ngOnInit(): void {
  }


  handleInput(event: any) {
    const val = event.target.value ?? '';
    this._value = val;

    this.onValueChange.emit(this._value);
  }

  submit(){
    if(!this.disableSubmit){
      this.onSubmit.emit();
    }
  }
}

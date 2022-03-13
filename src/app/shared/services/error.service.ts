import { EventEmitter, Injectable } from "@angular/core";
import { ErrorObj } from "../models/ErrorObj";

@Injectable()
export class ErrorService {

  errorObj = new EventEmitter<ErrorObj>();


  displayError(text: string){
    this.errorObj.next({ error: true, text });
  }

  hideError(){
    this.errorObj.next({ error: false, text: "" });
  }
}

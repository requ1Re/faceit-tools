import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  log(className: string, text: any, ...optionalParams: any[]) {
    if(!environment.production){
      console.log('[' + className + ']', text, optionalParams);
    }
  }
}

import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";

@Injectable()
export class BrowserService {
  constructor(@Inject(DOCUMENT) private _document: Document) {  }

  getDocument(){
    return this._document;
  }
}

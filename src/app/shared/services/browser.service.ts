import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import * as GPU from 'detect-gpu';

@Injectable()
export class BrowserService {

  constructor(@Inject(DOCUMENT) private _document: Document) {}

  getDocument(){
    return this._document;
  }

  async isUsingHardwareAcceleration(){
    return (await GPU.getGPUTier()).type === "BENCHMARK";
  }
}

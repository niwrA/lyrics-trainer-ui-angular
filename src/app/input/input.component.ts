import { Component } from '@angular/core';
import { LyricsService } from '../lyrics/lyrics-service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.sass'
})
export class InputComponent {
  service: LyricsService;
  constructor(service: LyricsService) {
    this.service = service;
  }
  private _lyrics = "";
  lines: string[] = [];

  public get lyrics() {
    return this._lyrics;
  }
  public set lyrics(value) {
    this._lyrics = value;
    console.log(this._lyrics);
    this.service.processLyrics(value);
  }
}

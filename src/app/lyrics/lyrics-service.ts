import { EventEmitter, Injectable, Output } from '@angular/core';
import { LyricsData } from './lyrics';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LyricsService {
  public lyricsData: LyricsData[] = [
    {
      title: 'Quartito Azul',
      artist: 'Canaro',
      lyrics: 'Quartito azul, dulce morada de me vida.',
      lines: [
        'Quartito azul, dulce morada de me vida.'
      ]
    },
    {
      title: 'Temo',
      artist: 'Artist 2',
      lyrics: 'Porque tus ochos me huyen.',
      lines: [
        'Porque tus ochos me huyen.'
      ]
    },
  ];
  public lyricsEvent: BehaviorSubject<LyricsData>;

  selectedLyrics!: LyricsData;

  constructor() {
    this.lyricsEvent = new BehaviorSubject<LyricsData>(this.lyricsData[0]);
    this.selectLyrics(this.lyricsData[0]);
  }
  processLyrics(lyrics: string) {
    this.lyricsData.unshift(new LyricsData(lyrics));
    this.selectLyrics(this.lyricsData[0]);
  }

  selectLyrics(data: LyricsData): void {
    this.lyricsEvent.next(data);
  }
}

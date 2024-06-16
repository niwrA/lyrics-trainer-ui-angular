export class ILyricsData {
  public lyrics!: string;
  public lines!: string[];
  public title!: string;
  public artist!: string;
}

export class LyricsLine{
  line: string;
  words: string[];
  constructor(line: string) {
    this.line = line;
    this.words = line.split(' ');
  }
}

export class LyricsData implements ILyricsData {
  constructor(lyrics: string) {
    this.lyrics = lyrics;
    this.lines = lyrics.split('\n');
    if (this.lines.length > 2) {
      if (this.lines[1] === '') {
        // asume first line is title
        this.title = this.lines[0];
        this.lines = this.lines.slice(2);
      }
      if (this.lines[2] === '') {
        // asume first line is title and second is artist
        this.title = this.lines[0];
        this.artist = this.lines[1];
        this.lines = this.lines.slice(3);
      }
    }
  }
  public lyrics!: string;
  public lines!: string[];
  public title!: string;
  public artist!: string;
}

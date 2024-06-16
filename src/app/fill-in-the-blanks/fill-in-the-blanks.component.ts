import { Component, OnInit } from '@angular/core';
import { LyricsService } from './../lyrics/lyrics-service';
import { FillBlanks, UserAnswer } from './fillblanks';
import { LyricsData } from '../lyrics/lyrics';

@Component({
  selector: 'app-fill-in-the-blanks',
  templateUrl: './fill-in-the-blanks.component.html',
  styleUrls: ['./fill-in-the-blanks.component.sass'],
})

export class FillInTheBlanksComponent {
  userAnswers = new Array<UserAnswer>();
  words: any;
  lineIndex = 0;
  fillBlanks = new Array<FillBlanks>();
  selectedLyrics!: LyricsData;
  isLastLine = true;
  isFirstLine = true;
  currentAnswer = new Array<string>();
  constructor(public lyricsService: LyricsService) {
    this.lyricsService = lyricsService;
    this.lyricsService.lyricsEvent.subscribe((lyrics) => {
      this.updateLyrics(lyrics);
    });
    this.checkButtons();
    // todo: increase the number of words missing when the level goes up (automatic depending on how many correct answers)
  }

  updateLyrics(lyrics: LyricsData): void {
    console.log('received new lyrics:');
    console.log(lyrics);
    this.lineIndex = 0;
    this.selectedLyrics = lyrics;
    this.updateLine();
  }

  updateAnswer(answer: UserAnswer) {
    var existingAnswer = this.userAnswers.find(f => f.position === answer.position);
    if (!existingAnswer) {
      existingAnswer = answer;
      this.userAnswers.push(existingAnswer);
    }
    existingAnswer.answer = answer.answer;
  }

  getAnswerByPosition(position: number): UserAnswer | undefined {
    return this.userAnswers.find(f => f.position === position);
  }

  private updateLine() {
    this.userAnswers = new Array<UserAnswer>();
    this.currentAnswer = new Array<string>();
    this.words = this.selectedLyrics.lines[this.lineIndex].split(' ');
    this.fillBlanks = this.generateBlanks(this.words, 2);
    this.checkButtons();
  }

  generateBlanks(words: string[], count: number): FillBlanks[] {
    var fillBlanks = new Array<FillBlanks>();
    for (let i = 0; i < count; i++) {
      // todo: prevent duplicates
      fillBlanks.push(new FillBlanks(words));
    }
    return fillBlanks;
  }

  isBlank(position: number): boolean {
    return !!this.fillBlanks.find((blank: any) => blank.position === position);
  }

  checkAnswers() {
    if (this.fillBlanks) {
      let blanks = this.fillBlanks;
      blanks.forEach((blank: any) => {
        let userAnswer = this.getAnswerByPosition(blank.position);
        if (userAnswer) {
          userAnswer.answer = this.currentAnswer[blank.position];
        } else {
          userAnswer = new UserAnswer(blank.position, this.currentAnswer[blank.position]);
          this.userAnswers.push(userAnswer);
        }

        const correctAnswer = this.words[blank.position] || '';
        blank.correct = userAnswer?.answer.toLowerCase() === correctAnswer.toLowerCase();
      });

    }
  }

  public previous(): void {
    this.lineIndex--;// = this.lineIndex === 0 ? 0 : this.lineIndex--;
    this.updateLine();
  }

  public next(): void {
    this.lineIndex++;// = this.selectedLyrics.lines.length - 1 === this.lineIndex ? this.lineIndex : this.lineIndex++;
    this.updateLine();
  }

  private checkButtons(): void {
    this.isLastLine = this.lineIndex === this.selectedLyrics?.lines?.length - 1;
    this.isFirstLine = this.lineIndex === 0;
  }
}

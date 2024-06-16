import { Component, OnInit } from '@angular/core';
import { LyricsService } from './../lyrics/lyrics-service';

@Component({
  selector: 'app-quiz-mode',
  templateUrl: './quiz-mode.component.html',
  styleUrls: ['./quiz-mode.component.sass'],
})
export class QuizModeComponent implements OnInit {
  lyricsData: any;
  currentQuestionIndex = 0;
  selectedOption: string = '';
  score = 0;
  showResult = false;

  constructor(private lyricsService: LyricsService) {}

  ngOnInit(): void {
    this.lyricsData = this.lyricsService.selectedLyrics;
  }

  isBlank(position: number): boolean {
    return !!this.lyricsData.fillBlanks.find((blank: any) => blank.position === position);
  }

  submitAnswer() {
    const question = this.lyricsData.quizQuestions[this.currentQuestionIndex];
    if (this.selectedOption === question.answer) {
      this.score++;
    }
    this.currentQuestionIndex++;
    this.selectedOption = '';
    if (this.currentQuestionIndex >= this.lyricsData.quizQuestions.length) {
      this.showResult = true;
    }
  }
}

export class UserAnswer {
  position: number;
  answer: string;
  constructor(position: number, answer: string) {
    this.position = position;
    this.answer = answer;
  }
}
export class FillBlanks {
  word: string;
  position: number;
  correct = false;
  constructor(words: string[]) {
    const randomIndex = Math.floor(Math.random() * words.length);
    this.word = words[randomIndex];
    this.position = randomIndex;
  }
}

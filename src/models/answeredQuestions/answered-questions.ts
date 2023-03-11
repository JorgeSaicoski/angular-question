export class QuestionAnswered {
  question: string;
  user: string;
  optionsSelected: string;
  isCorrect: boolean;
  constructor() {
    this.question = null as any
    this.user = null as any
    this.optionsSelected = null as any
    this.isCorrect = null as any
  }
}

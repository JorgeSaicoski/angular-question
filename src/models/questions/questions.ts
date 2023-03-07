export class Question {
  title: string
  description: string;
  options: string[];
  correctOption: number;
  constructor() {
    this.title = null as any
    this.description = null as any
    this.options = null as any
    this.correctOption = null as any
  }
}

import {QuestionAnswered} from "../answeredQuestions/answered-questions";

export class User {
  _id: string;
  name: string;

  username: string;
  email: string;
  questionsAnswered: QuestionAnswered[];
  roles: string[];
  createdAt: Date;
  password: string;
  constructor() {
    this._id = null as any
    this.username = null as any
    this.name = null as any
    this.email = null as any
    this.roles = null as any
    this.password = null as any
    this.questionsAnswered = new Array<QuestionAnswered>()
    this.createdAt = null as any

  }
}

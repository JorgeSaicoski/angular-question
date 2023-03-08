export class User {
  username: string
  email: string;
  password: string;
  admin: boolean
  constructor() {
    this.username = null as any
    this.email = null as any
    this.password = null as any
    this.admin = false as boolean
  }
}

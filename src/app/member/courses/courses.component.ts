import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  public user: any
  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    console.log(token)
    if (token){
      //this.user = JSON.parse(atob(token.split('.')[1])).user;
      this.authService.setCurrentUser(this.user);
      console.log("user")
      console.log(this.user)
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import {User} from "../../../models/user/user";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})



export class CoursesComponent implements OnInit {


  public currentUser: any;
  public currentUserData: any;
  constructor(
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      currentUser.subscribe(
        (userData: User) => {
          this.currentUserData = userData
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }
}

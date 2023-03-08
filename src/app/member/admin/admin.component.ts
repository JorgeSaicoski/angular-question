import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent {
  isAdmin = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    //this.isAdmin = this.authService.isAdmin();
  }

  createQuestion() {
    this.router.navigate(['/create-question']);
  }
}

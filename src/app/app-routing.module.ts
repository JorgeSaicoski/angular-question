import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./guest/home/home.component";
import {LoginComponent} from "./guest/login/login.component";
import {RegisterComponent} from "./guest/register/register.component";
import {LoginGuard} from "./guards/login/login.guard";
import {CoursesComponent} from "./member/courses/courses.component";
import {AuthGuard} from "./guards/auth/auth.guard";
import {AdminComponent} from "./member/admin/admin.component";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    component: LoginComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "register",
    component: RegisterComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: 'courses',
    component: CoursesComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

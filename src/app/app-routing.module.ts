import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./guest/home/home.component";
import {LoginComponent} from "./guest/login/login.component";
import {RegisterComponent} from "./guest/register/register.component";
import {LoginGuard} from "./guards/login.guard";
import {CoursesComponent} from "./member/courses/courses.component";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: "full"
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent,
    pathMatch: "full"
  },
  {
    path: "register",
    component: RegisterComponent,
    pathMatch: "full"
  },
  { path: 'courses',
    component: CoursesComponent,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

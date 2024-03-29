import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTableModule} from "@angular/material/table";
import {MatBadgeModule} from "@angular/material/badge";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { HomeComponent } from './guest/home/home.component';
import { LoginComponent } from './guest/login/login.component';
import { RegisterComponent } from './guest/register/register.component';
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import { CoursesComponent } from './member/courses/courses.component';
import { AdminComponent } from './member/admin/admin.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CoursesComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatGridListModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatToolbarModule,
    MatTableModule,
    MatBadgeModule,
    MatSnackBarModule,
    FormsModule,
    MatInputModule,
    HttpClientModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('access_token'),
        allowedDomains: ['localhost:5050'],
        disallowedRoutes: [],
      },
    }),
    MatPaginatorModule,
    MatSortModule,
    RouterModule
  ],
  providers: [
    JwtHelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

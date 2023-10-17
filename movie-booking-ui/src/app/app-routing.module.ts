import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user-components/login/login.component';
import { RegistrationComponent } from './user-components/registration/registration.component';
import { BookTicketComponent } from './movie-components/book-ticket/book-ticket.component';
import { ForgetPasswordComponent } from './user-components/forget-password/forget-password.component';
import { AddMovieComponent } from './movie-components/add-movie/add-movie.component';
import { UpdateMovieComponent } from './movie-components/update-movie/update-movie.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegistrationComponent },
  { path: "error", component: ErrorComponent },
  { path: "home", component: HomeComponent },
  { path: "register", component: RegistrationComponent },
  { path: 'bookTicket/:id', component: BookTicketComponent },
  { path: "forget", component: ForgetPasswordComponent },
  { path: "addMovie", component: AddMovieComponent },
  { path: "updateMovie/:id", component: UpdateMovieComponent },
  { path: "**", redirectTo: "/login" }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

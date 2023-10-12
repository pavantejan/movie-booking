import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './user-components/login/login.component';
import { RegistrationComponent } from './user-components/registration/registration.component';
import { SearchMovieComponent } from './movie-components/search-movie/search-movie.component';
import { ForgetPasswordComponent } from './user-components/forget-password/forget-password.component';
import { AddMovieComponent } from './movie-components/add-movie/add-movie.component';
import { UpdateMovieComponent } from './movie-components/update-movie/update-movie.component';
import { BookTicketComponent } from './movie-components/book-ticket/book-ticket.component';
import { AllTicketsComponent } from './movie-components/all-tickets/all-tickets.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { User } from './model/user';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegistrationComponent,
    SearchMovieComponent,
    ForgetPasswordComponent,
    AddMovieComponent,
    UpdateMovieComponent,
    BookTicketComponent,
    AllTicketsComponent,
    ErrorComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    User
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

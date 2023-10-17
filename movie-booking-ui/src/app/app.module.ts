import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './user-components/login/login.component';
import { RegistrationComponent } from './user-components/registration/registration.component';
import { ForgetPasswordComponent } from './user-components/forget-password/forget-password.component';
import { AddMovieComponent } from './movie-components/add-movie/add-movie.component';
import { UpdateMovieComponent } from './movie-components/update-movie/update-movie.component';
import { BookTicketComponent } from './movie-components/book-ticket/book-ticket.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { User } from './model/user';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { TokenIntercepter } from './model/token-intercepter';
import { AuthRequest } from './model/auth-request';
import { AuthResponse } from './model/auth-response';
import { LoginStatus } from './model/login-status';
import { Movie } from './model/movie';
import { SecurityToken } from './model/security-token';
import { Ticket } from './model/ticket';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegistrationComponent,
    ForgetPasswordComponent,
    AddMovieComponent,
    UpdateMovieComponent,
    BookTicketComponent,
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
    User,
    AuthRequest,
    AuthResponse,
    LoginStatus,
    Movie,
    SecurityToken,
    Ticket,    
    {
      provide: HTTP_INTERCEPTORS,
      useClass : TokenIntercepter,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

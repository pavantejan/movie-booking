import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginStatus } from '../model/login-status';
import { AuthResponse } from '../model/auth-response';
import { UserServiceService } from '../service/user-service.service';
import { SecurityToken } from '../model/security-token';
import { MovieServiceService } from '../service/movie-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements DoCheck,OnInit{  

  constructor(
    private router:Router,
    private loginStatus:LoginStatus,
    public authResponse:AuthResponse,
    private userService:UserServiceService,
    private securityToken:SecurityToken,
    private movieService:MovieServiceService,
  ){}
  
  isAsideOpen: boolean = false;
  search = "";
  login = false;
  url = "";

  ngDoCheck() {
    this.url = this.router.url;

    if( this.url!=='/login' && this.url!=='/register' && this.url!=='/error'){
      this.login = true;
    }else{
      this.login = false;
    }

    if( this.url === '/login' ){
      this.userService.resetData();
    }
    
    this.movieService.searchMovie = this.search;
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('token')) {
      
      this.userService.validate().subscribe({
        next: (data:any) => {
          console.log(data);
          console.log("inside second");
          if ( data!=null ) {
            this.loginStatus.Status = true;          
  
            this.authResponse.Username = data.username;
            this.authResponse.Email = data.email;
            this.authResponse.Role = data.role;
            this.authResponse.Token = data.token;
            this.authResponse.IsValid = data.valid;
            
            this.userService.setAuthResponse(this.authResponse);            
            
            this.securityToken.Jwt = this.authResponse.Token;
            sessionStorage.setItem("token", this.securityToken.Jwt);
          }
        },
        error: (error:any) => {
          this.router.navigate(['error']);
        }
      });
    }
  }


  toggleAside() {
    this.isAsideOpen = !this.isAsideOpen;
  }

  

  signout(){
    this.userService.resetData();
    this.router.navigate(['login']);
  }

}

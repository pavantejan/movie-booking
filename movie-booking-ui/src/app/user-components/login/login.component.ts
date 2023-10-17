import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/model/auth-response';
import { LoginStatus } from 'src/app/model/login-status';
import { SecurityToken } from 'src/app/model/security-token';
import { User } from 'src/app/model/user';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserServiceService,
    private user: User,
    private logStatus: LoginStatus,
    private securityToken: SecurityToken,
    private authResponse: AuthResponse,
  ){}
  
  ngOnInit(): void {
    this.userService.resetData();
  }


  username = "";
  password = "";
  message = "";


  logIn(){

    this.userService.loginUser(this.username,this.password).subscribe({
      next: (data:any) => {
        console.log(data);
        console.log("inside second");
        if ( data!=null ) {
          this.message = "";
          this.logStatus.Status = true;          

          this.authResponse.Username = data.username;
          this.authResponse.Email = data.email;
          this.authResponse.Role = data.role;
          this.authResponse.Token = data.token;
          this.authResponse.IsValid = data.valid;

          this.userService.setAuthResponse(this.authResponse);
          
          this.securityToken.Jwt = this.authResponse.Token;
          // console.log(this.token);
          // sessionStorage.setItem("token", JSON.stringify(this.securityToken.Jwt));
          sessionStorage.setItem("token", this.securityToken.Jwt);
          this.router.navigate(['home']);

          // console.log(sessionStorage.getItem("token"));
          // sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
        }
      },
      error: (error:any) => {
        this.message = "Invalid Credentials";

        setTimeout(() => {
          this.message = "";
          this.username = "";
          this.password = "";
       }, 7000);
        // alert('There was an error in retrieving data from the server');
      }
    });

  }

}

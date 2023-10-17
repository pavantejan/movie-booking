import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { AuthRequest } from '../model/auth-request';
import { LoginStatus } from '../model/login-status';
import { SecurityToken } from '../model/security-token';
import { AuthResponse } from '../model/auth-response';
import { Router } from '@angular/router';


const api = "http://localhost:8080/api/v1";
// const api = "http://movie-booking.us-west-2.elasticbeanstalk.com/api/v1";

// const api1 ="https://s4u5vzckyc.execute-api.us-west-2.amazonaws.com/Movie-booking-deployment/user-auth";

// const api1 ="ec2-52-36-58-59.us-west-2.compute.amazonaws.com"


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(
    private httpClient:HttpClient,
    private user:User,
    private authRequest:AuthRequest,
    private loginStatus: LoginStatus,
    private securityToken:SecurityToken,
    private authResponse:AuthResponse,
    private router:Router,
  ) { }

  setAuthResponse(authResponse:AuthResponse){
    this.authResponse = authResponse;
  }
  getAuthResponse(){
    return this.authResponse;
  }

  validate(): Observable < any > {
    return this.httpClient.get(api + "/validate",
      { responseType: 'json' }
    );
  }

  registerUser(user:User):Observable<any>{
    return this.httpClient.post( api + "/register", user,
      { responseType: 'text' }
    );
  }

  loginUser(username:string,password:string): Observable < any > {

    this.authRequest.Username = username;
    this.authRequest.Password = password;
    return this.httpClient.post( api +"/login"  , this.authRequest,
      { responseType: 'json' }
    );
  }

  getAllUsers(): Observable < any > {
    return this.httpClient.get(api + "/getAllUsers",
      { responseType: 'json' }
    );
  }

  getUser(username:string): Observable < any > {
    return this.httpClient.get(api + "/getUser/" + `${username}`,
      { responseType: 'json' }
    );
  } 

  forgotPassword(username:string,oldS:string,newS:string): Observable<any>{
    return this.httpClient.post(api + "/forgot/" + `${username}`, 
    {
      "oldPassword":oldS,
      "newPassword":newS
    },
      { responseType: 'json' }
    );
  }

  resetData(){
    console.log("inside the reset data");
    this.loginStatus.Status = false;
    this.securityToken.Jwt = "";
    sessionStorage.clear();

    this.authResponse.Username = "";
    this.authResponse.Role = "";
    this.authResponse.Token = "";
    this.authResponse.IsValid = false;
  }
    
}

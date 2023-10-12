import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { AuthRequest } from '../model/auth-request';


const api = "http://localhost:8080/api/v1";


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(
    private httpClient:HttpClient,
    private user:User,
    private authRequest:AuthRequest,
  ) { }

  validate(): Observable < any > {
    return this.httpClient.post(api + "/validate",
      { responseType: 'json' }
    );
  }


  registerUser(user:User):Observable<any>{
    return this.httpClient.post( api + "/register", user,
      { responseType: 'text' }
    );
  }

  loginUser(authRequest: AuthRequest): Observable < any > {
    return this.httpClient.post( api + "/login", authRequest,
      { responseType: 'text' }
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

  

  // deleteRequest(): Observable < any > {
    // return this.httpClient.delete(api + "/deleteRequest/" + `${id}`,
      // { responseType: 'text' }
    // );


  // }

  resetData(){
    // this.loginStatus.Status = false;
    // this.securityToken.Jwt = "";
    // sessionStorage.clear();
  
    // this.authResponse.Username = "";
    // this.authResponse.Role = "";
    // this.authResponse.Token = "";
    // this.authResponse.IsValid = false;
  }






  
}

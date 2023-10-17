import { Component } from '@angular/core';
import { AuthResponse } from 'src/app/model/auth-response';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

  email = "";
  password = "";
  repeatPassword = "";
  messageSuccess = "";
  messageFailure = "";

  constructor(
    private userService:UserServiceService,
    private authResponse:AuthResponse,

  ){}
  onSubmit(){

    this.userService.forgotPassword(this.userService.getAuthResponse().Username,this.password,this.repeatPassword).subscribe({
      next: (data:any) => {
        if(data){
          this.messageSuccess = "Password changed successfully";

          this.email = "";
          this.password = "";
          this.repeatPassword ="";
          setTimeout(() => {
            this.messageSuccess = "";
         }, 7000);
        }
      },
      error: (error:any) => {
        this.messageFailure = "Some error in changing password";
        this.email = "";
          this.password = "";
          this.repeatPassword ="";
        setTimeout(() => {
          this.messageFailure = "";
       }, 7000);
      }
    });
  }

}

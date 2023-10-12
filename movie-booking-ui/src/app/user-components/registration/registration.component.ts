import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { last } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements DoCheck {


  constructor(
    private router: Router,
    private userService: UserServiceService,
    private user: User,

    

  ){}

  username = "";
  password = "";
  repeatPassword = "";
  email = "";
  firstName = "";
  lastName = "";
  contactNumber = "";

  message = "";

  message1 = "";
  message2 = "";
  message3 = "";

  expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[C][O][M]/i;

  expression2: RegExp = /^[A-Z0-9A-Z]\w{7,}$/i;

  ngDoCheck(): void {
    if( this.email !== '' ){
      const result1: boolean = this.expression.test(this.email);
      this.message1 = (result1 ? '' : 'Email - must contain @ and .com');
    }
    if( this.password !== ''){
      const result2: boolean = this.expression2.test(this.password);
      this.message2 = (result2 ? '' : 'Password - must be alpha numeric and no of characters greater than 8');
    }
    if( this.repeatPassword !== '' ){
      this.message3 = ( this.password === this.repeatPassword ? '' : 'Confirm password and password must match');
    }
  }



  onSubmit(){

    this.user.Email = this.email;
    this.user.FirstName = this.firstName;
    this.user.LastName = this.lastName;
    this.user.Password = this.password;
    this.user.ContactNumber = this.contactNumber;
    this.user.Username = this.username;
    
    this.userService.registerUser(this.user).subscribe({
      next: (data:any)=>{
        this.message = "Details has been submitted successfully";

        setTimeout(() => {
          this.message = "";
          this.username = "";
          this.password = "";
          this.repeatPassword = "";
          this.email = "";
          this.firstName = "";
          this.lastName = "";
       }, 7000);
      },
      error: (error)=>{
        this.router.navigate(['error']);
      }
    });



  }



}

import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private UserService:UserServiceService,

  ){}
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  username = "";
  password = "";


  logIn(){


  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../service/user-service.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {

  constructor(
    private router:Router,
    private userService:UserServiceService
  ){}
  
  ngOnInit(): void {
    this.userService.resetData();
  }

  goBack() {
    // this.authService.resetData();
    this.router.navigate(["login"]);
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isAsideOpen: boolean = false;

  url:String = ""
  login:boolean = false;

  constructor(
    private router:Router,
  ){}

  toggleAside() {
    this.isAsideOpen = !this.isAsideOpen;
  }

  ngDoCheck() {
    this.url = this.router.url;
  }

}

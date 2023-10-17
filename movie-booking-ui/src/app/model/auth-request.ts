import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthRequest {
    username = "";
    password = "";

    public get Username():string{
        return this.username;
    }

    public set Username(uname:string){
        this.username=uname;
    }

    public get Password():string{
        return this.password;
    }

    public set Password(password:string){
        this.password=password;
    }
}

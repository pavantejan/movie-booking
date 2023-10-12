import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecurityToken {
    private jwt:string="";

    public get Jwt():string{
        return this.jwt;
    }

    public set Jwt(jwtToken:string){
        this.jwt=jwtToken;
    }
}

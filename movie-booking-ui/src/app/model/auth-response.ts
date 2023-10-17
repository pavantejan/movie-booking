import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthResponse {

    username: string = "";
    email: string = "";
    role: string = "";
    token: string = "";
    isValid: boolean = false;

    public get Username(): string {
        return this.username;
    }

    public get Email(): string {
        return this.email;
    }
    public set Email(value: string) {
        this.email = value;
    }
    
    public get Role(): string {
        return this.role;
    }

    public get Token(): string {
        return this.token;
    }

    public get IsValid(): boolean {
        return this.isValid;
    }


    public set Username(username: string) {
        this.username = username;
    }

    public set Role(role: string) {
        this.role = role;
    }

    public set Token(token: string) {
        this.token = token;
    }

    public set IsValid(value: boolean) {
        this.isValid = value;
    }

}

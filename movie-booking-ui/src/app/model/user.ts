import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class User {

    private id = 0;
    private firstName = "";    
    private lastName = "";
    private email = "";
    private username = "";
    private password = "";
    private contactNumber = "";
    private role = "";
    
    public get Id() {
        return this.id;
    }
    public set Id(value) {
        this.id = value;
    }

    public get FirstName():string {
        return this.firstName;
    }
    public set FirstName(value:string) {
        this.firstName = value;
    }

    public get LastName() {
        return this.lastName;
    }
    public set LastName(value) {
        this.lastName = value;
    }
    public get Email() {
        return this.email;
    }
    public set Email(value) {
        this.email = value;
    }
    public get Username() {
        return this.username;
    }
    public set Username(value) {
        this.username = value;
    }
    public get Password() {
        return this.password;
    }
    public set Password(value) {
        this.password = value;
    }
    public get ContactNumber() {
        return this.contactNumber;
    }
    public set ContactNumber(value) {
        this.contactNumber = value;
    }
    public get Role() {
        return this.role;
    }
    public set Role(value) {
        this.role = value;
    }

}

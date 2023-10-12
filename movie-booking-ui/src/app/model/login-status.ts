import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginStatus {
    private status : boolean = false;
    
    public get Status():boolean{
        return this.status;
    }

    public set Status(Status:boolean){
        this.status=Status;
    }
}

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SecurityToken } from "./security-token";
import { Observable } from "rxjs";


@Injectable({
    providedIn:'root'
})
export class TokenIntercepter implements HttpInterceptor{
    token : any;

    constructor(private securityToken:SecurityToken){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        let reqHeader = req;
        this.token = sessionStorage.getItem('token');
        
        console.log("In intercepter");

        console.log(req);
        console.log(this.token);
        
        if( this.token != "" && this.token != null ){
            reqHeader = req.clone({
                setHeaders : {
                    Authorization : "Bearer " +  this.token,      //this.temp,
                }
            });

            // reqHeader = req.clone({
            //     setHeaders: { Authorization: `Bearer ${this.token}` }
            // });
        }
        
        console.log(reqHeader);

        return next.handle(reqHeader);
    }
}

import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class Ticket {
    transactionId = 0;
    
    movieName = "";
    
    theaterName = "";
    
    bookedSeats = 0;
    
    username = "";
    

    public get TransactionId() {
        return this.transactionId;
    }
    public set TransactionId(value) {
        this.transactionId = value;
    }

    public get MovieName() {
        return this.movieName;
    }
    public set MovieName(value) {
        this.movieName = value;
    }

    public get TheaterName() {
        return this.theaterName;
    }
    public set TheaterName(value) {
        this.theaterName = value;
    }

    public get BookedSeats() {
        return this.bookedSeats;
    }
    public set BookedSeats(value) {
        this.bookedSeats = value;
    }

    public get Username() {
        return this.username;
    }
    public set Username(value) {
        this.username = value;
    }


}

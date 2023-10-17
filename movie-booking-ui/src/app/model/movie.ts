import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class Movie {
    id = 0;
    
    movieName = "";
    
    theaterName = "";
    
    totalSeats = 0;

    availableSeats = 0;

    bookedSeats = 0;
    
    movieImage = "";
    
    moviePrice = 0;
    
    status = "Book Ticket ASAP";
    


    public get Id() {
        return this.id;
    }
    public set Id(value) {
        this.id = value;
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

    public get TotalSeats() {
        return this.totalSeats;
    }
    public set TotalSeats(value) {
        this.totalSeats = value;
    }

    public get AvailableSeats() {
        return this.availableSeats;
    }
    public set AvailableSeats(value) {
        this.availableSeats = value;
    }

    public get BookedSeats() {
        return this.bookedSeats;
    }
    public set BookedSeats(value) {
        this.bookedSeats = value;
    }

    public get MovieImage() {
        return this.movieImage;
    }
    public set MovieImage(value) {
        this.movieImage = value;
    }

    public get MoviePrice() {
        return this.moviePrice;
    }
    public set MoviePrice(value) {
        this.moviePrice = value;
    }

    public get Status() {
        return this.status;
    }
    public set Status(value) {
        this.status = value;
    }






}
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class Movie {
    private id = 0;
    private movieName = "";
    private theaterName = "";
    private totalSeats = 0;
    private availableSeats = 0;
    private bookedSeats = 0;
    private movieImage = "";
    private moviePrice = 0;
    private status="Book Ticket ASAP";
}
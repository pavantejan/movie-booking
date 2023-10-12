import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class Ticket {
    private transactionId = 0;
    private movieName = "";
    private theaterName = "";
    private bookedSeats = 0;
    private username = "";
}

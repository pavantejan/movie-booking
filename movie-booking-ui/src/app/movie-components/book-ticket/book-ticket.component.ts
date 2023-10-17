import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/model/movie';
import { Ticket } from 'src/app/model/ticket';
import { MovieServiceService } from 'src/app/service/movie-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent implements OnInit,DoCheck{

  id:number = 0;
  movie: Movie = new Movie;
  ticket: Ticket = new Ticket;
  tickets = "";
  message = "";
  message1 = "";
  messageSuccess = "";
  messageFailure = "";

  constructor(
    private activatedroute: ActivatedRoute,
    private movieService:MovieServiceService,
    // public movie:Movie,
    private router:Router,
    // private ticket:Ticket,
    private userService:UserServiceService,

    ){

    this.activatedroute.params.subscribe(data => {
      this.id = data['id'];
    });
  }
  ngDoCheck(): void {
    let value = /^\d+$/.test(this.tickets);
    if(value){
      if( this.tickets.length >1 ){
        this.message1 = "Number should range from 1-9";
      }else{
        this.message1 = "";
      }
    }else if( this.tickets.length >0 && !value){
      this.message1 = "Only numbers are allowed";
    }
    else{
      this.message1 = "";
    }
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('token')){
      this.message = "Loading...";
      this.movieService.getMovie(this.id).subscribe({
        next: (data: any) => {
          this.message = "";
          this.movie = data;
          console.log(this.movie);
        },
        error: (error) => {
          this.router.navigate(['error']);
        }
      });
    } else {
      this.router.navigate(['login']);
    }
  }



  onSubmit(){

    console.log("Inside the on submit book ticket");
    this.ticket.TransactionId = 0;
    this.ticket.MovieName = this.movie.movieName;    
    this.ticket.TheaterName = this.movie.theaterName;
    this.ticket.Username = this.userService.getAuthResponse().Username;
    this.ticket.BookedSeats = parseInt(this.tickets);

    console.log(this.ticket);

    this.movieService.bookTicket(this.ticket).subscribe({
      next: (data:any) => {
        this.messageSuccess = "Tickets successfully booked";
        this.tickets = "";
        setTimeout(() => {
          this.messageSuccess = "";
       }, 7000);
      },
      error: (error:any) => {
        this.messageFailure = "No tickets were booked";
        setTimeout(() => {
          this.messageFailure = "";
       }, 7000);
      }
    });


    



  }







}

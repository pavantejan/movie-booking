import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/model/movie';
import { MovieServiceService } from 'src/app/service/movie-service.service';

@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.component.html',
  styleUrls: ['./update-movie.component.css']
})
export class UpdateMovieComponent implements OnInit{

  id = 0;
  movieName = "";
  theaterName = "";
  movieImage = "";
    
  totalSeats = 0;
  availableSeats = 0;
  bookedSeats = 0; 
  moviePrice = 0;

  messageSuccess = "";
  messageFailure = "";

  constructor(
    private movieService:MovieServiceService,
    private movie:Movie,
    private activatedroute: ActivatedRoute,
    private router:Router,

  ){
    this.activatedroute.params.subscribe(data => {
      this.id = data['id'];
    });
  }

  ngOnInit(): void {
    console.log(this.id);
    this.movieService.getMovie(this.id).subscribe({
      next: (data:any) => {
        this.movie.id = data.id;
        console.log(data);
        this.movieName = data.movieName;
        this.theaterName = data.theaterName;
        this.movieImage = data.movieImage;
  
        this.totalSeats = data.totalSeats;
        this.availableSeats = data.availableSeats;
        this.bookedSeats = data.bookedSeats;
        this.moviePrice = data.moviePrice;

      },
      error: (error:any) => {
        this.router.navigate(['error']);
      }
    });
  }

  submit(){

    this.movie.MovieName = this.movieName;
      this.movie.theaterName = this.theaterName;
      this.movie.movieImage = this.movieImage;

      this.movie.totalSeats = this.totalSeats;
      this.movie.availableSeats = this.availableSeats;
      this.movie.bookedSeats = this.bookedSeats;
      this.movie.moviePrice = this.moviePrice;

      console.log(this.movie);
      this.movieService.updateMovie(this.movie).subscribe({
        next: (data:any) => {
          if(data){
            this.messageSuccess = "Updated movie details successfully";
  
            this.movieName = "";
            this.theaterName = "";
            this.movieImage = "";
            this.totalSeats = 0;
            this.availableSeats = 0;
            this.bookedSeats = 0; 
            this.moviePrice = 0;

            setTimeout(() => {
              this.messageSuccess = "";
           }, 7000);
          
        }
      },
        error: (error:any) => {
          this.messageFailure = "Some error in updating";
          this.movieName = "";
            this.theaterName = "";
            this.movieImage = "";
            this.totalSeats = 0;
            this.availableSeats = 0;
            this.bookedSeats = 0; 
            this.moviePrice = 0;
        setTimeout(() => {
          this.messageFailure = "";
       }, 7000);
    }
  });
  }
}

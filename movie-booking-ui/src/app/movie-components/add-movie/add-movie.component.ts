import { Component } from '@angular/core';
import { Movie } from 'src/app/model/movie';
import { MovieServiceService } from 'src/app/service/movie-service.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent {

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
      private movie:Movie,
      private movieService:MovieServiceService,


    ){ }

    submit(){
      this.movie.MovieName = this.movieName;
      this.movie.theaterName = this.theaterName;
      this.movie.movieImage = this.movieImage;

      this.movie.totalSeats = this.totalSeats;
      this.movie.availableSeats = this.availableSeats;
      this.movie.bookedSeats = this.bookedSeats;
      this.movie.moviePrice = this.moviePrice;

      console.log(this.movie);

      this.movieService.addMovie(this.movie).subscribe({
        next: (data:any) => {
          if(data){
            this.messageSuccess = "Added new movie successfully";
  
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
          this.messageFailure = "Some error in adding movie";
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

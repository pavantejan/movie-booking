import { Component, DoCheck, OnInit } from '@angular/core';
import { Movie } from '../model/movie';
import { UserServiceService } from '../service/user-service.service';
import { MovieServiceService } from '../service/movie-service.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,DoCheck {
  
  movies:Movie[] = [];
  message = "";
  search = "";

  constructor(
    // private movie:Movie,
    private movieService:MovieServiceService,
    private router:Router,
    

  ){}
  ngDoCheck(): void {
    this.search = this.movieService.searchMovie;
    if(this.search.length>0){
      this.searchMovie();
    }else{
      this.movies = this.movieService.getMovies();
    }
  }

  ngOnInit(): void {

    if( this.movieService.getMovies().length !==0 ){
      this.movies = this.movieService.getMovies();
    }
    else if(sessionStorage.getItem('token')){
      console.log("Inside the get all movies");
      this.message = "Loading...";
      this.movieService.getAllMovies().subscribe({
        next: (data: any) => {
          this.message = "";
          this.movies = data;

          this.movieService.setMovies(this.movies);
          console.log(this.movies);

        },
        error: (error) => {
          console.log("from home component");
          this.router.navigate(['error']);
        }
      });
    }else {
      this.router.navigate(['login']);
    }    
    
  }

searchMovie(){
  console.log("inside search movie func");
  this.movies = this.movies.filter((val) =>
      val.movieName.toLowerCase().includes(this.search)
  );
  console.log(this.movies);

}


}

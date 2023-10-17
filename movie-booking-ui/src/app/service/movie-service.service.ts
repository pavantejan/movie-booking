import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthRequest } from '../model/auth-request';
import { Movie } from '../model/movie';
import { Ticket } from '../model/ticket';


const api = "http://localhost:8081/api/v1";

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {

  movies:Movie[] = [];
  searchMovie ="";

  constructor(
    private user:User,
    private httpClient:HttpClient,
    private authRequest:AuthRequest,
    
    
  ) { }

  setSearchMovie(name:string){
    this.searchMovie = name;
  }
  getSearchMovie(){
    return this.searchMovie;
  }

  setMovies(allMovies:Movie[]){
    console.log("inside set movies");
    
    this.movies = allMovies;
    console.log(this.movies);
  }

  getMovies(){
    console.log("inside get movies");
    return this.movies;
  }

  addMovie(movie:Movie): Observable < any > {

    return this.httpClient.post( api + "/addMovie", movie,
      { responseType: 'text' }
    );
  }

  getAllMovies(): Observable < any > {
    return this.httpClient.get(api + "/getAllMovies",
      { responseType: 'json' }
    );
  }

  updateMovie(movie:Movie): Observable < any > {    
    return this.httpClient.put(api + "/updateMovie/" + `${movie.Id}`, movie,
      { responseType: 'text' }
    );
  }
  
  deleteMovie(id:number): Observable < any > {
    return this.httpClient.delete(api + "/deleteMovie/" + `${id}`,
      { responseType: 'text' }
    );
  }

  getMovie(id:number): Observable < any > {
    return this.httpClient.get(api + "/getMovieById/" + `${id}`,
      { responseType: 'json' }
    );
  }

  getAllTickets(movieName:string): Observable < any > {
    return this.httpClient.get(api + "/getMovieById/" + `${movieName}`,
      { responseType: 'json' }
    );
  }

  deleteTicket(id:number): Observable < any > {
    return this.httpClient.delete(api + "/deleteTicket/" + `${id}`,
      { responseType: 'text' }
    );
  }

  bookTicket(ticket:Ticket): Observable < any > {
    return this.httpClient.post( api + "/bookTicket", ticket,
      { responseType: 'text' }
    );
  }





}

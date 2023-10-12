package com.movie.booking.service;

import com.movie.booking.model.Movie;

import java.util.List;


public interface MovieService {

    Movie addMovie(Movie movie);

    List<Movie> getAllMovies();

    Movie getMovieById(int id);

    boolean deleteByMovieId(int id);

    boolean updateMovie(int id, Movie updatedMovie);

//    Movie getMovieById(int bid);

    String ticketStatus(String movie);

}

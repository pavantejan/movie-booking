package com.movie.booking.service;

import com.movie.booking.model.Movie;
import com.movie.booking.repository.MovieRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class MovieServiceImpl implements MovieService{


    @Autowired
    MovieRepo movieRepo;

    @Autowired
    TicketService ticketService;

    @Override
    public Movie addMovie(Movie movie) {

        Optional<Movie> Obj = movieRepo.findById(movie.getId());
        if( Obj.isPresent() ) {
            return null;
        }
        return movieRepo.save(movie);
    }

    @Override
    public List<Movie> getAllMovies() {
        return movieRepo.findAll();
    }

    @Override
    public Movie getMovieById(int id) {
        Optional<Movie> Obj = movieRepo.findById(id);
        return Obj.get();
    }

    @Override
    public boolean deleteByMovieId(int id) {

        Optional<Movie> Obj = movieRepo.findById(id);
        if( Obj.isPresent() ) {
            String movieName = Obj.get().getMovieName();
            ticketService.deleteAllTicket(movieName);
            movieRepo.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public boolean updateMovie(int id, Movie updatedMovie) {

        Optional<Movie> Obj = movieRepo.findById(id);
        if( Obj.isPresent() ) {
            Movie movie = Obj.get();
            movie.setMovieName(updatedMovie.getMovieName());
            movie.setTheaterName(updatedMovie.getTheaterName());
            movie.setMoviePrice(updatedMovie.getMoviePrice());
            movie.setMovieImage(updatedMovie.getMovieImage());

            movieRepo.save(movie);
            return true;
        }
        return false;
    }

    @Override
    public String ticketStatus(String movie) {

        return null;
    }
}

package com.movie.booking.repository;

import com.movie.booking.model.Movie;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface MovieRepo extends JpaRepository<Movie,Integer> {


    @Query("SELECT m FROM Movie m WHERE m.movieName = :movieName AND theaterName = :theaterName")
    Movie findByMovieNameAndTheaterName(String movieName, String theaterName);
}

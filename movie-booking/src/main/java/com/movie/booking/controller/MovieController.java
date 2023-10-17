package com.movie.booking.controller;

import com.movie.booking.model.Movie;
import com.movie.booking.model.users;
import com.movie.booking.producer.KafkaMessageProducer;
import com.movie.booking.service.MovieService;
import com.movie.booking.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:4200")
public class MovieController {


    @Autowired
    KafkaMessageProducer topicProducer;
    @Autowired
    UserService userService;

    @Autowired
    MovieService movieService;

    @GetMapping("/getAllMovies")
    public ResponseEntity<?> getAllUsers(@RequestHeader("Authorization") String jwt) {

        System.out.println("Inside the get all movies mapping");

        if( userService.validateToken(jwt) ){
            // kafka template add message to topic
//            topicProducer.send("all movies in DB requested");
            return new ResponseEntity<List<Movie>>(movieService.getAllMovies(),HttpStatus.OK);
        }
        return new ResponseEntity<String>("Unauthorized user", HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/addMovie")
    public ResponseEntity<?> addMovie(@RequestHeader("Authorization") String jwt,@RequestBody Movie movie) {

        if( userService.validateToken(jwt) && userService.userRole(jwt).equals("admin") ){
            if( movieService.addMovie(movie) != null ){
                // kafka template add message to topic
//                topicProducer.send("Movie with name " + movie.getMovieName() + " added");
                return new ResponseEntity<String>("Successfully Added movie", HttpStatus.CREATED);
            }else{
                return new ResponseEntity<String>("movie is not created in DB", HttpStatus.CONFLICT);
            }
        }
        return new ResponseEntity<String>("only admins are allowed to access the endpoint", HttpStatus.FORBIDDEN);
    }

    @PutMapping("/updateMovie/{id}")
    public ResponseEntity<?> updateMovie(@RequestHeader("Authorization") String jwt,@RequestBody Movie movie,@PathVariable int id) {

        if( userService.validateToken(jwt) && userService.userRole(jwt).equals("admin") ){
            if( movieService.updateMovie(id,movie) ){
                // kafka template add message to topic
//                topicProducer.send("Movie with name " + movie.getMovieName() + " updated");
                return new ResponseEntity<String>("Successfully updated movie", HttpStatus.CREATED);
            }else{
                return new ResponseEntity<String>("movie is not updated in DB", HttpStatus.CONFLICT);
            }
        }
        return new ResponseEntity<String>("only admins are allowed to access the endpoint", HttpStatus.FORBIDDEN);
    }

    @DeleteMapping("/deleteMovie/{id}")
    public ResponseEntity<?> deleteMovie(@RequestHeader("Authorization") String jwt,@PathVariable int id) {

        if( userService.validateToken(jwt) && userService.userRole(jwt).equals("admin") ){
            if( movieService.deleteByMovieId(id) ){
                // kafka template add message to topic
//                topicProducer.send("Movie with id " + id + " deleted");
                return new ResponseEntity<String>("Successfully deleted movie", HttpStatus.CREATED);
            }else{
                return new ResponseEntity<String>("movie is not deleted from DB", HttpStatus.CONFLICT);
            }
        }
        return new ResponseEntity<String>("only admins are allowed to access the endpoint", HttpStatus.FORBIDDEN);
    }

//   mapping - movies/ search / movie-name
    @GetMapping("/getMovieById/{id}")
    public ResponseEntity<?> getMovieById(@RequestHeader("Authorization") String jwt,@PathVariable int id) {

        if( userService.validateToken(jwt) ){
            // kafka template add message to topic
//            topicProducer.send("movies in DB requested by id: "+ id);
            return new ResponseEntity<Movie>(movieService.getMovieById(id),HttpStatus.OK);
        }
        return new ResponseEntity<String>("Unauthorized user", HttpStatus.UNAUTHORIZED);
    }
}

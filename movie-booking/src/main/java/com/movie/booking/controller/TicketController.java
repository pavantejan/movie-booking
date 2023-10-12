package com.movie.booking.controller;

import com.movie.booking.model.Movie;
import com.movie.booking.model.Ticket;
import com.movie.booking.producer.KafkaMessageProducer;
import com.movie.booking.service.TicketService;
import com.movie.booking.service.UserService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class TicketController {

    @Autowired
    TicketService ticketService;

    @Autowired
    KafkaMessageProducer topicProducer;

    @Autowired
    UserService userService;

    @PostMapping("/bookTicket")
    public ResponseEntity<?> addTicket(@RequestHeader("Authorization") String jwt,@RequestBody Ticket ticket) {

        if( userService.validateToken(jwt) ){
            if( ticketService.bookMovieByAddingTicket(ticket) ){
                // kafka template add message to topic
                topicProducer.send("Ticket added with movie name " + ticket.getMovieName() + " - added");
                return new ResponseEntity<String>("Succesfully booked ticket",HttpStatus.OK);
            }
            return new ResponseEntity<String>("Ticket is not created", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<String>("Unauthorized user", HttpStatus.UNAUTHORIZED);
    }

    @DeleteMapping("/deleteTicket/{id}")
    public ResponseEntity<?> deleteTicket(@RequestHeader("Authorization") String jwt,@PathVariable int id) {

        if( userService.validateToken(jwt) && userService.userRole(jwt).equals("admin") ){
            if( ticketService.deleteTicketById(id) ){
                // kafka template add message to topic
                topicProducer.send("Ticket with id: " + id + " - deleted");
                return new ResponseEntity<String>("Successfully Ticket is deleted by ID", HttpStatus.CREATED);
            }else{
                return new ResponseEntity<String>("Ticket is not deleted in DB", HttpStatus.CONFLICT);
            }
        }
        return new ResponseEntity<String>("only admins are allowed to access the endpoint", HttpStatus.FORBIDDEN);
    }

    @GetMapping("/getAllTickets/{movieName}")
    public ResponseEntity<?> getAllTickets(@RequestHeader("Authorization") String jwt,@PathVariable String movieName) {

        if( userService.validateToken(jwt) && userService.userRole(jwt).equals("admin") ){
                 // kafka template add message to topic
                topicProducer.send("all Tickets with movie name: " + movieName + " - fetched");
                return new ResponseEntity<List<Ticket>>(ticketService.getAllTickets(movieName), HttpStatus.CREATED);
        }
        return new ResponseEntity<String>("only admins are allowed to access the endpoint", HttpStatus.FORBIDDEN);
    }

}

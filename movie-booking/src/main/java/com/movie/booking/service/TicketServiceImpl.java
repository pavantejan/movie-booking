package com.movie.booking.service;

import com.movie.booking.model.Movie;
import com.movie.booking.model.Ticket;
import com.movie.booking.repository.MovieRepo;
import com.movie.booking.repository.TicketRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketServiceImpl implements TicketService{

    @Autowired
    TicketRepo ticketRepo;

    @Autowired
    MovieRepo movieRepo;

    @Override
    public boolean bookMovieByAddingTicket(Ticket ticket) {

        Movie movie = movieRepo.findByMovieNameAndTheaterName(ticket.getMovieName(), ticket.getTheaterName());

        if( movie != null ){
            long availableSeats = movie.getAvailableSeats() - ticket.getBookedSeats();
            long bookedSeats = movie.getBookedSeats() + ticket.getBookedSeats();

            if( availableSeats < 0 ){
                return false;
            } else if ( availableSeats == 0 ) {
                movie.setStatus("SOLD OUT");
            }else {
                movie.setAvailableSeats(availableSeats);
                movie.setBookedSeats(bookedSeats);

                movieRepo.save(movie);
                ticketRepo.save(ticket);
                return true;
            }
        }
        return false;
    }

    @Override
    public boolean deleteTicketById(int id) {

        ticketRepo.deleteById(id);
        return true;
    }

    @Override
    public List<Ticket> getAllTickets(String movieName) {
//        return ticketRepo.findAll();

        return ticketRepo.findAllByMovieName(movieName);
    }

    @Override
    public void deleteAllTicket(String movieName) {
        ticketRepo.deleteAllTicketData(movieName);
    }
}

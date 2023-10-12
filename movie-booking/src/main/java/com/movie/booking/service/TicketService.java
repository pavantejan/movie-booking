package com.movie.booking.service;

import com.movie.booking.model.Ticket;

import java.util.List;

public interface TicketService {

    boolean bookMovieByAddingTicket(Ticket ticket);

    boolean deleteTicketById(int id);

    List<Ticket> getAllTickets(String movieName);


//    boolean addTicket(Ticket ticket);

    void deleteAllTicket(String movieName);

}

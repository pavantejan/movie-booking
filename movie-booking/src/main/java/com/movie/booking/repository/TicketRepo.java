package com.movie.booking.repository;

import com.movie.booking.model.Ticket;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public interface TicketRepo extends JpaRepository<Ticket, Integer> {


    @Modifying
    @Query(value="delete from Ticket WHERE movieName = :movieName")
    void deleteAllTicketData(String movieName);

    @Query("SELECT t FROM Ticket t WHERE t.movieName = :movieName")
    List<Ticket> findAllByMovieName(String movieName);
}

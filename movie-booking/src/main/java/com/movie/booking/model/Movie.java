package com.movie.booking.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String movieName;
    private String theaterName;
    private long totalSeats = 100;
    private long availableSeats = 100;
    private long bookedSeats = 0;
    private String movieImage;
    private double moviePrice;
    private String status="Book Ticket ASAP";
}

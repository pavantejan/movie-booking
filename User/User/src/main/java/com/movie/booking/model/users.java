package com.movie.booking.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
//@Table(name = "users")
public class users {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String firstName;
    private String lastName;
    @Column(unique=true)
    private String email;
    @Column(unique=true)
    private String username;
    private String password;
    private String contactNumber;
    private String role;
}

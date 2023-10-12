package com.movie.booking.service;

import com.movie.booking.model.AuthRequest;
//import com.movie.booking.model.User;
import com.movie.booking.model.users;

import java.util.List;

public interface UserService {

    boolean validateToken(String jwt);

    users registerUser(users user);

    List<users> getAllUsers();

    boolean forgetPassword(String username,String newPassword);

    users getUser(String username);

    String userRole(String jwt);
}
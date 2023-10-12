package com.movie.booking.service;

import java.util.List;

public interface UserService {

    boolean validateToken(String jwt);

    String userRole(String jwt);

}
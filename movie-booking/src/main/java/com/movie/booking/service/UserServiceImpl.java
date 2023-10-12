package com.movie.booking.service;

import com.movie.booking.filter.CustomUserDetailsService;
import com.movie.booking.filter.JwtService;
import com.movie.booking.model.users;
import com.movie.booking.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private CustomUserDetailsService customUserDetails;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepo userRepo;

    @Override
    public boolean validateToken(String jwt) {

//        users user = userRepo.findUser(authRequest.getUsername(),authRequest.getPassword());

        jwt = jwt.substring(7);

        UserDetails userDetails = customUserDetails.loadUserByUsername(jwtService.extractUsername(jwt));

        return jwtService.validateToken(jwt,userDetails);
    }

    @Override
    public String userRole(String jwt) {

        jwt = jwt.substring(7);
        String username  = jwtService.extractUsername(jwt);

        users user = userRepo.findByUsername(username);

        return user.getRole();
    }


}

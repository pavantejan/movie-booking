package com.movie.booking.filter;


import com.movie.booking.model.users;
import com.movie.booking.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        List<users> allUsers = userRepo.findAll();


        users uDetails = allUsers.stream().filter(player -> player.getUsername().contains(username))
                .findFirst().orElse(null);

        return new org.springframework.security.core.userdetails.User(uDetails.getUsername(),uDetails.getPassword(), new ArrayList<>());
    }
}

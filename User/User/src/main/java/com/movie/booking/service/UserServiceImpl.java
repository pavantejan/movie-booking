package com.movie.booking.service;

import com.movie.booking.filter.CustomUserDetailsService;
import com.movie.booking.filter.JwtService;
//import com.movie.booking.model.User;
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

        System.out.println("Jwt token "+ jwt);

        UserDetails userDetails = customUserDetails.loadUserByUsername(jwtService.extractUsername(jwt));

        return jwtService.validateToken(jwt,userDetails);
    }

    @Override
    public users registerUser(users user) {

        if(user!=null)
        {
            if(user.getRole()==null)
                user.setRole("user");
            return userRepo.saveAndFlush(user);
        }
        return null;
    }

    @Override
    public List<users> getAllUsers() {

        List<users> usersList = userRepo.findAll();

        if( usersList != null && usersList.size()>0 ){
            return usersList;
        }
        return null;
    }

    @Override
    public boolean forgetPassword(String username,String newPassword) {

        users user = userRepo.findByUsername(username);
        if( user != null )
        {
            System.out.println("user="+user);
            user.setPassword(newPassword);
            userRepo.saveAndFlush(user);
            return true;
        }
        return false;
    }

    @Override
    public users getUser(String username) {
        return userRepo.findByUsername(username);
    }

    @Override
    public String userRole(String jwt) {

        if( jwt.startsWith("Bearer"))
            jwt = jwt.substring(7);

        String username  = jwtService.extractUsername(jwt);

        users user = userRepo.findByUsername(username);

        return user.getRole();
    }
}

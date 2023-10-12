package com.movie.booking.controller;

import com.movie.booking.filter.JwtService;
import com.movie.booking.model.AuthRequest;
import com.movie.booking.model.users;
import com.movie.booking.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

//@Slf4j
@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;



    private static final Logger log = LoggerFactory.getLogger(AuthController.class);


    @GetMapping(path = "/welcome")
    public ResponseEntity<String> welcome() {
        log.info("Inside Hello World welcome Function");

        return ResponseEntity.ok("Hello ELK Integration!!!");
    }


    @PostMapping(value = "/register")
    public ResponseEntity<?> registerUser(@RequestBody users user){

        if( userService.registerUser(user) != null)
        {

//            log.info("The registration mapping is invoked and user is created");
            return new ResponseEntity<String>("User Created", HttpStatus.CREATED);
        }
        return new ResponseEntity<String>("user registration failed", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping(value = "/login")
    public ResponseEntity<?> loginUser(@RequestBody AuthRequest authRequest){

        Authentication authentication = null;

        try {
            authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(),authRequest.getPassword()));
        }
        catch(Exception ex) {

            return new ResponseEntity<String>("no user found with the provided username or else password didn't match", HttpStatus.CONFLICT);
        }

        if(authentication.isAuthenticated())
        {
            String token=jwtService.generateToken(authRequest.getUsername());
//            log.info("The login mapping is invoked by user: "+ authRequest.getUsername()+" and validated");
            return new ResponseEntity<String>(token, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("Unauthorized user", HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping(value = "/{username}/forgot")
    public boolean loginUser(@PathVariable("username") String username,@RequestParam(name="newPassword") String newPassword,@RequestHeader(value = "Authorization") String jwt ){
//        Add jwt auth while implementing frontend
//        log.info("The forgot password mapping is invoked by user: "+ username);
        return userService.forgetPassword(username,newPassword);
    }

    @GetMapping("/getAllUsers")
//    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getAllUsers(@RequestHeader(value = "Authorization") String jwt) {

        System.out.println("inside the get all users mapping");

        if( userService.validateToken(jwt) && userService.userRole(jwt).equals("admin")){
            List<users> allUsers = userService.getAllUsers();

            if(allUsers != null) {
//                log.info("the get all users mapping is invoked by admin" );
                return new ResponseEntity<List<users>>(allUsers, HttpStatus.OK);
            }
            return new ResponseEntity<String>("allUsers is empty", HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<String>("Unauthorized user", HttpStatus.UNAUTHORIZED);

    }

    @GetMapping("/getUser")
    public ResponseEntity<?> getRole(@RequestParam String username,@RequestHeader("Authorization") String jwt)
    {
        if( userService.validateToken(jwt) ){
//            log.info("the get user mapping is invoked by user: "+ username);
            return new ResponseEntity<users>( userService.getUser(username), HttpStatus.OK );
        }
        return new ResponseEntity<String>("Unauthorized user", HttpStatus.UNAUTHORIZED);
    }



}

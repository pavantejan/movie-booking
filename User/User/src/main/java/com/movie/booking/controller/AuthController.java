package com.movie.booking.controller;

import com.movie.booking.filter.CustomUserDetailsService;
import com.movie.booking.filter.JwtService;
import com.movie.booking.model.AuthRequest;
import com.movie.booking.model.AuthResponse;
import com.movie.booking.model.PasswordRequest;
import com.movie.booking.model.users;
import com.movie.booking.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;

import java.util.List;

//@Slf4j
@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins ="http://localhost:4200")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private CustomUserDetailsService customUserDetails;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;




//    private static final Logger log = LoggerFactory.getLogger(AuthController.class);


    @GetMapping(path = "/welcome")
    public ResponseEntity<String> welcome() {
//        log.info("Inside Hello World welcome Function");

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

    @GetMapping(value = "/validate")
    public ResponseEntity<?> validateUser(@RequestHeader(value = "Authorization") String jwt){
        AuthResponse authResponse = new AuthResponse();

        try{
            UserDetails userDetails = customUserDetails.loadUserByUsername(jwtService.extractUsername(jwt));
            System.out.println("insdide token validator1");
            if (jwtService.validateToken(jwt, userDetails)) {
                if( jwt.startsWith("Bearer"))
                    jwt = jwt.substring(7);

                users user = userService.getUser(userDetails.getUsername());

                authResponse.setUsername(user.getUsername());
                authResponse.setEmail(user.getEmail());
                authResponse.setRole(user.getRole());
                authResponse.setToken(jwt);
                authResponse.setValid(true);
                System.out.println("insdide token validator2");

            }
        }catch (Exception e){
            return new ResponseEntity<String>("Exception Occured by validating JWT",HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<AuthResponse>(authResponse,HttpStatus.OK);
    }

    @PostMapping(value = "/login")
    public ResponseEntity<?> loginUser(@RequestBody AuthRequest authRequest){

        AuthResponse authResponse = new AuthResponse();
        Authentication authentication = null;
        String username = "";
        users user = null;


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
            username = authRequest.getUsername();

            user = userService.getUser(username);
            authResponse.setUsername(username);
            authResponse.setEmail(user.getEmail());
            authResponse.setToken(token);
            authResponse.setValid(true);
            authResponse.setRole(userService.userRole(token));

            return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("Unauthorized user", HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping(value = "/forgot/{username}")
    public boolean loginUser(@PathVariable("username") String username, @RequestBody PasswordRequest passwordRequest, @RequestHeader(value = "Authorization") String jwt ){
//        Add jwt auth while implementing frontend
//        log.info("The forgot password mapping is invoked by user: "+ username);

        return userService.forgetPassword(username,passwordRequest.getNewPassword());
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

    @GetMapping("/getUser/{username}")
    public ResponseEntity<?> getRole(@PathVariable("username") String username,@RequestHeader("Authorization") String jwt)
    {
        if( userService.validateToken(jwt) ){
//            log.info("the get user mapping is invoked by user: "+ username);
            return new ResponseEntity<users>( userService.getUser(username), HttpStatus.OK );
        }
        return new ResponseEntity<String>("Unauthorized user", HttpStatus.UNAUTHORIZED);
    }



}

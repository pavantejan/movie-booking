package com.movie.booking.filter;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;



import java.io.IOException;

@Slf4j
@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;
    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        System.out.println("Inside do filter");

        String authorizationHeader = request.getHeader("Authorization");
        System.out.println(authorizationHeader);
        String token = null;
        String username = null;
        if( authorizationHeader != null && authorizationHeader.startsWith("Bearer ")){
            System.out.println("filter first0");
            token = authorizationHeader.substring(7);
            System.out.println("filter first1");
            username = jwtService.extractUsername(token);
            System.out.println(username);
            System.out.println("filter first");
        }
        if( username != null  && SecurityContextHolder.getContext().getAuthentication() == null ){
            System.out.println("filter-------");
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            System.out.println("filter second");
            if(jwtService.validateToken(token, userDetails)){
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                System.out.println("filter third");
            }
        }

        System.out.println("filter last");
        filterChain.doFilter(request,response);
    }


}
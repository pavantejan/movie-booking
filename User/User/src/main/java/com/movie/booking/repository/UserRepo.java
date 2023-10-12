package com.movie.booking.repository;

//import com.movie.booking.model.User;
import com.movie.booking.model.users;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface UserRepo extends JpaRepository<users,Integer>{

    @Query("SELECT u FROM users u WHERE u.username = :username AND u.password = :password")
    public users findUser(String username, String password);

    @Query("SELECT u FROM users u WHERE u.username = :username")
    users findByUsername(String username);
}


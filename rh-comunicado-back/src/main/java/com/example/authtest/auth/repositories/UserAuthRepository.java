package com.example.authtest.auth.repositories;

import com.example.authtest.auth.domain.user.UserAuth;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserAuthRepository extends JpaRepository<UserAuth, String> {
    Optional<UserAuth> findByUser(String user);
}

package com.example.authtest.main.repositories;

import com.example.authtest.main.domain.grupo.Grupo;
import com.example.authtest.main.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Set;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByUser(String user);

    @Query("SELECT u.grupos FROM user u WHERE u.user_id = :userId")
    Set<Grupo> findGruposByUserId(@Param("userId") String userId);
}

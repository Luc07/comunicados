package com.example.authtest.infra.security;

import com.example.authtest.auth.domain.user.UserAuth;
import com.example.authtest.auth.repositories.UserAuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserAuthRepository repository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserAuth user = this.repository.findByUser(username).orElseThrow(() -> new UsernameNotFoundException("UserAuth not found"));
        return new org.springframework.security.core.userdetails.User(user.getUser(), user.getPassword(), new ArrayList<>());
    }
}
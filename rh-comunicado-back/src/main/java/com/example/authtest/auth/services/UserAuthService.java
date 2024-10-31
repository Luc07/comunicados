package com.example.authtest.auth.services;

import com.example.authtest.auth.domain.user.UserAuth;
import com.example.authtest.auth.domain.user.UserAuthResponseDTO;
import com.example.authtest.auth.repositories.UserAuthRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserAuthService {
    private final UserAuthRepository postRepository;

    public UserAuthService(UserAuthRepository postRepository) {
        this.postRepository = postRepository;
    }

    public List<UserAuthResponseDTO> getAll(){
        return postRepository.findAll().stream().map(UserAuthResponseDTO::new).toList();
    }

    public UserAuth save(UserAuth user){
        return postRepository.save(user);
    }
}

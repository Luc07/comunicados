package com.example.authtest.main.services;

import com.example.authtest.main.domain.grupo.Grupo;
import com.example.authtest.main.domain.grupo.GrupoResponseDTO;
import com.example.authtest.main.domain.user.User;
import com.example.authtest.main.domain.user.UserResponseDTO;
import com.example.authtest.main.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserResponseDTO> getAll(){
        return userRepository.findAll().stream().map(UserResponseDTO::new).collect(Collectors.toList());
    }

    public List<GrupoResponseDTO> getUsuarioGrupos(String userId){
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Set<Grupo> grupos = user.getGrupos();
        if(grupos.isEmpty() || grupos == null){
            return Collections.emptyList();
        }

        return grupos.stream()
                .map(GrupoResponseDTO::new)
                .collect(Collectors.toList());
    }

    public UserResponseDTO getById(String id){
        return userRepository.findById(id).map(UserResponseDTO::new).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    public User save(User user){
        return userRepository.save(user);
    }
}

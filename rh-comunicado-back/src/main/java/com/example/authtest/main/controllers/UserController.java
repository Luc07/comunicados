package com.example.authtest.main.controllers;

import com.example.authtest.main.domain.grupo.GrupoResponseDTO;
import com.example.authtest.main.domain.user.User;
import com.example.authtest.main.domain.user.UserRequestDTO;
import com.example.authtest.main.domain.user.UserResponseDTO;
import com.example.authtest.main.repositories.UserRepository;
import com.example.authtest.main.services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public UserController(UserService userService, PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity getAllUsers(){
        List<UserResponseDTO> userList = userService.getAll();
        return ResponseEntity.ok(userList);
    }

    @GetMapping("{userId}")
    public ResponseEntity getUser(@PathVariable String userId){
        UserResponseDTO user = userService.getById(userId);
        return ResponseEntity.ok(user);
    }

    @GetMapping("{userId}/grupos")
    public ResponseEntity getGruposByUserId(@PathVariable String userId){
        List<GrupoResponseDTO> grupos = userService.getUsuarioGrupos(userId);
        return ResponseEntity.ok(grupos);
    }

    @PostMapping
    public ResponseEntity save(@RequestBody @Valid UserRequestDTO userData){
        System.out.println(userData);
        Optional<User> user = userRepository.findByUser(userData.user());
        User newUser = new User(userData);
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        userService.save(newUser);
        return ResponseEntity.ok().build();
    }
}

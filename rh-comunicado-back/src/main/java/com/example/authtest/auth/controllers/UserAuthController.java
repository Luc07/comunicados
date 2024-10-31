package com.example.authtest.auth.controllers;

import com.example.authtest.auth.domain.user.UserAuth;
import com.example.authtest.auth.domain.user.UserAuthRequestDTO;
import com.example.authtest.auth.domain.user.UserAuthResponseDTO;
import com.example.authtest.auth.services.UserAuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/userAuth")
public class UserAuthController {
    private final UserAuthService userService;

    public UserAuthController(UserAuthService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity getAllUsers(){
        List<UserAuthResponseDTO> userList = userService.getAll();
        return ResponseEntity.ok(userList);
    }

    @PostMapping
    public ResponseEntity save(@RequestBody @Valid UserAuthRequestDTO userData){
        UserAuth newUser = new UserAuth(userData);
        userService.save(newUser);
        return ResponseEntity.ok().build();
    }
}

package com.example.authtest.auth.controllers;

import com.example.authtest.auth.domain.auth.EditRequestDTO;
import com.example.authtest.auth.domain.user.UserAuth;
import com.example.authtest.auth.domain.auth.LoginRequestDTO;
import com.example.authtest.auth.domain.auth.RegisterRequestDTO;
import com.example.authtest.auth.domain.auth.ResponseDTO;
import com.example.authtest.infra.security.TokenService;
import com.example.authtest.auth.repositories.UserAuthRepository;
import com.example.authtest.main.domain.auth.UserRole;
import com.example.authtest.main.domain.user.User;
import com.example.authtest.main.repositories.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserAuthRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequestDTO body, HttpServletResponse response) throws IOException{
        UserAuth user = this.repository.findByUser(body.user()).orElseThrow(() -> new RuntimeException("UserAuth not found"));
        if(body.password().equals(user.getPassword())) {
            String token = this.tokenService.generateToken(user);
            return ResponseEntity.ok()
                    .body(new ResponseDTO(user.getName(), token));
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterRequestDTO body){
        Optional<UserAuth> userAuth = this.repository.findByUser(body.user());
        Optional<User> user = userRepository.findByUser(body.user());

        if(userAuth.isEmpty() && user.isEmpty()) {
            UserAuth newUserAuth = new UserAuth();
//
            newUserAuth.setPassword(passwordEncoder.encode(body.password()));
            newUserAuth.setUser(body.user());
            newUserAuth.setName(body.name());
            newUserAuth.setDepartment_id(body.department_id());
            newUserAuth.setRole(body.role());
            UserAuth userAuthResponse = this.repository.save(newUserAuth);
            userRepository.save(new User(userAuthResponse));

            String token = this.tokenService.generateToken(newUserAuth);
            return ResponseEntity.ok(new ResponseDTO(newUserAuth.getName(), token));
        }
        return ResponseEntity.badRequest().body("Usuário já existe");

    }
    @PutMapping("/edit/{id}")
    public ResponseEntity edit(@PathVariable String id,@RequestBody EditRequestDTO body){
        Optional<UserAuth> userAuth = this.repository.findById(id);
        Optional<User> user = this.userRepository.findById(id);
        if(userAuth.isPresent() && user.isPresent()) {
            userAuth.get().setPassword(passwordEncoder.encode(body.password()));
            userAuth.get().setUser(body.user());
            userAuth.get().setName(body.name());
            this.repository.save(userAuth.get());
            this.userRepository.save(new User(userAuth.get()));

        }
        return ResponseEntity.ok(userAuth);


    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity delete(@PathVariable String id){
        System.out.println(id);
        Optional<User> user= this.userRepository.findById(id);
        Optional<UserAuth> userAuth = this.repository.findById(id);
        if (userAuth.isPresent() && user.isPresent()){
            userRepository.deleteById(user.get().getUser_id());
            this.repository.deleteById(userAuth.get().getUser_id());
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().body("Usuário não encontrado!");
    }
}


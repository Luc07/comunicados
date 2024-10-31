package com.example.authtest.auth.domain.auth;

public record RegisterRequestDTO(String name, String user, String password, int department_id, UserRole role) {
}

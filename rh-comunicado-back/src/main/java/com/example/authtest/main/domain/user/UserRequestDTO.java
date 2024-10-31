package com.example.authtest.main.domain.user;

import com.example.authtest.auth.domain.auth.UserRole;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UserRequestDTO(@NotBlank @NotNull String name, @NotBlank @NotNull String user, @NotBlank @NotNull String password,@NotNull int department_id, @NotNull UserRole role) {
}

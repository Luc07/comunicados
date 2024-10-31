package com.example.authtest.main.domain.grupo;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record GrupoRequestDTO(@NotBlank @NotNull String nome, @NotNull List<String> usuariosIds) {
}

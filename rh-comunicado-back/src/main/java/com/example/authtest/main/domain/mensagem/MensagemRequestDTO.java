package com.example.authtest.main.domain.mensagem;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record MensagemRequestDTO(@NotNull @NotBlank String grupoId, @NotNull @NotBlank String autorId, @NotNull @NotBlank String mensagem, String localArquivo) {
}

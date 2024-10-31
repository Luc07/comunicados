package com.example.authtest.main.domain.grupo;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class GrupoComUltimaMensagemDTO {
    private String grupoId;
    private String grupoNome;
    private String mensagemConteudo;
    private String autorNome;
    private LocalDateTime mensagemDataEnvio;

    // Construtor, Getters e Setters
    public GrupoComUltimaMensagemDTO(String grupoId, String grupoNome, String mensagemConteudo, String autorNome, LocalDateTime mensagemDataEnvio) {
        this.grupoId = grupoId;
        this.grupoNome = grupoNome;
        this.mensagemConteudo = mensagemConteudo;
        this.autorNome = autorNome;
        this.mensagemDataEnvio = mensagemDataEnvio;
    }
}

package com.example.authtest.main.domain.grupo;

public record GrupoResponseDTO(String id,String nome) {
    public GrupoResponseDTO(Grupo grupo) {
        this(grupo.getId(), grupo.getNome());
    }
}

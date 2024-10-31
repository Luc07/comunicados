package com.example.authtest.main.domain.mensagem;

import com.example.authtest.main.domain.grupo.GrupoResponseDTO;
import com.example.authtest.main.domain.user.UserResponseDTO;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;
import java.util.List;

public record MensagemResponseDTO(String id, GrupoResponseDTO grupo, UserResponseDTO autor, String conteudo, LocalDateTime dataEnvio, String localArquivo, List<UserResponseDTO> visualizacoes) {
    public MensagemResponseDTO(Mensagem mensagem, List<UserResponseDTO> visualizacoes){
        this(mensagem.getId(), new GrupoResponseDTO(mensagem.getGrupo()), new UserResponseDTO(mensagem.getAutor()), mensagem.getConteudo(), mensagem.getDataEnvio(), mensagem.getLocalArquivo(), visualizacoes);
    }

    public MensagemResponseDTO(Mensagem mensagem){
        this(mensagem.getId(), new GrupoResponseDTO(mensagem.getGrupo()), new UserResponseDTO(mensagem.getAutor()), mensagem.getConteudo(), mensagem.getDataEnvio(), mensagem.getLocalArquivo(), null);
    }
}

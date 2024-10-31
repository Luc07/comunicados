package com.example.authtest.main.services;

import com.example.authtest.main.domain.grupo.Grupo;
import com.example.authtest.main.domain.grupo.GrupoResponseDTO;
import com.example.authtest.main.domain.mensagem.Mensagem;
import com.example.authtest.main.domain.mensagem.MensagemResponseDTO;
import com.example.authtest.main.domain.user.User;
import com.example.authtest.main.domain.user.UserResponseDTO;
import com.example.authtest.main.repositories.GrupoRepository;
import com.example.authtest.main.repositories.MensagemRepository;
import com.example.authtest.main.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class MensagemService {
    private final MensagemRepository mensagemRepository;
    private final UserRepository userRepository;
    private final GrupoRepository grupoRepository;

    public MensagemService(MensagemRepository mensagemRepository, UserRepository userRepository, GrupoRepository grupoRepository) {
        this.mensagemRepository = mensagemRepository;
        this.userRepository = userRepository;
        this.grupoRepository = grupoRepository;
    }

    @Transactional(transactionManager = "dbNelfarmaTransactionManager")
    public MensagemResponseDTO criarMensagem(String grupoId, String autorId, String conteudo, String localArquivo) {
        // Verifique se o grupo e o usuário existem
        Grupo grupo = grupoRepository.findById(grupoId)
                .orElseThrow(() -> new RuntimeException("Grupo não encontrado"));
        User autor = userRepository.findById(autorId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        // Gerar um novo ID para a mensagem
        String mensagemId = UUID.randomUUID().toString();

        // Data de envio atual
        LocalDateTime dataEnvio = LocalDateTime.now();

        // Inserir a mensagem diretamente no banco
        mensagemRepository.insertMensagem(mensagemId, grupoId, autorId, conteudo, dataEnvio, localArquivo);

        // Criar o DTO manualmente
        return new MensagemResponseDTO(
                mensagemId,
                new GrupoResponseDTO(grupo),
                new UserResponseDTO(autor),
                conteudo,
                dataEnvio,
                localArquivo,
                null
        );
    }

    @Transactional(transactionManager = "dbNelfarmaTransactionManager")
    public void marcarMensagemComoVisualizada(String mensagemId, String usuarioId) {
        Mensagem mensagem = mensagemRepository.findById(mensagemId).orElseThrow(() -> new RuntimeException("Mensagem não encontrada"));
        User usuario = userRepository.findById(usuarioId).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        mensagem.getUsuariosVisualizadores().add(usuario);
        usuario.getMensagensVisualizadas().add(mensagem);

        mensagemRepository.save(mensagem);
        userRepository.save(usuario);
    }

    public List<UserResponseDTO> getMensagemUsuarios(String idMsg){
        Mensagem mensagem = mensagemRepository.findById(idMsg).orElseThrow(() -> new RuntimeException("Mensagem não encontrada"));

        Set<User> usuarios = mensagem.getUsuariosVisualizadores();
        if(usuarios.isEmpty() || usuarios == null){
            return Collections.emptyList();
        }

        return usuarios.stream()
                .map(UserResponseDTO::new)
                .collect(Collectors.toList());
    }
}

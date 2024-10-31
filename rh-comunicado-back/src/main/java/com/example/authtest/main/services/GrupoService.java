package com.example.authtest.main.services;

import com.example.authtest.auth.domain.user.UserAuth;
import com.example.authtest.auth.repositories.UserAuthRepository;
import com.example.authtest.main.domain.grupo.Grupo;
import com.example.authtest.main.domain.grupo.GrupoComUltimaMensagemDTO;
import com.example.authtest.main.domain.grupo.GrupoRequestDTO;
import com.example.authtest.main.domain.grupo.GrupoResponseDTO;
import com.example.authtest.main.domain.mensagem.Mensagem;
import com.example.authtest.main.domain.mensagem.MensagemResponseDTO;
import com.example.authtest.main.domain.user.User;
import com.example.authtest.main.domain.user.UserResponseDTO;
import com.example.authtest.main.repositories.GrupoRepository;
import com.example.authtest.main.repositories.MensagemRepository;
import com.example.authtest.main.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class GrupoService {

    @Autowired
    private GrupoRepository grupoRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MensagemRepository mensagemRepository;
    @Autowired
    private UserAuthRepository userAuthRepository;

    public List<GrupoResponseDTO> getAll(){
        return grupoRepository.findAll().stream().map(GrupoResponseDTO::new).toList();
    }

    @Transactional(transactionManager = "dbNelfarmaTransactionManager")
    public Grupo createGrupo(GrupoRequestDTO request) {
        // Criar e salvar o grupo
        Grupo grupo = new Grupo(request.nome());
        Grupo savedGrupo = grupoRepository.save(grupo);

        // Adicionar associações diretamente com SQL nativo
        for (String userId : request.usuariosIds()) {
            grupoRepository.addUserToGroup(userId, savedGrupo.getId());
        }

        return savedGrupo;
    }

    @Transactional(transactionManager = "dbNelfarmaTransactionManager")
    public GrupoResponseDTO addUserToGrupo(String grupoId, String userId) {
        Optional<Grupo> grupoOpt = grupoRepository.findById(grupoId);
        Optional<UserAuth> userOpt = userAuthRepository.findById(userId);

        if (grupoOpt.isEmpty()) {
            throw new RuntimeException("Grupo não encontrado");
        }
        if (userOpt.isEmpty()) {
            throw new RuntimeException("Usuário não encontrado");
        }

        // Adiciona o relacionamento entre usuário e grupo diretamente no banco
        grupoRepository.addUserToGrupo(userId, grupoId);

        // Retorna o grupo atualizado sem precisar carregar todas as entidades
        return new GrupoResponseDTO(grupoOpt.get());
    }

    @Transactional(transactionManager = "dbNelfarmaTransactionManager")
    public GrupoResponseDTO removeUserFromGrupo(String grupoId, String userId) {
        Optional<Grupo> grupoOpt = grupoRepository.findById(grupoId);
        if (grupoOpt.isEmpty()) {
            throw new RuntimeException("Grupo não encontrado");
        }

        Optional<UserAuth> userOpt = userAuthRepository.findById(userId);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("Usuário não encontrado");
        }

        // Remove o usuário do grupo e o grupo do usuário
        grupoRepository.removeUserFromGrupo(userId, grupoId);

        // Retorna o grupo atualizado sem precisar carregar as entidades
        return new GrupoResponseDTO(grupoOpt.get());
    }

    @Transactional(transactionManager = "dbNelfarmaTransactionManager")
    public void removeGrupo(String grupoId) {
        // 1. Remover usuários associados ao grupo
        grupoRepository.removeUsersFromGroup(grupoId);

        // 2. Remover mensagens associadas ao grupo
        grupoRepository.deleteMensagensByGrupoId(grupoId);

        // 3. Excluir o grupo
        grupoRepository.deleteGrupoById(grupoId);
    }

    public List<UserResponseDTO> getGrupoUsuarios(String grupoId) {
        Grupo grupo = grupoRepository.findById(grupoId)
                .orElseThrow(() -> new RuntimeException("Grupo não encontrado"));

        Set<User> usuarios = grupo.getUsuarios();
        if (usuarios == null || usuarios.isEmpty()) {
            return Collections.emptyList();
        }

        return usuarios.stream()
                .map(UserResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional(transactionManager = "dbNelfarmaTransactionManager")
    public List<MensagemResponseDTO> getGrupoMensagens(String grupoId) {
        System.out.println("dddd");
        List<Object[]> results = mensagemRepository.findMensagensByGrupoId(grupoId);
        Map<String, List<UserResponseDTO>> mensagemVisualizacoesMap = new HashMap<>();
        Map<String, MensagemResponseDTO> mensagemMap = new HashMap<>();
        System.out.println(results);

        for (Object[] result : results) {
            String mensagemId = (String) result[0];

            // Criar lista de visualizações se não existir
            if (!mensagemVisualizacoesMap.containsKey(mensagemId)) {
                mensagemVisualizacoesMap.put(mensagemId, new ArrayList<>());
            }

            MensagemResponseDTO mensagemDTO = mensagemMap.get(mensagemId);

            if (mensagemDTO == null) {
                // Verifique se os valores são null e trate adequadamente
                String conteudo = (String) result[1];
                LocalDateTime dataEnvio = result[2] != null ? ((Timestamp) result[2]).toLocalDateTime() : null;

                String grupoIdValue = (String) result[3];
                String grupoNome = (String) result[4];

                String autorId = (String) result[5];
                String autorNome = (String) result[6];
                String user = (String) result[7];
                Integer departmentId = result[8] != null ? (Integer) result[8] : null;
                String localArquivo = (String) result[9];

                // Criar DTOs de Grupo e Autor
                GrupoResponseDTO grupoDTO = new GrupoResponseDTO(grupoIdValue, grupoNome);
                UserResponseDTO autorDTO = new UserResponseDTO(autorId, autorNome, user, departmentId);

                // Criar DTO de Mensagem
                mensagemDTO = new MensagemResponseDTO(mensagemId, grupoDTO, autorDTO, conteudo, dataEnvio, localArquivo, new ArrayList<>());
                mensagemMap.put(mensagemId, mensagemDTO);
            }

            // Processar as visualizações
            String visuUserId = (String) result[10];
            if (visuUserId != null) {
                String visuUserNome = (String) result[11];
                UserResponseDTO visuUserDTO = new UserResponseDTO(visuUserId, visuUserNome, "", 0);
                mensagemVisualizacoesMap.get(mensagemId).add(visuUserDTO); // Adicionar visualização à lista
            }
        }

        // Atualizar as mensagens com as visualizações
        for (String mensagemId : mensagemMap.keySet()) {
            MensagemResponseDTO mensagemDTO = mensagemMap.get(mensagemId);
            List<UserResponseDTO> visualizacoes = mensagemVisualizacoesMap.get(mensagemId);
            mensagemDTO = new MensagemResponseDTO(mensagemDTO.id(), mensagemDTO.grupo(), mensagemDTO.autor(), mensagemDTO.conteudo(), mensagemDTO.dataEnvio(), mensagemDTO.localArquivo(), visualizacoes);
            mensagemMap.put(mensagemId, mensagemDTO);
        }

        return new ArrayList<>(mensagemMap.values());
    }

    @Transactional(transactionManager = "dbNelfarmaTransactionManager")
    public List<GrupoComUltimaMensagemDTO> getGruposComUltimaMensagem(String userId) {
        List<Object[]> resultados = mensagemRepository.findGruposComUltimaMensagem(userId);

        // Usar um mapa para garantir que cada grupo seja adicionado apenas uma vez
        Map<String, GrupoComUltimaMensagemDTO> grupoMap = new LinkedHashMap<>();

        for (Object[] resultado : resultados) {
            String grupoId = (String) resultado[0];
            String grupoNome = (String) resultado[1];
            String mensagemConteudo = (String) resultado[2];
            LocalDateTime mensagemDataEnvio = resultado[3] != null ? ((Timestamp) resultado[3]).toLocalDateTime() : null;
            String autorNome = (String) resultado[4];

            // Se o grupo ainda não estiver no mapa, adiciona
            if (!grupoMap.containsKey(grupoId)) {
                grupoMap.put(grupoId, new GrupoComUltimaMensagemDTO(grupoId, grupoNome, mensagemConteudo, autorNome, mensagemDataEnvio));
            }
        }

        return new ArrayList<>(grupoMap.values());
    }
}

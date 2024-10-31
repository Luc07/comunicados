package com.example.authtest.main.repositories;

import com.example.authtest.main.domain.mensagem.Mensagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface MensagemRepository extends JpaRepository<Mensagem, String> {
    @Query(value = "SELECT g.id AS grupoId, g.nome AS grupoNome, " +
            "       m.conteudo AS mensagemConteudo, m.dataEnvio AS mensagemDataEnvio, u.name AS autorNome " +
            "FROM grupo g " +
            "JOIN user_grupo ug ON g.id = ug.id_grupo " +
            "JOIN users u ON ug.user_id = u.user_id " +
            "LEFT JOIN mensagem m ON g.id = m.grupo_id " +
            "LEFT JOIN (SELECT grupo_id, MAX(dataEnvio) AS max_data_envio " +
            "           FROM mensagem " +
            "           GROUP BY grupo_id) latest ON m.grupo_id = latest.grupo_id AND m.dataEnvio = latest.max_data_envio " +
            "WHERE u.user_id = :userId AND m.dataEnvio = latest.max_data_envio",
            nativeQuery = true)
    List<Object[]> findGruposComUltimaMensagem(@Param("userId") String userId);

    @Query(value = "SELECT m.id, m.conteudo, m.dataEnvio, " +
            "g.id AS grupo_id, g.nome AS grupo_nome, " +
            "u.user_id AS autor_id, u.name AS autor_nome, u.user, u.department_id, m.localArquivo, " +
            "uv.usuario_id AS visu_user_id, vu.name AS visu_user_nome " + // Colunas para visualizações
            "FROM mensagem m " +
            "JOIN grupo g ON m.grupo_id = g.id " +
            "JOIN users u ON m.autor_id = u.user_id " +
            "LEFT JOIN usuario_mensagem_visu uv ON uv.mensagem_id = m.id " + // Join com a tabela de visualizações
            "LEFT JOIN users vu ON uv.usuario_id = vu.user_id " + // Join com os detalhes dos usuários que visualizaram
            "WHERE m.grupo_id = :grupoId " +
            "ORDER BY m.dataEnvio ASC",
            nativeQuery = true)
    List<Object[]> findMensagensByGrupoId(@Param("grupoId") String grupoId);

    @Modifying
    @Query(value = "INSERT INTO mensagem (id, grupo_id, autor_id, conteudo, dataEnvio, localArquivo) " +
            "VALUES (:id, :grupoId, :autorId, :conteudo, :dataEnvio, :localArquivo)", nativeQuery = true)
    void insertMensagem(@Param("id") String id, @Param("grupoId") String grupoId,
                        @Param("autorId") String autorId, @Param("conteudo") String conteudo,
                        @Param("dataEnvio") LocalDateTime dataEnvio, @Param("localArquivo") String localArquivo);
}


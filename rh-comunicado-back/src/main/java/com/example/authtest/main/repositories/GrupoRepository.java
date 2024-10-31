package com.example.authtest.main.repositories;

import com.example.authtest.main.domain.grupo.Grupo;
import com.example.authtest.main.domain.mensagem.MensagemResponseDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface GrupoRepository extends JpaRepository<Grupo, String> {
    @Modifying
    @Transactional(transactionManager = "dbNelfarmaTransactionManager")
    @Query(value = "INSERT INTO user_grupo (user_id, id_grupo) VALUES (:userId, :grupoId)", nativeQuery = true)
    void addUserToGroup(@Param("userId") String userId, @Param("grupoId") String grupoId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM user_grupo WHERE user_id = :userId AND id_grupo = :grupoId", nativeQuery = true)
    void removeUserFromGrupo(@Param("userId") String userId, @Param("grupoId") String grupoId);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO user_grupo (user_id, id_grupo) VALUES (:userId, :grupoId)", nativeQuery = true)
    void addUserToGrupo(@Param("userId") String userId, @Param("grupoId") String grupoId);

    // 1. Remover o relacionamento entre o grupo e os usuários
    @Modifying
    @Query(value = "DELETE FROM user_grupo WHERE id_grupo = :grupoId", nativeQuery = true)
    void removeUsersFromGroup(@Param("grupoId") String grupoId);

    // 2. Remover as mensagens associadas ao grupo
    @Modifying
    @Query(value = "DELETE FROM mensagem WHERE grupo_id = :grupoId", nativeQuery = true)
    void deleteMensagensByGrupoId(@Param("grupoId") String grupoId);

    // 3. Remover o grupo
    @Modifying
    @Query(value = "DELETE FROM grupo WHERE id = :grupoId", nativeQuery = true)
    void deleteGrupoById(@Param("grupoId") String grupoId);
}
